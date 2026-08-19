<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Supported OAuth providers.
     */
    protected array $supportedProviders = ['google', 'linkedin-openid'];

    /**
     * Redirect the user to the provider's authentication page.
     */
    public function redirectToProvider(Request $request, string $provider): RedirectResponse
    {
        if (! in_array($provider, $this->supportedProviders, true)) {
            return redirect()->route('login')->withErrors(['error' => __t('auth.social.provider_not_supported')]);
        }

        // Store role in session if specified in the query parameter (candidat/recruteur)
        if ($request->has('role') && in_array($request->query('role'), ['candidat', 'recruteur'], true)) {
            session(['social_registration_role' => $request->query('role')]);
        }

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from the provider and authenticate.
     */
    public function handleProviderCallback(string $provider): RedirectResponse
    {
        if (! in_array($provider, $this->supportedProviders, true)) {
            return redirect()->route('login')->withErrors(['error' => __t('auth.social.provider_not_supported')]);
        }

        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            Log::error("Social Auth callback failed for provider {$provider}: ".$e->getMessage());

            return redirect()->route('login')->withErrors(['error' => __t('auth.social.auth_failed', ['provider' => $provider])]);
        }

        // 1. Search for an existing social account link
        $socialAccount = SocialAccount::where('provider', $provider)
            ->where('provider_id', $socialUser->getId())
            ->first();

        if ($socialAccount) {
            // Update the tokens
            $socialAccount->update([
                'access_token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'token_expires_at' => isset($socialUser->expiresIn) ? now()->addSeconds($socialUser->expiresIn) : null,
            ]);

            $linkedUser = $socialAccount->user;

            if ($linkedUser->role === 'candidat' && $linkedUser->candidat) {
                if (in_array($linkedUser->candidat->status, ['archive', 'refuse'])) {
                    $statusKey = $linkedUser->candidat->status === 'archive' ? 'account_archived' : 'account_refused';

                    return redirect()->route('login')->withErrors(['email' => __($statusKey)]);
                }
            }

            // Mark email as verified since the provider guarantees it
            if (is_null($linkedUser->email_verified_at)) {
                $linkedUser->forceFill(['email_verified_at' => now()])->save();
            }

            Auth::login($linkedUser);
            session()->forget('social_registration_role');

            return redirect()->route('dashboard');
        }

        // 2. Check if a user with the same email already exists
        $email = $socialUser->getEmail();
        if (empty($email)) {
            return redirect()->route('login')->withErrors(['error' => __t('auth.social.email_not_available')]);
        }

        $user = User::where('email', $email)->first();

        if ($user) {
            if ($user->role === 'candidat' && $user->candidat) {
                if (in_array($user->candidat->status, ['archive', 'refuse'])) {
                    $statusKey = $user->candidat->status === 'archive' ? 'account_archived' : 'account_refused';

                    return redirect()->route('login')->withErrors(['email' => __($statusKey)]);
                }
            }

            // Secure Account Link (Google and LinkedIn both verify emails by default)
            $user->socialAccounts()->create([
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
                'provider_email' => $email,
                'provider_name' => $socialUser->getName(),
                'provider_avatar' => $socialUser->getAvatar(),
                'access_token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'token_expires_at' => isset($socialUser->expiresIn) ? now()->addSeconds($socialUser->expiresIn) : null,
            ]);

            // Mark email as verified since the provider guarantees it
            if (is_null($user->email_verified_at)) {
                $user->forceFill(['email_verified_at' => now()])->save();
            }

            Auth::login($user);
            session()->forget('social_registration_role');

            return redirect()->route('dashboard');
        }

        // 3. Register a new user
        $role = session('social_registration_role');

        // If no role was set in the session, we cannot determine profile type, redirect back to choose role
        if (! in_array($role, ['candidat', 'recruteur'], true)) {
            // Store the social user details in session to link later
            session([
                'social_registration_data' => [
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'provider_email' => $email,
                    'provider_name' => $socialUser->getName(),
                    'provider_avatar' => $socialUser->getAvatar(),
                    'access_token' => $socialUser->token,
                    'refresh_token' => $socialUser->refreshToken,
                    'token_expires_at' => isset($socialUser->expiresIn) ? now()->addSeconds($socialUser->expiresIn) : null,
                ],
            ]);

            // Redirect to login with a message explaining the user must pick a registration type first
            return redirect()->route('login')->with('status', __t('auth.social.choose_profile_first'));
        }

        return DB::transaction(function () use ($socialUser, $provider, $email, $role) {
            // Generate a secure random password (user will login via OAuth or reset password if needed)
            $password = Hash::make(Str::random(32));

            $user = User::create([
                'email' => $email,
                'password' => $password,
                'telephone' => null,
                'role' => $role,
                'is_active' => true,
                'is_archived' => false,
                'email_verified_at' => now(), // Trusted provider
            ]);

            $user->socialAccounts()->create([
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
                'provider_email' => $email,
                'provider_name' => $socialUser->getName(),
                'provider_avatar' => $socialUser->getAvatar(),
                'access_token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'token_expires_at' => isset($socialUser->expiresIn) ? now()->addSeconds($socialUser->expiresIn) : null,
            ]);

            if ($role === 'candidat') {
                $nameParts = explode(' ', $socialUser->getName() ?? '', 2);
                $prenom = $nameParts[0] ?? 'Candidat';
                $nom = $nameParts[1] ?? 'Social';

                $this->createSocialCandidat($user, $prenom, $nom);

                Auth::login($user);
                session()->forget(['social_registration_role', 'social_registration_data']);

                return redirect()->route('candidate.settings');
            } else {
                $user->recruteur()->create([
                    'nom_entreprise' => null, // Nullable by migration, completed in settings
                ]);

                Auth::login($user);
                session()->forget(['social_registration_role', 'social_registration_data']);

                return redirect()->route('recruteur.settings');
            }
        });
    }

    /**
     * Complete registration with chosen role using session data.
     */
    public function completeRegistration(Request $request): RedirectResponse
    {
        $request->validate([
            'role' => ['required', 'string', 'in:candidat,recruteur'],
        ]);

        $socialData = session('social_registration_data');
        if (! $socialData) {
            return redirect()->route('login')->withErrors(['error' => __t('auth.social.session_expired')]);
        }

        $role = $request->input('role');
        $email = $socialData['provider_email'];
        $provider = $socialData['provider'];

        // Check if user already exists
        $user = User::where('email', $email)->first();
        if ($user) {
            if ($user->role === 'candidat' && $user->candidat) {
                if (in_array($user->candidat->status, ['archive', 'refuse'])) {
                    $statusKey = $user->candidat->status === 'archive' ? 'account_archived' : 'account_refused';

                    return redirect()->route('login')->withErrors(['email' => __($statusKey)]);
                }
            }

            // Link if not linked
            if (! $user->socialAccounts()->where('provider', $provider)->exists()) {
                $user->socialAccounts()->create([
                    'provider' => $provider,
                    'provider_id' => $socialData['provider_id'],
                    'provider_email' => $email,
                    'provider_name' => $socialData['provider_name'],
                    'provider_avatar' => $socialData['provider_avatar'],
                    'access_token' => $socialData['access_token'],
                    'refresh_token' => $socialData['refresh_token'],
                    'token_expires_at' => $socialData['token_expires_at'],
                ]);
            }

            // Mark email as verified since the provider guarantees it
            if (is_null($user->email_verified_at)) {
                $user->forceFill(['email_verified_at' => now()])->save();
            }

            Auth::login($user);
            session()->forget('social_registration_data');

            return redirect()->route('dashboard');
        }

        return DB::transaction(function () use ($socialData, $provider, $email, $role) {
            $password = Hash::make(Str::random(32));

            $user = User::create([
                'email' => $email,
                'password' => $password,
                'telephone' => null,
                'role' => $role,
                'is_active' => true,
                'is_archived' => false,
                'email_verified_at' => now(),
            ]);

            $user->socialAccounts()->create([
                'provider' => $provider,
                'provider_id' => $socialData['provider_id'],
                'provider_email' => $email,
                'provider_name' => $socialData['provider_name'],
                'provider_avatar' => $socialData['provider_avatar'],
                'access_token' => $socialData['access_token'],
                'refresh_token' => $socialData['refresh_token'],
                'token_expires_at' => $socialData['token_expires_at'],
            ]);

            if ($role === 'candidat') {
                $nameParts = explode(' ', $socialData['provider_name'] ?? '', 2);
                $prenom = $nameParts[0] ?? 'Candidat';
                $nom = $nameParts[1] ?? 'Social';

                $this->createSocialCandidat($user, $prenom, $nom);

                Auth::login($user);
                session()->forget('social_registration_data');

                return redirect()->route('candidate.settings');
            } else {
                $user->recruteur()->create([
                    'nom_entreprise' => null,
                ]);

                Auth::login($user);
                session()->forget('social_registration_data');

                return redirect()->route('recruteur.settings');
            }
        });
    }

    /**
     * Create a minimal candidat profile after social registration.
     * Required taxonomy fields use defaults until the user completes settings.
     */
    private function createSocialCandidat(User $user, string $prenom, string $nom): void
    {
        $defaultSalaireId = DB::table('salaires')->orderBy('id')->value('id');
        $defaultUrgenceId = DB::table('urgences')->orderBy('id')->value('id');

        if (! $defaultSalaireId || ! $defaultUrgenceId) {
            throw new \RuntimeException(__t('auth.social.taxonomy_missing'));
        }

        $user->candidat()->create([
            'prenom' => $prenom,
            'nom' => $nom,
            'salaire_id' => $defaultSalaireId,
            'urgence_id' => $defaultUrgenceId,
        ]);
    }
}

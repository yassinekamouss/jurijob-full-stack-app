<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureCandidateIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->role === 'candidat' && $user->candidat) {
                if (in_array($user->candidat->status, ['archive', 'refuse'])) {
                    $statusKey = $user->candidat->status === 'archive' ? 'account_archived' : 'account_refused';

                    Auth::logout();

                    $request->session()->invalidate();
                    $request->session()->regenerateToken();

                    return redirect()->route('login')->withErrors(['email' => __($statusKey)]);
                }
            }
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Controllers\Candidate;

use App\DTOs\Candidate\ProfileData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\UpdateProfileRequest;
use App\Repositories\TaxonomyRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $candidat = $user->candidat()->first();

        $candidat->load([
            'experiences',
            'formations',
            'specialisations',
            'langues',
            'villeTravails',
            'modeTravails',
            'typeTravails',
        ]);

        return Inertia::render('candidate/Settings', [
            'candidat' => $candidat,
            'user' => $user->only(['id', 'email', 'telephone', 'role', 'is_active', 'two_factor_confirmed_at']),
            'taxonomies' => TaxonomyRepository::getAll(),
            'experiences' => $candidat->experiences,
            'formations' => $candidat->formations,
            'specialisations' => $candidat->specialisations,
            'langues' => $candidat->langues,
            'villeTravails' => $candidat->villeTravails,
            'modeTravails' => $candidat->modeTravails,
            'typeTravails' => $candidat->typeTravails,
            'profileCompletion' => $candidat->profileCompletion(),
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): RedirectResponse
    {
        $user = $request->user();
        $candidat = $user->candidat;
        $dto = ProfileData::fromRequest($request);

        Log::info('Updating candidat profile', [
            'candidat_id' => $candidat->id,
            'data' => $dto->toArray(),
        ]);

        try {
            $candidat->update($dto->toArray());

            $user->update(['is_active' => $dto->is_active]);

            return back()->with('success', 'Profil mis à jour avec succès.');
        } catch (\Exception $e) {
            Log::error('Error updating candidat profile', [
                'error' => $e->getMessage(),
                'candidat_id' => $candidat->id,
            ]);

            return back()->with('error', 'Erreur lors de la mise à jour du profil.');
        }
    }
}

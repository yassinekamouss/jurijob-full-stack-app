<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
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
        $recruteur = $user->recruteur()->first();

        return Inertia::render('recruiter/Settings', [
            'recruteur' => $recruteur,
            'user' => $user->only(['id', 'email', 'telephone', 'role', 'is_active']),
            'taxonomies' => TaxonomyRepository::getAll(),
        ]);
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nom_entreprise' => 'required|string|max:255',
            'poste' => 'required|string|max:255',
            'type_organisation_id' => 'required|integer|exists:type_organisations,id',
            'taille_entreprise_id' => 'required|integer|exists:taille_entreprises,id',
            'site_web' => 'nullable|url|max:255',
            'ville_id' => 'required|integer|exists:villes,id',
        ]);

        $user = $request->user();
        $recruteur = $user->recruteur()->first();

        Log::info('Updating recruiter profile', [
            'recruteur_id' => $recruteur->id,
            'data_keys' => array_keys($validated),
        ]);

        try {
            $recruteur->update($validated);

            return back()->with('success', 'Profil mis à jour avec succès.');
        } catch (\Exception $e) {
            Log::error('Error updating recruiter profile', [
                'error' => $e->getMessage(),
                'recruteur_id' => $recruteur->id,
            ]);

            return back()->with('error', 'Erreur lors de la mise à jour du profil.');
        }
    }
}

<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $recruteur = $user->recruteur()->first();

        return Inertia::render('recruiter/Settings', [
            'recruteur' => $recruteur,
            'user' => $user->only(['id', 'email', 'telephone', 'role', 'is_active']),
        ]);
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nom_entreprise' => 'required|string|max:255',
            'poste' => 'required|string|max:255',
            'type_organisation' => 'required|string|max:255',
            'taille_entreprise' => 'required|string|max:255',
            'site_web' => 'nullable|url|max:255',
            'ville' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $recruteur = $user->recruteur()->first();
        $recruteur->update($validated);

        return back()->with('success', 'Profil mis à jour avec succès.');
    }
}

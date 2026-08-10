<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Recruteur\Recruteur;

class OffreController extends Controller
{
    /**
     * Affiche les offres spécifiques d'un recruteur.
     */
    public function indexByRecruteur(Recruteur $recruteur)
    {
        $offres = $recruteur->offres()
            ->with([
                'poste',
                'ville',
                'typeTravail',
                'modeTravail',
                'niveauExperience',
            ])
            ->latest()
            ->get();

        return inertia('admin/Demandes-recruteurs', [
            'recruteur' => $recruteur,
            'offres' => $offres,
        ]);
    }
}

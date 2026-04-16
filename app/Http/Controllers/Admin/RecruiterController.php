<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Recruteur\Recruteur;
use Inertia\Inertia;

class RecruiterController extends Controller
{
public function index()
{
    $recruteurs = \App\Models\Recruteur\Recruteur::with(['user', 'ville', 'typeOrganisation', 'tailleEntreprise'])
        ->orderBy('created_at', 'desc')
        ->paginate(10);

    return Inertia::render('admin/Recruteurs', [
        'recruteurs' => $recruteurs
    ]);
}

public function showApplications($id)
{
    $recruteur = \App\Models\Recruteur\Recruteur::with(['user'])->findOrFail($id);

    // Ici, on suppose que tu as une table 'candidatures' liée aux offres du recruteur
    // On récupère les candidatures avec les infos du candidat et le titre de l'offre
    $candidatures = \App\Models\Candidature::whereHas('offre', function($query) use ($id) {
            $query::where('recruteur_id', $id);
        })
        ->with(['candidat.user', 'offre'])
        ->orderBy('created_at', 'desc')
        ->paginate(15);

    return Inertia::render('admin/Applications', [
        'recruteur' => $recruteur,
        'candidatures' => $candidatures
    ]);
}
}
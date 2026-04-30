<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;

class OffreController extends Controller
{
    /**
     * Affiche la liste globale des offres 
     */
    // public function index()
    // {
    //     $offres = Offre::with(['recruteur', 'poste', 'ville'])->latest()->paginate(10);
    //     return view('admin.offres.index', compact('offres'));
    // }

    /**
     * Affiche les offres spécifiques d'un recruteur.
     * 
     * @param Recruteur $recruteur
     * @return \Illuminate\View\View
     */
public function indexByRecruteur(Recruteur $recruteur)
    {
        // On récupère les offres liées au recruteur avec eager loading
        $offres = $recruteur->offres()
            ->with([
                'poste', 
                'ville', 
                'typeTravail', 
                'modeTravail', 
                'niveauExperience'
            ])
            ->latest()
            ->get();

        // CHANGEMENT ICI : Utilise "inertia()" au lieu de "view()"
        // Et assure-toi que la majuscule correspond au nom exact de ton dossier
        return inertia('admin/Demandes-recruteurs', [
            'recruteur' => $recruteur,
            'offres' => $offres
        ]);
    }

    /**
     * Affiche les détails d'une offre spécifique (incluant les critères).
     */
    public function show(Offre $offre)
    {
        // On charge les relations de critères pour l'affichage détaillé
        $offre->load(['critereGroupes.criteres', 'poste', 'ville']);

        return view('admin.offres.show', compact('offre'));
    }

    /**
     * Supprimer une offre (exemple d'action admin).
     */
    public function destroy(Offre $offre)
    {
        $offre->delete();
        return redirect()->back()->with('success', 'Offre supprimée avec succès.');
    }
}
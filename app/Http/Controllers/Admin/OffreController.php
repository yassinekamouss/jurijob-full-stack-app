<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OffreController extends Controller
{
    /**
     * Affiche les offres filtrées par statut pour l'admin.
     */
    public function index(): Response
    {
        $statut = request()->query('statut', 'VERIFICATION_PAIEMENT');
        $search = request()->query('search');

        $allowedStatuts = [
            'EN_TRAITEMENT',
            'ATTENTE_PAIEMENT',
            'VERIFICATION_PAIEMENT',
            'CV_ENVOYES',
            'ARCHIVE',
        ];

        if (! in_array($statut, $allowedStatuts, true)) {
            $statut = 'VERIFICATION_PAIEMENT';
        }

        $query = Offre::query()
            ->with([
                'recruteur.user',
                'poste',
                'ville',
                'typeTravail',
                'modeTravail',
                'niveauExperience',
                'urgence',
            ])
            ->where('statut', $statut);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('titre', 'like', "%{$search}%")
                    ->orWhereHas('recruteur', function ($q) use ($search) {
                        $q->where('nom_entreprise', 'like', "%{$search}%");
                    });
            });
        }

        $offres = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/Offres', [
            'offres' => $offres,
            'currentStatut' => $statut,
            'filters' => request()->only(['search']),
        ]);
    }

    /**
     * Affiche les offres spécifiques d'un recruteur.
     */
    public function indexByRecruteur(Recruteur $recruteur): Response
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

        return Inertia::render('admin/Demandes-recruteurs', [
            'recruteur' => $recruteur,
            'offres' => $offres,
        ]);
    }

    /**
     * Confirme le paiement et passe l'offre à CV_ENVOYES.
     */
    public function confirmPayment(Offre $offre): RedirectResponse
    {
        if ($offre->statut !== 'VERIFICATION_PAIEMENT') {
            return redirect()->back()->with('error', 'Seules les offres en vérification de paiement peuvent être confirmées.');
        }

        $offre->update(['statut' => 'CV_ENVOYES']);

        return redirect()->back()->with('success', 'Paiement confirmé. L\'offre est passée à CV envoyés.');
    }
}

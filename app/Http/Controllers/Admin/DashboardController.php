<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OffreStatut;
use App\Http\Controllers\Controller;
use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatSpecialisation;
use App\Models\Candidat\CandidatVilleTravail;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereMultiple;
use App\Models\Taxonomy\Specialisation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. CVthèque
        $candidats = Candidat::all();
        $cvtheque = [
            'total' => $candidats->count(),
            'valides' => $candidats->where('status', 'accepte')->count(),
            'en_attente' => $candidats->where('status', 'en_attente')->count(),
        ];

        // 2. Demandes en cours
        $offres = Offre::all();
        $demandesEnCours = [
            'total' => $offres->whereIn('statut', [
                OffreStatut::EnTraitement->value,
                OffreStatut::AttentePaiement->value,
                OffreStatut::VerificationPaiement->value,
            ])->count(),
            'terminees' => $offres->where('statut', OffreStatut::CvEnvoyes->value)->count(),
            'annulees' => $offres->where('statut', OffreStatut::Archive->value)->count(),
        ];

        // 3. Encaissé
        $unitPrice = (int) config('jurijob.cv_unit_price_mad', 0);
        $offresPayees = $offres->where('statut', OffreStatut::CvEnvoyes->value);
        $encaisse = [
            'total_mad' => $offresPayees->sum('nombre_cv') * $unitPrice,
            'paiements_confirmes' => $offresPayees->count(),
        ];

        // 4. Alertes actives
        $alertesActives = [
            'total' => $cvtheque['en_attente'] + $offres->where('statut', OffreStatut::VerificationPaiement->value)->count(),
        ];

        // 5. Ecart par spécialisation
        $specialisations = Specialisation::all();
        $ecartSpecialisation = [];

        $candidatsSpecCounts = CandidatSpecialisation::whereHas('candidat', function ($q) {
            $q->where('status', 'accepte');
        })
            ->selectRaw('specialisation_id, count(*) as count')
            ->groupBy('specialisation_id')
            ->pluck('count', 'specialisation_id');

        $offresSpecCounts = OffreCritereMultiple::where('type_critere', 'SPECIALISATION')
            ->selectRaw('critere_id, count(*) as count')
            ->groupBy('critere_id')
            ->pluck('count', 'critere_id');

        foreach ($specialisations as $spec) {
            $offreCount = $candidatsSpecCounts->get($spec->id, 0);
            $demandeCount = $offresSpecCounts->get($spec->id, 0);

            if ($demandeCount > 0 || $offreCount > 0) {
                $ecartSpecialisation[] = [
                    'id' => $spec->id,
                    'name_fr' => $spec->nom_fr,
                    'name_en' => $spec->nom_en,
                    'demande' => $demandeCount,
                    'offre' => $offreCount,
                    'excedent' => max(0, $offreCount - $demandeCount),
                    'deficit' => max(0, $demandeCount - $offreCount),
                ];
            }
        }
        usort($ecartSpecialisation, fn ($a, $b) => $b['demande'] <=> $a['demande']);

        // 6. Repartition geographique
        $repartitionGeographiqueRaw = CandidatVilleTravail::with('ville.pays')
            ->whereHas('candidat', function ($q) {
                $q->where('status', 'accepte');
            })
            ->get()
            ->groupBy('ville.pays.code') // Group by country code to avoid localization issues in keys
            ->map(function ($group) {
                return [
                    'count' => $group->unique('candidat_id')->count(),
                    'pays' => $group->first()->ville->pays,
                ];
            });

        $repartitionGeographique = [];
        foreach ($repartitionGeographiqueRaw as $code => $data) {
            $repartitionGeographique[] = [
                'country_code' => $code,
                'country_fr' => $data['pays']->nom_fr ?? $code,
                'country_en' => $data['pays']->nom_en ?? $code,
                'count' => $data['count'],
                'percentage' => $cvtheque['valides'] > 0 ? round(($data['count'] / $cvtheque['valides']) * 100) : 0,
            ];
        }
        usort($repartitionGeographique, fn ($a, $b) => $b['count'] <=> $a['count']);

        // 7. Tunnel de conversion
        $totalDemandesRecues = $offres->count();
        $shortListsEnvoyees = $offres->whereIn('statut', [
            OffreStatut::AttentePaiement->value,
            OffreStatut::VerificationPaiement->value,
            OffreStatut::CvEnvoyes->value,
        ])->count();
        $payees = $offresPayees->count();

        $tunnelConversion = [
            'demandes_recues' => [
                'count' => $totalDemandesRecues,
                'percentage' => 100,
            ],
            'short_lists_envoyees' => [
                'count' => $shortListsEnvoyees,
                'percentage' => $totalDemandesRecues > 0 ? round(($shortListsEnvoyees / $totalDemandesRecues) * 100) : 0,
            ],
            'payees' => [
                'count' => $payees,
                'percentage' => $shortListsEnvoyees > 0 ? round(($payees / $shortListsEnvoyees) * 100) : 0,
            ],
        ];

        // 8. Qualite des profils
        $profilsComplets = $candidats->filter(function ($candidat) {
            return $candidat->status === 'accepte'
                && $candidat->postes()->exists()
                && filled($candidat->niveau_experience_id)
                && filled($candidat->formation_juridique_id)
                && filled($candidat->salaire_id)
                && filled($candidat->urgence_id)
                && filled($candidat->nom)
                && filled($candidat->prenom);
        })->count();

        $qualiteProfils = [
            'complets' => $profilsComplets,
            'total_valides' => $cvtheque['valides'],
            'percentage' => $cvtheque['valides'] > 0 ? round(($profilsComplets / $cvtheque['valides']) * 100) : 0,
        ];

        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'cvtheque' => $cvtheque,
                'demandes_en_cours' => $demandesEnCours,
                'encaisse' => $encaisse,
                'alertes_actives' => $alertesActives,
                'ecart_specialisation' => $ecartSpecialisation,
                'repartition_geographique' => $repartitionGeographique,
                'tunnel_conversion' => $tunnelConversion,
                'qualite_profils' => $qualiteProfils,
            ],
        ]);
    }
}

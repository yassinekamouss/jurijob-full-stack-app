<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OffreStatut;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ArchiveOffreRequest;
use App\Http\Requests\Admin\ConfirmPaymentRequest;
use App\Http\Requests\Admin\CustomMatchingRequest;
use App\Http\Requests\Admin\SendOffreMatchesRequest;
use App\Mail\Candidate\CandidateMatchedMail;
use App\Mail\Recruiter\RecruiterShortlistReadyMail;
use App\Mail\Recruiter\RecruiterShortlistUnlockedMail;
use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreMatch;
use App\Models\Recruteur\Recruteur;
use App\Repositories\TaxonomyRepository;
use App\Services\CandidateMatching\MatchingCriteria;
use App\Services\CandidateMatching\MatchingEngine;
use App\Services\Offre\OffreRequirementsPresenter;
use App\Services\Offre\OffreStatusTransition;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use InvalidArgumentException;

class OffreController extends Controller
{
    public function __construct(
        private MatchingEngine $matchingEngine,
        private OffreStatusTransition $statusTransition,
        private OffreRequirementsPresenter $requirementsPresenter,
    ) {}

    /**
     * Affiche les offres filtrées par statut pour l'admin.
     */
    public function index(): Response
    {
        $statut = request()->query('statut', OffreStatut::VerificationPaiement->value);
        $search = request()->query('search');

        $allowedStatuts = OffreStatut::values();

        if (! in_array($statut, $allowedStatuts, true)) {
            $statut = OffreStatut::VerificationPaiement->value;
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
                'formationJuridique',
                'salaire',
                'criteresMultiples',
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

        $offres->getCollection()->transform(function (Offre $offre) {
            $offre->setAttribute('requirements', $this->requirementsPresenter->forOffre($offre));

            return $offre;
        });

        return Inertia::render('admin/Offres', [
            'offres' => $offres,
            'currentStatut' => $statut,
            'filters' => request()->only(['search']),
            'taxonomies' => TaxonomyRepository::getAll(),
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
     * Affiche les candidats matchés pour une offre (admin).
     */
    public function matching(Offre $offre): Response
    {
        $offre->load([
            'recruteur.user',
            'poste',
            'ville',
            'typeTravail',
            'modeTravail',
            'niveauExperience',
            'formationJuridique',
            'salaire',
            'urgence',
            'criteresMultiples',
            'matches',
        ]);

        $offre->setAttribute('requirements', $this->requirementsPresenter->forOffre($offre));

        return Inertia::render('admin/OffreMatching', [
            'offre' => $offre,
            'candidates' => $this->matchingEngine->getMatches($offre),
            'appliedCriteria' => null,
            'alreadySent' => $offre->matches()->exists() || $offre->statut !== OffreStatut::EnTraitement->value,
        ]);
    }

    /**
     * Lance un matching personnalisé : l'admin ajuste / désactive des critères
     * puis reçoit les candidats correspondants. Les critères ne sont pas
     * persistés sur l'offre.
     */
    public function customMatching(CustomMatchingRequest $request, Offre $offre): Response
    {
        $criteria = MatchingCriteria::fromRequest($request->validated());

        $offre->load([
            'recruteur.user',
            'poste',
            'ville',
            'typeTravail',
            'modeTravail',
            'niveauExperience',
            'formationJuridique',
            'salaire',
            'urgence',
            'criteresMultiples',
        ]);

        $offre->setAttribute('requirements', $this->requirementsPresenter->forOffre($offre));

        return Inertia::render('admin/OffreMatching', [
            'offre' => $offre,
            'candidates' => $this->matchingEngine->getMatches($offre, $criteria),
            'appliedCriteria' => $this->presentAppliedCriteria($offre, $criteria),
            'alreadySent' => false,
        ]);
    }

    /**
     * Enregistre la short-list (avec les scores fournis par l'admin) et passe
     * l'offre en attente de paiement.
     */
    public function sendMatches(SendOffreMatchesRequest $request, Offre $offre): RedirectResponse
    {
        $candidates = collect($request->validated('candidates'))
            ->map(fn (array $candidate): array => [
                'id' => (int) $candidate['id'],
                'score' => (int) $candidate['score'],
            ])
            ->values();

        try {
            DB::transaction(function () use ($offre, $candidates): void {
                $offre->matches()->delete();

                foreach ($candidates as $candidate) {
                    OffreMatch::query()->create([
                        'offre_id' => $offre->id,
                        'candidat_id' => $candidate['id'],
                        'score' => $candidate['score'],
                    ]);
                }

                $this->statusTransition->transition(
                    $offre,
                    OffreStatut::AttentePaiement,
                    OffreStatusTransition::ACTOR_ADMIN,
                    [
                        'payment_reference' => $offre->payment_reference ?: $this->generatePaymentReference($offre),
                    ]
                );
            });
        } catch (\RuntimeException|InvalidArgumentException) {
            return redirect()->back()->with('error', 'Impossible de traiter cette offre : statut invalide.');
        }

        $offre->load(['recruteur.user', 'poste', 'ville', 'typeTravail']);
        $recruteur = $offre->recruteur;

        if ($recruteur?->user?->email) {
            Mail::to($recruteur->user->email)->queue(
                new RecruiterShortlistReadyMail(
                    recruteur: $recruteur,
                    offre: $offre,
                    shortlistCount: $candidates->count(),
                    paymentUrl: route('offres.payment', $offre),
                )
            );
        }

        $candidatIds = $candidates->pluck('id');
        $candidats = Candidat::with('user')->whereIn('id', $candidatIds)->get();

        foreach ($candidats as $candidat) {
            if ($candidat->user?->email) {
                Mail::to($candidat->user->email)->queue(
                    new CandidateMatchedMail(
                        candidat: $candidat,
                        offre: $offre,
                        dashboardUrl: route('offres.index'),
                    )
                );
            }
        }

        return redirect()
            ->route('admin.offres.index', ['statut' => OffreStatut::AttentePaiement->value])
            ->with('success', 'Candidats envoyés au recruteur. L\'offre est passée en attente de paiement.');
    }

    /**
     * Confirme le paiement et passe l'offre à CV_ENVOYES.
     */
    public function confirmPayment(ConfirmPaymentRequest $request, Offre $offre): RedirectResponse
    {
        $this->statusTransition->transition(
            $offre,
            OffreStatut::CvEnvoyes,
            OffreStatusTransition::ACTOR_ADMIN,
        );

        $offre->load(['recruteur.user', 'poste', 'ville', 'typeTravail']);
        $recruteur = $offre->recruteur;

        if ($recruteur?->user?->email) {
            Mail::to($recruteur->user->email)->queue(
                new RecruiterShortlistUnlockedMail(
                    recruteur: $recruteur,
                    offre: $offre,
                    shortlistCount: $offre->matches()->count(),
                    shortlistUrl: route('offres.profiles', $offre),
                    accessExpiryDate: now()->addDays(30)->format('d/m/Y'),
                )
            );
        }

        return redirect()
            ->route('admin.offres.index', ['statut' => OffreStatut::CvEnvoyes->value])
            ->with('success', 'Paiement confirmé. Les profils sont maintenant débloqués pour le recruteur.');
    }

    /**
     * Repasser à EN_TRAITEMENT (uniquement depuis ATTENTE_PAIEMENT), supprime les matches.
     */
    public function revertToTraitement(Offre $offre): RedirectResponse
    {
        if ($offre->statut !== OffreStatut::AttentePaiement->value) {
            return redirect()->back()->with('error', "L'offre n'est pas en attente de paiement.");
        }

        \DB::transaction(function () use ($offre) {
            // Delete related matches
            $offre->matches()->delete();

            // Transition back to EN_TRAITEMENT
            $this->statusTransition->transition(
                $offre,
                OffreStatut::EnTraitement,
                OffreStatusTransition::ACTOR_ADMIN
            );
        });

        return redirect()
            ->route('admin.offres.index', ['statut' => OffreStatut::EnTraitement->value])
            ->with('success', "L'offre a été repassée en traitement et les profils associés supprimés.");
    }

    /**
     * Archive l'offre depuis n'importe quel statut.
     */
    public function archive(ArchiveOffreRequest $request, Offre $offre): RedirectResponse
    {
        try {
            $this->statusTransition->transition(
                $offre,
                OffreStatut::Archive,
                OffreStatusTransition::ACTOR_ADMIN,
            );
        } catch (InvalidArgumentException) {
            return redirect()->back()->with('error', 'Impossible d\'archiver cette offre.');
        }

        return redirect()
            ->route('admin.offres.index', ['statut' => OffreStatut::Archive->value])
            ->with('success', 'L\'offre a été archivée avec succès.');
    }

    /**
     * Présente les critères appliqués lors d'un matching personnalisé, avec
     * leurs libellés, pour affichage côté frontend.
     *
     * @return array<string, mixed>
     */
    private function presentAppliedCriteria(Offre $offre, MatchingCriteria $criteria): array
    {
        $relation = fn (?int $id, string $relationName): ?array => $id !== null && $offre->$relationName !== null
            ? ['id' => $id, 'nom' => $offre->$relationName->nom]
            : null;

        return [
            'poste' => $relation($criteria->posteId, 'poste'),
            'niveau_experience' => $relation($criteria->niveauExperienceId, 'niveauExperience'),
            'formation_juridique' => $relation($criteria->formationJuridiqueId, 'formationJuridique'),
            'salaire' => $relation($criteria->salaireId, 'salaire'),
            'ville' => $relation($criteria->villeId, 'ville'),
            'type_travail' => $relation($criteria->typeTravailId, 'typeTravail'),
            'mode_travail' => $relation($criteria->modeTravailId, 'modeTravail'),
            'requirements' => $this->requirementsPresenter->forCriteria($criteria),
        ];
    }

    private function generatePaymentReference(Offre $offre): string
    {
        return sprintf(
            'JJ-%s-%s%s',
            now()->format('Y'),
            str_pad((string) $offre->id, 5, '0', STR_PAD_LEFT),
            strtoupper(substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ'), 0, 1))
        );
    }
}

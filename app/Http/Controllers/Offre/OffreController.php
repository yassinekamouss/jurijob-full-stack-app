<?php

namespace App\Http\Controllers\Offre;

use App\DTOs\Offre\OffreData;
use App\DTOs\Offre\RequirementData;
use App\Enums\OffreStatut;
use App\Http\Controllers\Controller;
use App\Http\Requests\Offre\ConfirmTransferRequest;
use App\Http\Requests\Offre\StoreOffreRequest;
use App\Mail\Recruiter\RecruiterRequestConfirmedMail;
use App\Models\Offre\Offre;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\Specialisation;
use App\Repositories\TaxonomyRepository;
use App\Services\Offre\OffreRequirementsPresenter;
use App\Services\Offre\OffreStatusTransition;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class OffreController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        private OffreStatusTransition $statusTransition,
        private OffreRequirementsPresenter $requirementsPresenter,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = auth()->user();
        $user->loadMissing('recruteur.ville.pays');

        $recruteur = $user->recruteur;

        $offres = $recruteur->offres()
            ->with(['poste', 'typeTravail', 'modeTravail', 'niveauExperience', 'criteresMultiples'])
            ->latest()
            ->get()
            ->map(function (Offre $offre) {
                $baseCriteriaCount = collect([
                    $offre->poste_id,
                    $offre->type_travail_id,
                    $offre->mode_travail_id,
                    $offre->ville_id,
                    $offre->niveau_experience_id,
                    $offre->formation_juridique_id,
                    $offre->salaire_id,
                    $offre->urgence_id,
                ])->filter()->count();

                $offre->setAttribute('criteria_count', $baseCriteriaCount + $offre->criteresMultiples->count());

                return $offre;
            });

        return Inertia::render('Offres/Index', [
            'offres' => $offres,
            'recruteur' => $recruteur,
            'user' => $user->only(['id', 'email', 'telephone', 'role', 'is_active']),
            'profileCompletion' => $recruteur?->profileCompletion(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Offres/Create', [
            'taxonomies' => TaxonomyRepository::getAll(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOffreRequest $request): RedirectResponse
    {
        $recruteur = $request->user()->recruteur;
        $offreData = OffreData::fromRequest($request);

        DB::beginTransaction();
        try {
            /** @var Offre $offre */
            $offre = $recruteur->offres()->create($offreData->toArray());

            $this->syncCriteresMultiples($offre, $offreData->requirements);

            DB::commit();

            $offre->load(['recruteur.user', 'poste', 'ville', 'typeTravail']);

            if ($request->user()?->email) {
                Mail::to($request->user()->email)->queue(
                    new RecruiterRequestConfirmedMail(
                        recruteur: $recruteur,
                        offre: $offre,
                        dashboardUrl: route('offres.index'),
                    )
                );
            }

            $nomEntreprise = $recruteur->nom_entreprise;
            $nombreCv = $offreData->nombre_cv;

            return to_route('offres.index')->with('success', __t('flash.offre_submitted', ['entreprise' => $nomEntreprise, 'count' => $nombreCv]));
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', "Erreur lors de la publication de l'offre : ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Offre $offre): Response|RedirectResponse
    {
        $this->authorize('view', $offre);

        if ($offre->statut === OffreStatut::AttentePaiement->value) {
            return to_route('offres.payment', $offre);
        }

        if ($offre->statut === OffreStatut::CvEnvoyes->value) {
            return to_route('offres.profiles', $offre);
        }

        $offre->load([
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

        $offreData = array_merge($offre->toArray(), [
            'requirements' => $this->requirementsPresenter->forOffre($offre),
        ]);

        return Inertia::render('Offres/Show', [
            'offre' => $offreData,
        ]);
    }

    /**
     * Display unlocked professional profiles for a paid offer.
     */
    public function profiles(Offre $offre): Response|RedirectResponse
    {
        $this->authorize('view', $offre);

        if ($offre->statut === OffreStatut::AttentePaiement->value) {
            return to_route('offres.payment', $offre);
        }

        if ($offre->statut !== OffreStatut::CvEnvoyes->value) {
            return to_route('offres.show', $offre);
        }

        $offre->load([
            'typeTravail',
            'modeTravail',
            'ville',
            'criteresMultiples',
            'matches' => fn ($query) => $query->orderByDesc('score'),
            'matches.candidat.user:id,email,telephone',
            'matches.candidat.postes.poste',
            'matches.candidat.niveauExperience',
            'matches.candidat.formationJuridique',
            'matches.candidat.salaire',
            'matches.candidat.urgence',
            'matches.candidat.experiences.poste',
            'matches.candidat.experiences.typeTravail',
            'matches.candidat.formations.ecole',
            'matches.candidat.formations.formationJuridique',
            'matches.candidat.formations.specialisation',
            'matches.candidat.langues.langue',
            'matches.candidat.langues.niveauLangue',
            'matches.candidat.specialisations.specialisation',
            'matches.candidat.villeTravails.ville',
            'matches.candidat.modeTravails.modeTravail',
            'matches.candidat.typeTravails.typeTravail',
        ]);

        $langueIds = $offre->criteresMultiples->where('type_critere', 'LANGUE')->pluck('critere_id');
        $specialisationIds = $offre->criteresMultiples->where('type_critere', 'SPECIALISATION')->pluck('critere_id');

        $requiredLangues = Langue::query()
            ->whereIn('id', $langueIds)
            ->get()
            ->map(fn (Langue $langue) => $langue->nom)
            ->filter()
            ->unique()
            ->values();

        $requiredSpecialisations = Specialisation::query()
            ->whereIn('id', $specialisationIds)
            ->get()
            ->map(fn (Specialisation $specialisation) => $specialisation->nom)
            ->filter()
            ->unique()
            ->values();

        $profiles = $offre->matches
            ->filter(fn ($match) => $match->candidat !== null)
            ->map(function ($match) {
                $candidat = $match->candidat;

                return [
                    'id' => $candidat->id,
                    'match_score' => $match->score,
                    'nom' => $candidat->nom,
                    'prenom' => $candidat->prenom,
                    'email' => $candidat->user?->email,
                    'telephone' => $candidat->user?->telephone,
                    'poste' => $candidat->postes->pluck('poste')->filter()->pluck('nom')->values()->implode(', '),
                    'niveau_experience' => $candidat->niveauExperience?->nom,
                    'exact_experience_months' => $candidat->calculateTotalExperienceMonths(),
                    'formation_juridique' => $candidat->formationJuridique?->nom,
                    'salaire' => $candidat->salaire?->nom,
                    'urgence' => $candidat->urgence?->nom,
                    'specialisations' => $candidat->specialisations
                        ->map(fn ($item) => $item->specialisation?->nom)
                        ->filter()
                        ->unique()
                        ->values(),
                    'langues' => $candidat->langues
                        ->map(fn ($item) => [
                            'nom' => $item->langue?->nom,
                            'niveau' => $item->niveauLangue?->nom,
                        ])
                        ->filter(fn ($item) => filled($item['nom']))
                        ->unique(fn ($item) => mb_strtolower(trim((string) $item['nom'])))
                        ->values(),
                    'villes' => $candidat->villeTravails
                        ->map(fn ($item) => $item->ville?->nom)
                        ->filter()
                        ->unique()
                        ->values(),
                    'modes_travail' => $candidat->modeTravails
                        ->map(fn ($item) => $item->modeTravail?->nom)
                        ->filter()
                        ->unique()
                        ->values(),
                    'types_travail' => $candidat->typeTravails
                        ->map(fn ($item) => $item->typeTravail?->nom)
                        ->filter()
                        ->unique()
                        ->values(),
                    'experiences' => $candidat->experiences
                        ->sortByDesc('debut')
                        ->values()
                        ->map(fn ($experience) => [
                            'entreprise' => $experience->entreprise,
                            'poste' => $experience->poste?->nom,
                            'type_travail' => $experience->typeTravail?->nom,
                            'debut' => $experience->debut,
                            'fin' => $experience->fin,
                        ]),
                    'formations' => $candidat->formations
                        ->sortByDesc('annee_fin')
                        ->values()
                        ->map(fn ($formation) => [
                            'ecole' => $formation->ecole?->nom ?? $formation->autre_ecole,
                            'formation_juridique' => $formation->formationJuridique?->nom,
                            'specialisation' => $formation->specialisation?->nom,
                            'annee_debut' => $formation->annee_debut,
                            'annee_fin' => $formation->annee_fin,
                        ]),
                ];
            })
            ->values();

        return Inertia::render('Offres/Profiles', [
            'offre' => [
                'id' => $offre->id,
                'titre' => $offre->titre,
                'statut' => $offre->statut,
                'ville' => $offre->ville?->nom,
                'type_travail' => $offre->typeTravail?->nom,
                'mode_travail' => $offre->modeTravail?->nom,
                'specialisations' => $requiredSpecialisations,
                'langues' => $requiredLangues,
            ],
            'profiles' => $profiles,
        ]);
    }

    /**
     * Display bank transfer payment instructions for a shortlisted offer.
     */
    public function payment(Offre $offre): Response|RedirectResponse
    {
        $this->authorize('view', $offre);

        if ($offre->statut !== OffreStatut::AttentePaiement->value) {
            return to_route('offres.show', $offre);
        }

        $profilesCount = $offre->matches()->count();
        $unitPrice = (int) config('jurijob.cv_unit_price_mad');

        if (! $offre->payment_reference) {
            $offre->update([
                'payment_reference' => sprintf(
                    'JJ-%s-%s%s',
                    now()->format('Y'),
                    str_pad((string) $offre->id, 5, '0', STR_PAD_LEFT),
                    strtoupper(substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ'), 0, 1))
                ),
            ]);
            $offre->refresh();
        }

        return Inertia::render('Offres/Payment', [
            'offre' => [
                'id' => $offre->id,
                'titre' => $offre->titre,
                'statut' => $offre->statut,
                'payment_reference' => $offre->payment_reference,
            ],
            'payment' => [
                'profiles_count' => $profilesCount,
                'unit_price_mad' => $unitPrice,
                'total_mad' => $profilesCount * $unitPrice,
                'bank' => config('jurijob.bank'),
                'support_email' => config('jurijob.support_email'),
            ],
        ]);
    }

    /**
     * Recruiter confirms that the bank transfer has been made.
     */
    public function confirmTransfer(ConfirmTransferRequest $request, Offre $offre): RedirectResponse
    {
        $this->statusTransition->transition(
            $offre,
            OffreStatut::VerificationPaiement,
            OffreStatusTransition::ACTOR_RECRUTEUR,
        );

        return to_route('offres.index')
            ->with('success', __t('flash.payment_reported'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offre $offre): RedirectResponse
    {
        $this->authorize('delete', $offre);

        try {
            $offre->delete();

            return to_route('offres.index')->with('success', __t('flash.offre_deleted'));
        } catch (\Exception $e) {
            return back()->with('error', "Erreur lors de la suppression de l'offre.");
        }
    }

    /**
     * Sync multiple-choice criteria (Langues and Spécialisations) for an offer.
     *
     * @param  RequirementData[]  $requirements
     */
    private function syncCriteresMultiples(Offre $offre, array $requirements): void
    {
        $offre->criteresMultiples()->delete();

        foreach ($requirements as $req) {
            $offre->criteresMultiples()->create([
                'type_critere' => $req->taxonomy_type,
                'critere_id' => $req->taxonomy_id,
                'metadata' => empty($req->metadata) ? null : $req->metadata,
            ]);
        }
    }
}

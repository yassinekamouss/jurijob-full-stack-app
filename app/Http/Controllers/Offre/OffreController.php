<?php

namespace App\Http\Controllers\Offre;

use App\DTOs\Offre\OffreData;
use App\DTOs\Offre\RequirementData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Offre\StoreOffreRequest;
use App\Models\Offre\Offre;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Specialisation;
use App\Repositories\TaxonomyRepository;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OffreController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        auth()->user()->loadMissing('recruteur');

        $offres = auth()->user()->recruteur->offres()
            ->with(['poste', 'typeTravail', 'modeTravail', 'niveauExperience', 'criteresMultiples'])
            ->latest()
            ->get()
            ->map(function (Offre $offre) {
                $offre->setAttribute('criteria_count', $offre->criteresMultiples->count());

                return $offre;
            });

        return Inertia::render('Offres/Index', [
            'offres' => $offres,
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

            $nomEntreprise = $recruteur->nom_entreprise;
            $nombreCv = $offreData->nombre_cv;

            return to_route('offres.index')->with('success', "Merci, {$nomEntreprise} !\nVotre demande a été transmise à l'équipe JURIJOB.\n\nVotre short-list de {$nombreCv} CV vous sera communiquée sous 48h ouvrées. Vous pouvez suivre son statut depuis votre tableau de bord.");
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', "Erreur lors de la publication de l'offre : ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Offre $offre): Response
    {
        $this->authorize('view', $offre);

        $offre->load([
            'poste',
            'typeTravail',
            'modeTravail',
            'niveauExperience',
            'formationJuridique',
            'salaire',
            'urgence',
            'criteresMultiples',
        ]);

        $offreData = array_merge($offre->toArray(), [
            'requirements' => $this->transformCriteresMultiplesToRequirements($offre),
        ]);

        return Inertia::render('Offres/Show', [
            'offre' => $offreData,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offre $offre): Response
    {
        $this->authorize('update', $offre);

        $offre->load(['criteresMultiples']);

        $offreData = array_merge($offre->toArray(), [
            'requirements' => $this->transformCriteresMultiplesToRequirements($offre),
        ]);

        return Inertia::render('Offres/Edit', [
            'offre' => $offreData,
            'taxonomies' => TaxonomyRepository::getAll(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOffreRequest $request, Offre $offre): RedirectResponse
    {
        $this->authorize('update', $offre);
        $offreData = OffreData::fromRequest($request);

        DB::beginTransaction();
        try {
            $offre->update($offreData->toArray());

            $this->syncCriteresMultiples($offre, $offreData->requirements);

            DB::commit();

            return to_route('offres.index')->with('success', 'Offre mise à jour avec succès.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', "Erreur lors de la mise à jour de l'offre.");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offre $offre): RedirectResponse
    {
        $this->authorize('delete', $offre);

        try {
            $offre->delete();

            return to_route('offres.index')->with('success', 'Offre supprimée avec succès.');
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

    /**
     * Transform criteresMultiples back to requirements format for frontend compatibility.
     *
     * @return array<int, array<string, mixed>>
     */
    private function transformCriteresMultiplesToRequirements(Offre $offre): array
    {
        $requirements = [];

        $langueIds = $offre->criteresMultiples->where('type_critere', 'LANGUE')->pluck('critere_id');
        $specialisationIds = $offre->criteresMultiples->where('type_critere', 'SPECIALISATION')->pluck('critere_id');

        $langues = Langue::whereIn('id', $langueIds)->get()->keyBy('id');
        $specialisations = Specialisation::whereIn('id', $specialisationIds)->get()->keyBy('id');
        $niveauLangues = NiveauLangue::all()->keyBy('id');

        foreach ($offre->criteresMultiples as $critere) {
            $label = match ($critere->type_critere) {
                'LANGUE' => $langues[$critere->critere_id]?->nom ?? 'Inconnu',
                'SPECIALISATION' => $specialisations[$critere->critere_id]?->nom ?? 'Inconnu',
                default => 'Inconnu',
            };

            $metadata = $critere->metadata ?? [];

            if ($critere->type_critere === 'LANGUE' && isset($metadata['niveau_langue_id'])) {
                $metadata['niveau_nom'] = $niveauLangues[$metadata['niveau_langue_id']]?->nom ?? null;
            }

            $requirements[] = [
                'taxonomy_id' => $critere->critere_id,
                'taxonomy_type' => $critere->type_critere,
                'label' => $label,
                'metadata' => $metadata,
            ];
        }

        return $requirements;
    }
}

<?php

namespace App\Http\Controllers\Offre;

use App\DTOs\Offre\OffreData;
use App\DTOs\Offre\RequirementData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Offre\StoreOffreRequest;
use App\Models\Offre\Offre;
use App\Models\Taxonomy\DomaineExperience;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\Ville;
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
            ->with(['poste', 'typeTravail', 'modeTravail', 'niveauExperience', 'critereGroupes'])
            ->latest()
            ->get()
            ->map(function (Offre $offre) {
                // Count total criteria across all groups
                $totalCriteria = $offre->critereGroupes
                    ->reduce(fn ($sum, $groupe) => $sum + $groupe->criteres->count(), 0);

                $offre->setAttribute('criteria_count', $totalCriteria);

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

            $this->syncRequirements($offre, $offreData->requirements);

            DB::commit();

            return to_route('offres.matching', $offre)->with('success', 'Offre publiée avec succès.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Erreur lors de la publication de l\'offre : '.$e->getMessage());
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
            'critereGroupes.criteres',
        ]);

        $offreData = array_merge($offre->toArray(), [
            'requirements' => $this->transformCritereGroupesToRequirements($offre),
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

        $offre->load(['critereGroupes.criteres']);

        $offreData = array_merge($offre->toArray(), [
            'requirements' => $this->transformCritereGroupesToRequirements($offre),
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

            $this->syncRequirements($offre, $offreData->requirements);

            DB::commit();

            return to_route('offres.index')->with('success', 'Offre mise à jour avec succès.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Erreur lors de la mise à jour de l\'offre.');
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
            return back()->with('error', 'Erreur lors de la suppression de l\'offre.');
        }
    }

    /**
     * Sync all requirement types for an offer using the new critereGroupes architecture.
     *
     * @param  RequirementData[]  $requirements
     */
    private function syncRequirements(Offre $offre, array $requirements): void
    {
        // Define type mapping from frontend to type_critere
        $typeMapping = [
            'ville' => 'ville',
            'specialisation' => 'specialisation',
            'langue' => 'langue',
            'domaine_experience' => 'domaine_experience',
            'formation_juridique' => 'formation_juridique',
        ];

        // Group requirements by type_critere
        $grouped = [];
        foreach ($requirements as $req) {
            $typeCritere = $typeMapping[$req->taxonomy_type] ?? null;
            if (! $typeCritere) {
                continue;
            }

            if (! isset($grouped[$typeCritere])) {
                $grouped[$typeCritere] = [];
            }

            $grouped[$typeCritere][] = [
                'critere_id' => $req->taxonomy_id,
                'valeur_id' => $req->requirements_data['niveau_langue_id'] ?? null,
                'importance' => $req->importance,
                'operator' => $req->operator ?? 'OR',
            ];
        }

        // Delete existing critereGroupes for this offre
        $offre->critereGroupes()->delete();

        // Create new critereGroupes with their criteres
        foreach ($grouped as $typeCritere => $items) {
            $groupe = $offre->critereGroupes()->create([
                'type_critere' => $typeCritere,
                'operateur' => $items[0]['operator'] ?? 'OR',
            ]);

            foreach ($items as $item) {
                unset($item['operator']);
                $groupe->criteres()->create($item);
            }
        }
    }

    /**
     * Transform critereGroupes back to requirements format for frontend compatibility.
     */
    private function transformCritereGroupesToRequirements(Offre $offre): array
    {
        $requirements = [];
        $typeMapping = [
            'ville' => 'ville',
            'specialisation' => 'specialisation',
            'langue' => 'langue',
            'domaine_experience' => 'domaine_experience',
            'formation_juridique' => 'formation_juridique',
        ];

        $taxonomyModels = [
            'ville' => Ville::class,
            'specialisation' => Specialisation::class,
            'langue' => Langue::class,
            'domaine_experience' => DomaineExperience::class,
            'formation_juridique' => FormationJuridique::class,
        ];

        foreach ($offre->critereGroupes as $groupe) {
            $modelClass = $taxonomyModels[$groupe->type_critere] ?? null;
            $items = $modelClass ? $modelClass::whereIn('id', $groupe->criteres->pluck('critere_id'))->get()->keyBy('id') : collect();

            foreach ($groupe->criteres as $critere) {
                $taxonomyType = $typeMapping[$groupe->type_critere] ?? $groupe->type_critere;

                $requirementData = [];
                if ($groupe->type_critere === 'langue' && $critere->valeur_id) {
                    $requirementData['niveau_langue_id'] = $critere->valeur_id;
                    $niveau = NiveauLangue::find($critere->valeur_id);
                    if ($niveau) {
                        $requirementData['niveau_nom'] = $niveau->nom;
                    }
                }

                $requirements[] = [
                    'taxonomy_id' => $critere->critere_id,
                    'taxonomy_type' => $taxonomyType,
                    'label' => $items[$critere->critere_id]->nom ?? 'Inconnu',
                    'importance' => $critere->importance,
                    'operator' => $groupe->operateur,
                    'requirements_data' => $requirementData,
                ];
            }
        }

        return $requirements;
    }
}

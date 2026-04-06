<?php

namespace App\Http\Controllers\Offre;

use App\DTOs\Offre\OffreData;
use App\DTOs\Offre\RequirementData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Offre\StoreOffreRequest;
use App\Models\Offre\Offre;
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
            ->with(['poste', 'typeTravail'])
            ->withCount([
                'langueRequirements',
                'villeRequirements',
                'specialisationRequirements',
                'modeTravailRequirements',
                'domainExperienceRequirements',
                'formationJuridiqueRequirements',
            ])
            ->latest()
            ->get();

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

            return to_route('offres.index')->with('success', 'Offre publiée avec succès.');
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
            'langueRequirements.langue',
            'langueRequirements.niveauLangue',
            'specialisationRequirements.specialisation',
            'villeRequirements.ville',
            'modeTravailRequirements.modeTravail',
            'domainExperienceRequirements.domaineExperience',
            'formationJuridiqueRequirements.formationJuridique',
        ]);

        return Inertia::render('Offres/Show', [
            'offre' => $offre,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offre $offre): Response
    {
        $this->authorize('update', $offre);

        $offre->load([
            'langueRequirements',
            'specialisationRequirements',
            'villeRequirements',
            'modeTravailRequirements',
            'domainExperienceRequirements',
            'formationJuridiqueRequirements',
        ]);

        return Inertia::render('Offres/Edit', [
            'offre' => $offre,
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
     * Sync all requirement types for an offer.
     *
     * @param  RequirementData[]  $requirements
     */
    private function syncRequirements(Offre $offre, array $requirements): void
    {
        // Define relation mapping based on taxonomy_type from frontend
        $relations = [
            'ville' => 'villeRequirements',
            'specialisation' => 'specialisationRequirements',
            'langue' => 'langueRequirements',
            'mode_travail' => 'modeTravailRequirements',
            'domaine_experience' => 'domainExperienceRequirements',
            'formation_juridique' => 'formationJuridiqueRequirements',
        ];

        // Group requirements by their respective relations
        $grouped = [];
        foreach ($requirements as $req) {
            $relation = $relations[$req->taxonomy_type] ?? null;
            if ($relation) {
                $data = [
                    'importance' => $req->importance,
                ];

                // Handle specific requirements data
                if ($req->taxonomy_type === 'langue') {
                    $data['langue_id'] = $req->taxonomy_id;
                    $data['niveau_langue_id'] = $req->requirements_data['niveau_langue_id'] ?? null;
                } elseif ($req->taxonomy_type === 'ville') {
                    $data['ville_id'] = $req->taxonomy_id;
                } elseif ($req->taxonomy_type === 'specialisation') {
                    $data['specialisation_id'] = $req->taxonomy_id;
                } elseif ($req->taxonomy_type === 'mode_travail') {
                    $data['mode_travail_id'] = $req->taxonomy_id;
                } elseif ($req->taxonomy_type === 'domaine_experience') {
                    $data['domaine_experience_id'] = $req->taxonomy_id;
                } elseif ($req->taxonomy_type === 'formation_juridique') {
                    $data['formation_juridique_id'] = $req->taxonomy_id;
                }

                $grouped[$relation][] = $data;
            }
        }

        // Clean up and recreate requirements for each relation type
        foreach ($relations as $relation) {
            $offre->$relation()->delete();
            if (isset($grouped[$relation])) {
                $offre->$relation()->createMany($grouped[$relation]);
            }
        }
    }
}

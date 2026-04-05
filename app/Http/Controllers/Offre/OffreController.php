<?php

namespace App\Http\Controllers\Offre;

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
            ->with(['poste', 'typeTravail', 'requirements'])
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

        DB::beginTransaction();
        try {
            $offre = $recruteur->offres()->create($request->validated());

            if ($request->has('requirements')) {
                $requirements = collect($request->requirements)->map(function ($requirement) {
                    $requirementsData = $requirement['requirements_data'] ?? [];

                    if ($requirement['taxonomy_type'] === 'langue' && isset($requirement['niveau_langue_id'])) {
                        $requirementsData['niveau_langue_id'] = (int) $requirement['niveau_langue_id'];
                    }

                    return [
                        'taxonomy_id' => $requirement['taxonomy_id'],
                        'taxonomy_type' => $requirement['taxonomy_type'],
                        'importance' => $requirement['importance'],
                        'requirements_data' => $requirementsData,
                    ];
                })->toArray();

                $offre->requirements()->createMany($requirements);
            }

            DB::commit();

            return to_route('offres.index')->with('success', 'Offre publiée avec succès.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Erreur lors de la publication de l\'offre.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Offre $offre): Response
    {
        $this->authorize('view', $offre);

        $offre->load(['poste', 'typeTravail', 'requirements.taxonomy']);

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

        $offre->load(['requirements']);

        return Inertia::render('Offres/Edit', [
            'offre' => $offre,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOffreRequest $request, Offre $offre): RedirectResponse
    {
        $this->authorize('update', $offre);

        DB::beginTransaction();
        try {
            $offre->update($request->validated());

            // Simple approach for requirements: delete then recreate
            // This is clean as it's a single operation lifecycle
            $offre->requirements()->delete();

            if ($request->has('requirements')) {
                $requirements = collect($request->requirements)->map(function ($requirement) {
                    $requirementsData = $requirement['requirements_data'] ?? [];

                    if ($requirement['taxonomy_type'] === 'langue' && isset($requirement['niveau_langue_id'])) {
                        $requirementsData['niveau_langue_id'] = (int) $requirement['niveau_langue_id'];
                    }

                    return [
                        'taxonomy_id' => $requirement['taxonomy_id'],
                        'taxonomy_type' => $requirement['taxonomy_type'],
                        'importance' => $requirement['importance'],
                        'requirements_data' => $requirementsData,
                    ];
                })->toArray();

                $offre->requirements()->createMany($requirements);
            }

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
}

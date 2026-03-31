<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreExperienceRequest;
use App\Models\Candidat\CandidatExperience;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;

class ExperienceController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreExperienceRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;

        $candidat->experiences()->create($request->validated());

        return back()->with('success', 'Expérience ajoutée avec succès.');
    }

    public function update(StoreExperienceRequest $request, CandidatExperience $experience): RedirectResponse
    {
        $this->authorize('update', $experience);

        $experience->update($request->validated());

        return back()->with('success', 'Expérience mise à jour.');
    }

    public function destroy(CandidatExperience $experience): RedirectResponse
    {
        $this->authorize('delete', $experience);

        $experience->delete();

        return back()->with('success', 'Expérience supprimée.');
    }
}

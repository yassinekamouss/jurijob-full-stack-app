<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreSpecialisationRequest;
use App\Models\CandidatSpecialisation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;

class SpecialisationController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreSpecialisationRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;

        $candidat->specialisations()->create($request->validated());

        return back()->with('success', 'Spécialisation ajoutée.');
    }

    public function update(StoreSpecialisationRequest $request, CandidatSpecialisation $specialisation): RedirectResponse
    {
        $this->authorize('update', $specialisation);

        $specialisation->update($request->validated());

        return back()->with('success', 'Spécialisation mise à jour.');
    }

    public function destroy(CandidatSpecialisation $specialisation): RedirectResponse
    {
        $this->authorize('delete', $specialisation);

        $specialisation->delete();

        return back()->with('success', 'Spécialisation supprimée.');
    }
}

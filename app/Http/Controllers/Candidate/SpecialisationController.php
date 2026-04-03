<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreSpecialisationRequest;
use App\Models\Candidat\CandidatSpecialisation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class SpecialisationController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreSpecialisationRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;

        Log::info('Storing specialisation', [
            'candidat_id' => $candidat->id,
            'data' => $request->validated(),
        ]);

        try {
            $candidat->specialisations()->create($request->validated());

            return back()->with('success', 'Spécialisation ajoutée.');
        } catch (\Exception $e) {
            Log::error('Error storing specialisation', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de l\'ajout de la spécialisation.');
        }
    }

    public function update(StoreSpecialisationRequest $request, CandidatSpecialisation $specialisation): RedirectResponse
    {
        $this->authorize('update', $specialisation);

        Log::info('Updating specialisation', [
            'specialisation_id' => $specialisation->id,
            'data' => $request->validated(),
        ]);

        try {
            $specialisation->update($request->validated());

            return back()->with('success', 'Spécialisation mise à jour.');
        } catch (\Exception $e) {
            Log::error('Error updating specialisation', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la mise à jour de la spécialisation.');
        }
    }

    public function destroy(CandidatSpecialisation $specialisation): RedirectResponse
    {
        $this->authorize('delete', $specialisation);

        try {
            $specialisation->delete();

            return back()->with('success', 'Spécialisation supprimée.');
        } catch (\Exception $e) {
            Log::error('Error deleting specialisation', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la suppression de la spécialisation.');
        }
    }
}

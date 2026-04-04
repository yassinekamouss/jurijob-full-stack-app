<?php

namespace App\Http\Controllers\Candidate;

use App\DTOs\Candidate\SpecialisationData;
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
        $dto = SpecialisationData::fromRequest($request);

        Log::info('Storing specialisation', [
            'candidat_id' => $candidat->id,
            'data' => $dto->toArray(),
        ]);

        try {
            $candidat->specialisations()->create($dto->toArray());

            return back()->with('success', 'Spécialisation ajoutée.');
        } catch (\Exception $e) {
            Log::error('Error storing specialisation', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de l\'ajout de la spécialisation.');
        }
    }

    public function update(StoreSpecialisationRequest $request, CandidatSpecialisation $specialisation): RedirectResponse
    {
        $this->authorize('update', $specialisation);
        $dto = SpecialisationData::fromRequest($request);

        Log::info('Updating specialisation', [
            'specialisation_id' => $specialisation->id,
            'data' => $dto->toArray(),
        ]);

        try {
            $specialisation->update($dto->toArray());

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

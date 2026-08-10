<?php

namespace App\Http\Controllers\Candidate;

use App\DTOs\Candidate\FormationData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreFormationRequest;
use App\Models\Candidat\CandidatFormation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class FormationController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreFormationRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;
        $dto = FormationData::fromRequest($request);

        try {
            $candidat->formations()->create($dto->toArray());

            return back()->with('success', 'Formation ajoutée avec succès.');
        } catch (\Exception $e) {
            Log::error('Error storing formation', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de l\'ajout de la formation.');
        }
    }

    public function update(StoreFormationRequest $request, CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('update', $formation);

        $dto = FormationData::fromRequest($request);

        try {
            $formation->update($dto->toArray());

            return back()->with('success', 'Formation mise à jour avec succès.');
        } catch (\Exception $e) {
            Log::error('Error updating formation', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la mise à jour de la formation.');
        }
    }

    public function destroy(CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('delete', $formation);

        $formation->delete();

        return back()->with('success', 'Formation supprimée.');
    }
}

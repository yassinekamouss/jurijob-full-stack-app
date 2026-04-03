<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreExperienceRequest;
use App\Models\Candidat\CandidatExperience;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class ExperienceController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreExperienceRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;

        $data = $request->validated();

        // Rename fields to match database columns
        $data['poste_id'] = $data['poste'];
        $data['type_experience_id'] = $data['type'] ?? null;
        unset($data['poste'], $data['type']);

        Log::info('Storing experience', [
            'candidat_id' => $candidat->id,
            'data' => $data,
        ]);

        try {
            $candidat->experiences()->create($data);

            return back()->with('success', 'Expérience ajoutée avec succès.');
        } catch (\Exception $e) {
            Log::error('Error storing experience', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de l\'ajout de l\'expérience.');
        }
    }

    public function update(StoreExperienceRequest $request, CandidatExperience $experience): RedirectResponse
    {
        $this->authorize('update', $experience);

        $data = $request->validated();

        // Rename fields to match database columns
        $data['poste_id'] = $data['poste'];
        $data['type_experience_id'] = $data['type'] ?? null;
        unset($data['poste'], $data['type']);

        Log::info('Updating experience', [
            'experience_id' => $experience->id,
            'data' => $data,
        ]);

        try {
            $experience->update($data);

            return back()->with('success', 'Expérience mise à jour avec succès.');
        } catch (\Exception $e) {
            Log::error('Error updating experience', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la mise à jour de l\'expérience.');
        }
    }

    public function destroy(CandidatExperience $experience): RedirectResponse
    {
        $this->authorize('delete', $experience);

        try {
            $experience->delete();

            return back()->with('success', 'Expérience supprimée.');
        } catch (\Exception $e) {
            Log::error('Error deleting experience', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la suppression de l\'expérience.');
        }
    }
}

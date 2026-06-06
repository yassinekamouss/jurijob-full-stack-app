<?php

namespace App\Http\Controllers\Candidate;

use App\DTOs\Candidate\DomainExperienceData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreDomainExperienceRequest;
use App\Models\Candidat\CandidatDomainExperience;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class DomaineExperienceController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreDomainExperienceRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;
        $dto = DomainExperienceData::fromRequest($request);

        Log::info('Storing domaine experience', [
            'candidat_id' => $candidat->id,
            'data' => $dto->toArray(),
        ]);

        try {
            $candidat->domainExperiences()->create($dto->toArray());

            return back()->with('success', 'Domaine d\'expérience ajouté.');
        } catch (\Exception $e) {
            Log::error('Error storing domaine experience', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de l\'ajout du domaine d\'expérience.');
        }
    }

    public function update(StoreDomainExperienceRequest $request, CandidatDomainExperience $domaine_experience): RedirectResponse
    {
        $this->authorize('update', $domaine_experience);
        $dto = DomainExperienceData::fromRequest($request);

        Log::info('Updating domaine experience', [
            'domaine_experience_id' => $domaine_experience->id,
            'data' => $dto->toArray(),
        ]);

        try {
            $domaine_experience->update($dto->toArray());

            return back()->with('success', 'Domaine d\'expérience mis à jour.');
        } catch (\Exception $e) {
            Log::error('Error updating domaine experience', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la mise à jour du domaine d\'expérience.');
        }
    }

    public function destroy(CandidatDomainExperience $domaine_experience): RedirectResponse
    {
        $this->authorize('delete', $domaine_experience);

        try {
            $domaine_experience->delete();

            return back()->with('success', 'Domaine d\'expérience supprimé.');
        } catch (\Exception $e) {
            Log::error('Error deleting domaine experience', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la suppression du domaine d\'expérience.');
        }
    }
}

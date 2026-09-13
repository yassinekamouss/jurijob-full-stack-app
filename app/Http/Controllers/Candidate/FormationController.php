<?php

namespace App\Http\Controllers\Candidate;

use App\DTOs\Candidate\FormationData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreDiplomaRequest;
use App\Http\Requests\Candidate\StoreFormationRequest;
use App\Models\Candidat\CandidatFormation;
use App\Services\FormationDiplomaService;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class FormationController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        private readonly FormationDiplomaService $diplomaService,
    ) {}

    public function store(StoreFormationRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;
        $diplomaPath = $this->uploadDiplomaFile($request);

        try {
            $candidat->formations()->create(FormationData::fromRequest($request, $diplomaPath)->toArray());

            return back()->with('success', 'Formation ajoutée avec succès.');
        } catch (Exception $e) {
            $this->rollbackDiplomaFile($diplomaPath);
            Log::error('Error storing formation', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de l\'ajout de la formation.');
        }
    }

    public function update(StoreFormationRequest $request, CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('update', $formation);

        $diplomaPath = $formation->diploma_file;

        if ($request->hasFile('diploma_file')) {
            $diplomaPath = $this->diplomaService->store($request->file('diploma_file'));
        }

        try {
            $formation->update(FormationData::fromRequest($request, $diplomaPath)->toArray());

            return back()->with('success', 'Formation mise à jour avec succès.');
        } catch (Exception $e) {
            $this->rollbackDiplomaFileIfReplaced($diplomaPath, $formation->getOriginal('diploma_file'));
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

    public function uploadDiploma(StoreDiplomaRequest $request, CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('update', $formation);

        $diplomaPath = $this->diplomaService->store($request->file('diploma_file'));

        try {
            $formation->update(['diploma_file' => $diplomaPath]);

            return back()->with('success', 'Attestation/diplôme téléversé avec succès.');
        } catch (Exception $e) {
            $this->rollbackDiplomaFile($diplomaPath);
            Log::error('Error uploading formation diploma', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors du téléversement de l\'attestation/diplôme.');
        }
    }

    public function deleteDiploma(CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('update', $formation);

        $formation->update(['diploma_file' => null]);

        return back()->with('success', 'Attestation/diplôme supprimé.');
    }

    private function uploadDiplomaFile(StoreFormationRequest $request): ?string
    {
        if (! $request->hasFile('diploma_file')) {
            return null;
        }

        return $this->diplomaService->store($request->file('diploma_file'));
    }

    private function rollbackDiplomaFile(?string $diplomaPath): void
    {
        if ($diplomaPath !== null) {
            app('filesystem')->disk('private')->delete($diplomaPath);
        }
    }

    private function rollbackDiplomaFileIfReplaced(?string $newPath, ?string $oldPath): void
    {
        if ($newPath !== null && $newPath !== $oldPath) {
            $this->rollbackDiplomaFile($newPath);
        }
    }
}

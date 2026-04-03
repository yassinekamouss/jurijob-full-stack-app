<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreLanguageRequest;
use App\Models\Candidat\CandidatLangue;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class LanguageController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreLanguageRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;

        Log::info('Storing language', [
            'candidat_id' => $candidat->id,
            'data' => $request->validated(),
        ]);

        try {
            $candidat->langues()->create($request->validated());

            return back()->with('success', 'Langue ajoutée.');
        } catch (\Exception $e) {
            Log::error('Error storing language', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de l\'ajout de la langue.');
        }
    }

    public function update(StoreLanguageRequest $request, CandidatLangue $langue): RedirectResponse
    {
        $this->authorize('update', $langue);

        Log::info('Updating language', [
            'language_id' => $langue->id,
            'data' => $request->validated(),
        ]);

        try {
            $langue->update($request->validated());

            return back()->with('success', 'Langue mise à jour.');
        } catch (\Exception $e) {
            Log::error('Error updating language', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la mise à jour de la langue.');
        }
    }

    public function destroy(CandidatLangue $langue): RedirectResponse
    {
        $this->authorize('delete', $langue);

        try {
            $langue->delete();

            return back()->with('success', 'Langue supprimée.');
        } catch (\Exception $e) {
            Log::error('Error deleting language', ['error' => $e->getMessage()]);

            return back()->with('error', 'Erreur lors de la suppression de la langue.');
        }
    }
}

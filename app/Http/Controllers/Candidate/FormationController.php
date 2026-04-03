<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreFormationRequest;
use App\Models\Candidat\CandidatFormation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class FormationController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreFormationRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $candidat = $request->user()->candidat;

        // Rename fields to match database columns
        $data['formation_juridique_id'] = $data['niveau'];
        $data['specialisation_id'] = $data['domaine'];
        $data['ecole_id'] = $data['ecole'];
        unset($data['niveau'], $data['domaine'], $data['ecole']);

        if ($request->hasFile('diploma_file')) {
            $file = $request->file('diploma_file');
            $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
            $data['diploma_file'] = $file->storeAs('candidat_diplomas', $filename, 'private');
        }

        $candidat->formations()->create($data);

        return back()->with('success', 'Formation ajoutée avec succès.');
    }

    public function update(StoreFormationRequest $request, CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('update', $formation);

        $data = $request->validated();

        // Rename fields to match database columns
        $data['formation_juridique_id'] = $data['niveau'];
        $data['specialisation_id'] = $data['domaine'];
        $data['ecole_id'] = $data['ecole'];
        unset($data['niveau'], $data['domaine'], $data['ecole']);

        Log::info('Updating formation', [
            'id' => $formation->id,
            'data_keys' => array_keys($data),
            'data' => $data,
        ]);

        try {
            if (! $request->hasFile('diploma_file')) {
                unset($data['diploma_file']);
            } else {
                $file = $request->file('diploma_file');
                $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
                $data['diploma_file'] = $file->storeAs('candidat_diplomas', $filename, 'private');
            }

            $formation->update($data);

            return back()->with('success', 'Formation mise à jour avec succès.');
        } catch (\Exception $e) {
            Log::error('Error updating formation', ['error' => $e->getMessage(), 'data' => $data]);

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

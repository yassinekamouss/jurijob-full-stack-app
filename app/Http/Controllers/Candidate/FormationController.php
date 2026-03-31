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

        if ($request->hasFile('diploma_file')) {
            $file = $request->file('diploma_file');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $data['diploma_file'] = $file->storeAs('candidat_diplomas', $filename, 'private');
        }

        $candidat->formations()->create($data);

        return back()->with('success', 'Formation ajoutée avec succès.');
    }

    public function update(StoreFormationRequest $request, CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('update', $formation);

        $data = $request->validated();
        if (!$request->hasFile('diploma_file')) {
            unset($data['diploma_file']);
        } else {
            $file = $request->file('diploma_file');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $data['diploma_file'] = $file->storeAs('candidat_diplomas', $filename, 'private');
        }

        Log::info('Updating formation', ['id' => $formation->id, 'data' => $data]);
        $formation->update($data);

        return back()->with('success', 'Formation mise à jour.');
    }

    public function destroy(CandidatFormation $formation): RedirectResponse
    {
        $this->authorize('delete', $formation);

        $formation->delete();

        return back()->with('success', 'Formation supprimée.');
    }
}

<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreLanguageRequest;
use App\Models\Candidat\CandidatLangue;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;

class LanguageController extends Controller
{
    use AuthorizesRequests;

    public function store(StoreLanguageRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;

        $candidat->langues()->create($request->validated());

        return back()->with('success', 'Langue ajoutée.');
    }

    public function update(StoreLanguageRequest $request, CandidatLangue $langue): RedirectResponse
    {
        $this->authorize('update', $langue);

        $langue->update($request->validated());

        return back()->with('success', 'Langue mise à jour.');
    }

    public function destroy(CandidatLangue $langue): RedirectResponse
    {
        $this->authorize('delete', $langue);

        $langue->delete();

        return back()->with('success', 'Langue supprimée.');
    }
}

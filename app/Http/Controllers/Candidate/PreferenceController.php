<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\SyncPreferencesRequest;
use App\Models\Candidat\Candidat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PreferenceController extends Controller
{
    public function sync(SyncPreferencesRequest $request): RedirectResponse
    {
        $candidat = $request->user()->candidat;
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($candidat, $validated): void {
                $this->syncRelation(
                    $candidat->villeTravails(),
                    'ville_id',
                    $validated['ville_ids'],
                );

                $this->syncRelation(
                    $candidat->modeTravails(),
                    'mode_travail_id',
                    $validated['mode_travail_ids'],
                );

                $this->syncRelation(
                    $candidat->typeTravails(),
                    'type_travail_id',
                    $validated['type_travail_ids'],
                );
            });

            return back()->with('success', 'Préférences mises à jour.');
        } catch (\Exception $e) {
            Log::error('Error syncing candidate preferences', [
                'candidat_id' => $candidat->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Erreur lors de la mise à jour des préférences.');
        }
    }

    /**
     * @param  HasMany<Model, Candidat>  $relation
     * @param  list<int>  $ids
     */
    private function syncRelation($relation, string $foreignKey, array $ids): void
    {
        $relation->whereNotIn($foreignKey, $ids)->delete();

        $existingIds = $relation->pluck($foreignKey)->all();

        foreach ($ids as $id) {
            if (! in_array($id, $existingIds, true)) {
                $relation->create([$foreignKey => $id]);
            }
        }
    }
}

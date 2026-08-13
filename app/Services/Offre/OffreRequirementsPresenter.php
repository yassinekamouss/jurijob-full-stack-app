<?php

namespace App\Services\Offre;

use App\Models\Offre\Offre;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Specialisation;
use App\Services\CandidateMatching\MatchingCriteria;
use Illuminate\Support\Collection;

class OffreRequirementsPresenter
{
    /**
     * Present the multiple-choice criteria (Langues + Spécialisations) of an offer.
     *
     * @return array<int, array<string, mixed>>
     */
    public function forOffre(Offre $offre): array
    {
        return $this->presentRequirements(
            $offre->criteresMultiples->map(fn ($critere): array => [
                'id' => (int) $critere->critere_id,
                'type' => $critere->type_critere,
                'metadata' => $critere->metadata ?? [],
            ])
        );
    }

    /**
     * Present the requirements of ad-hoc matching criteria.
     *
     * @return array<int, array<string, mixed>>
     */
    public function forCriteria(MatchingCriteria $criteria): array
    {
        return $this->presentRequirements(
            collect($criteria->requirements)->map(fn (array $requirement): array => [
                'id' => $requirement['id'],
                'type' => $requirement['type'],
                'metadata' => $requirement['metadata'],
            ])
        );
    }

    /**
     * @param  Collection<int, array{id: int, type: string, metadata: array<string, mixed>}>  $items
     * @return array<int, array<string, mixed>>
     */
    private function presentRequirements(Collection $items): array
    {
        $items = $items->values();

        $langueIds = $items->where('type', 'LANGUE')->pluck('id');
        $specialisationIds = $items->where('type', 'SPECIALISATION')->pluck('id');

        $langues = Langue::query()->whereIn('id', $langueIds)->get()->keyBy('id');
        $specialisations = Specialisation::query()->whereIn('id', $specialisationIds)->get()->keyBy('id');
        $niveauLangues = NiveauLangue::query()->get()->keyBy('id');

        return $items->map(function (array $critere) use ($langues, $specialisations, $niveauLangues): array {
            $label = match ($critere['type']) {
                'LANGUE' => $langues[$critere['id']]?->nom ?? 'Inconnu',
                'SPECIALISATION' => $specialisations[$critere['id']]?->nom ?? 'Inconnu',
                default => 'Inconnu',
            };

            $metadata = $critere['metadata'];

            if ($critere['type'] === 'LANGUE' && isset($metadata['niveau_langue_id'])) {
                $metadata['niveau_nom'] = $niveauLangues[$metadata['niveau_langue_id']]?->nom ?? null;
            }

            return [
                'taxonomy_id' => $critere['id'],
                'taxonomy_type' => $critere['type'],
                'label' => $label,
                'metadata' => $metadata,
            ];
        })->all();
    }
}

<?php

namespace App\Services\CandidateMatching;

use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereMultiple;
use Illuminate\Support\Collection;

/**
 * Criteria used to run the matching engine.
 *
 * A `null` hard-filter value means the criterion is deactivated (no filter
 * applied). Language / specialisation requirements are stored as a list of
 * arrays: ['type' => 'LANGUE'|'SPECIALISATION', 'id' => int, 'metadata' => array].
 */
readonly class MatchingCriteria
{
    /**
     * @param  array<int, array{type: string, id: int, metadata: array<string, mixed>}>  $requirements
     */
    public function __construct(
        public ?int $posteId = null,
        public ?int $niveauExperienceId = null,
        public ?int $formationJuridiqueId = null,
        public ?int $salaireId = null,
        public ?int $villeId = null,
        public ?int $typeTravailId = null,
        public ?int $modeTravailId = null,
        public array $requirements = [],
    ) {}

    /**
     * Build criteria from the offer's stored values and multiple-choice criteria.
     */
    public static function fromOffre(Offre $offre): self
    {
        $offre->loadMissing('criteresMultiples');

        return new self(
            posteId: $offre->poste_id,
            niveauExperienceId: $offre->niveau_experience_id,
            formationJuridiqueId: $offre->formation_juridique_id,
            salaireId: $offre->salaire_id,
            villeId: $offre->ville_id,
            typeTravailId: $offre->type_travail_id,
            modeTravailId: $offre->mode_travail_id,
            requirements: $offre->criteresMultiples
                ->map(fn (OffreCritereMultiple $critere): array => [
                    'type' => $critere->type_critere,
                    'id' => (int) $critere->critere_id,
                    'metadata' => $critere->metadata ?? [],
                ])
                ->all(),
        );
    }

    /**
     * Build criteria from an admin-submitted payload.
     *
     * @param  array<string, mixed>  $data
     */
    public static function fromRequest(array $data): self
    {
        return new self(
            posteId: self::nullableInt($data['poste_id'] ?? null),
            niveauExperienceId: self::nullableInt($data['niveau_experience_id'] ?? null),
            formationJuridiqueId: self::nullableInt($data['formation_juridique_id'] ?? null),
            salaireId: self::nullableInt($data['salaire_id'] ?? null),
            villeId: self::nullableInt($data['ville_id'] ?? null),
            typeTravailId: self::nullableInt($data['type_travail_id'] ?? null),
            modeTravailId: self::nullableInt($data['mode_travail_id'] ?? null),
            requirements: collect($data['requirements'] ?? [])
                ->map(fn (array $requirement): array => [
                    'type' => $requirement['taxonomy_type'],
                    'id' => (int) $requirement['taxonomy_id'],
                    'metadata' => $requirement['metadata'] ?? [],
                ])
                ->values()
                ->all(),
        );
    }

    /**
     * Language criteria (with importance + required level).
     *
     * @return Collection<int, array{type: string, id: int, metadata: array<string, mixed>}>
     */
    public function languages(): Collection
    {
        return $this->requirementsOf('LANGUE');
    }

    /**
     * Specialisation criteria.
     *
     * @return Collection<int, array{type: string, id: int, metadata: array<string, mixed>}>
     */
    public function specialisations(): Collection
    {
        return $this->requirementsOf('SPECIALISATION');
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'poste_id' => $this->posteId,
            'niveau_experience_id' => $this->niveauExperienceId,
            'formation_juridique_id' => $this->formationJuridiqueId,
            'salaire_id' => $this->salaireId,
            'ville_id' => $this->villeId,
            'type_travail_id' => $this->typeTravailId,
            'mode_travail_id' => $this->modeTravailId,
            'requirements' => array_map(
                fn (array $requirement): array => [
                    'taxonomy_type' => $requirement['type'],
                    'taxonomy_id' => $requirement['id'],
                    'metadata' => $requirement['metadata'],
                ],
                $this->requirements
            ),
        ];
    }

    /**
     * @return Collection<int, array{type: string, id: int, metadata: array<string, mixed>}>
     */
    private function requirementsOf(string $type): Collection
    {
        return collect($this->requirements)
            ->filter(fn (array $requirement): bool => $requirement['type'] === $type)
            ->values();
    }

    private static function nullableInt(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (int) $value;
    }
}

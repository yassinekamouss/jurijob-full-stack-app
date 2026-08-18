<?php

namespace App\DTOs\Candidate;

use App\Http\Requests\Candidate\StoreFormationRequest;

readonly class FormationData
{
    public function __construct(
        public int $formation_juridique_id,
        public int $specialisation_id,
        public string $annee_debut,
        public ?int $ecole_id = null,
        public ?string $autre_ecole = null,
        public ?string $annee_fin = null,
    ) {}

    public static function fromRequest(StoreFormationRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    public static function fromArray(array $data): self
    {
        // Convert to null if the string 'other' is provided or if empty
        $ecoleId = ! empty($data['ecole_id']) && is_numeric($data['ecole_id']) ? (int) $data['ecole_id'] : null;

        return new self(
            formation_juridique_id: (int) $data['formation_juridique_id'],
            specialisation_id: (int) $data['specialisation_id'],
            annee_debut: $data['annee_debut'],
            ecole_id: $ecoleId,
            autre_ecole: $data['autre_ecole'] ?? null,
            annee_fin: $data['annee_fin'] ?? null,
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'formation_juridique_id' => $this->formation_juridique_id,
            'specialisation_id' => $this->specialisation_id,
            'ecole_id' => $this->ecole_id,
            'autre_ecole' => $this->autre_ecole,
            'annee_debut' => $this->annee_debut,
            'annee_fin' => $this->annee_fin,
        ], fn ($value, $key) => $value !== null || in_array($key, ['ecole_id', 'autre_ecole']), ARRAY_FILTER_USE_BOTH);
    }
}

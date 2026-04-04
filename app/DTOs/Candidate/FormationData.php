<?php

namespace App\DTOs\Candidate;

use App\Http\Requests\Candidate\StoreFormationRequest;

readonly class FormationData
{
    public function __construct(
        public int $formation_juridique_id,
        public int $specialisation_id,
        public int $ecole_id,
        public string $annee_debut,
        public ?string $annee_fin = null,
        public ?string $diploma_file = null,
    ) {}

    public static function fromRequest(StoreFormationRequest $request, ?string $diplomaPath = null): self
    {
        return self::fromArray(array_merge($request->validated(), ['diploma_file' => $diplomaPath]));
    }

    public static function fromArray(array $data): self
    {
        return new self(
            formation_juridique_id: (int) $data['formation_juridique_id'],
            specialisation_id: (int) $data['specialisation_id'],
            ecole_id: (int) $data['ecole_id'],
            annee_debut: $data['annee_debut'],
            annee_fin: $data['annee_fin'] ?? null,
            diploma_file: $data['diploma_file'] ?? null,
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'formation_juridique_id' => $this->formation_juridique_id,
            'specialisation_id' => $this->specialisation_id,
            'ecole_id' => $this->ecole_id,
            'annee_debut' => $this->annee_debut,
            'annee_fin' => $this->annee_fin,
            'diploma_file' => $this->diploma_file,
        ], fn ($value) => $value !== null);
    }
}

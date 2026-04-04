<?php

namespace App\DTOs\Candidate;

use App\Http\Requests\Candidate\UpdateProfileRequest;

readonly class ProfileData
{
    public function __construct(
        public string $nom,
        public string $prenom,
        public int $poste_id,
        public int $niveau_experience_id,
        public int $formation_juridique_id,
        public bool $is_active = true,
    ) {}

    public static function fromRequest(UpdateProfileRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    public static function fromArray(array $data): self
    {
        return new self(
            nom: $data['nom'],
            prenom: $data['prenom'],
            poste_id: (int) $data['poste_id'],
            niveau_experience_id: (int) $data['niveau_experience_id'],
            formation_juridique_id: (int) $data['formation_juridique_id'],
            is_active: (bool) ($data['is_active'] ?? true),
        );
    }

    public function toArray(): array
    {
        return [
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'poste_id' => $this->poste_id,
            'niveau_experience_id' => $this->niveau_experience_id,
            'formation_juridique_id' => $this->formation_juridique_id,
        ];
    }
}

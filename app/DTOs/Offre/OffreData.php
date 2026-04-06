<?php

namespace App\DTOs\Offre;

use App\Http\Requests\Offre\StoreOffreRequest;

readonly class OffreData
{
    /**
     * @param  RequirementData[]  $requirements
     */
    public function __construct(
        public string $titre,
        public string $description,
        public int $poste_id,
        public int $type_travail_id,
        public ?int $niveau_experience_id = null,
        public string $statut = 'ouvert',
        public array $requirements = []
    ) {}

    public static function fromRequest(StoreOffreRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    public static function fromArray(array $data): self
    {
        return new self(
            titre: $data['titre'],
            description: $data['description'],
            poste_id: (int) $data['poste_id'],
            type_travail_id: (int) $data['type_travail_id'],
            niveau_experience_id: isset($data['niveau_experience_id']) ? (int) $data['niveau_experience_id'] : null,
            statut: $data['statut'] ?? 'ouvert',
            requirements: collect($data['requirements'] ?? [])->map(fn ($req) => RequirementData::fromArray($req))->toArray(),
        );
    }

    public function toArray(): array
    {
        return [
            'titre' => $this->titre,
            'description' => $this->description,
            'poste_id' => $this->poste_id,
            'type_travail_id' => $this->type_travail_id,
            'niveau_experience_id' => $this->niveau_experience_id,
            'statut' => $this->statut,
        ];
    }
}

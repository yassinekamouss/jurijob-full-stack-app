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
        public int $mode_travail_id,
        public ?int $ville_id,
        public int $niveau_experience_id,
        public ?int $formation_juridique_id,
        public ?int $salaire_id,
        public ?int $urgence_id,
        public ?string $notes_complementaires,
        public int $nombre_cv,
        public string $statut = 'EN_TRAITEMENT',
        public array $requirements = []
    ) {}

    public static function fromRequest(StoreOffreRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            titre: $data['titre'],
            description: $data['description'],
            poste_id: (int) $data['poste_id'],
            type_travail_id: (int) $data['type_travail_id'],
            mode_travail_id: (int) $data['mode_travail_id'],
            ville_id: isset($data['ville_id']) && $data['ville_id'] !== '' ? (int) $data['ville_id'] : null,
            niveau_experience_id: (int) $data['niveau_experience_id'],
            formation_juridique_id: isset($data['formation_juridique_id']) && $data['formation_juridique_id'] !== '' ? (int) $data['formation_juridique_id'] : null,
            salaire_id: isset($data['salaire_id']) && $data['salaire_id'] !== '' ? (int) $data['salaire_id'] : null,
            urgence_id: isset($data['urgence_id']) && $data['urgence_id'] !== '' ? (int) $data['urgence_id'] : null,
            notes_complementaires: $data['notes_complementaires'] ?? null,
            nombre_cv: (int) ($data['nombre_cv'] ?? 1),
            statut: $data['statut'] ?? 'EN_TRAITEMENT',
            requirements: collect($data['requirements'] ?? [])->map(fn ($req) => RequirementData::fromArray($req))->toArray(),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'titre' => $this->titre,
            'description' => $this->description,
            'poste_id' => $this->poste_id,
            'type_travail_id' => $this->type_travail_id,
            'mode_travail_id' => $this->mode_travail_id,
            'ville_id' => $this->ville_id,
            'niveau_experience_id' => $this->niveau_experience_id,
            'formation_juridique_id' => $this->formation_juridique_id,
            'salaire_id' => $this->salaire_id,
            'urgence_id' => $this->urgence_id,
            'notes_complementaires' => $this->notes_complementaires,
            'nombre_cv' => $this->nombre_cv,
            'statut' => $this->statut,
        ];
    }
}

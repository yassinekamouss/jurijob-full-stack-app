<?php

namespace App\DTOs\Recruteur;

readonly class ProfileData
{
    public function __construct(
        public string $nom_entreprise,
        public int $type_organisation_id,
        public int $taille_entreprise_id,
        public int $ville_id,
        public ?string $site_web = null,
        public ?string $poste = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            nom_entreprise: $data['nom_entreprise'],
            type_organisation_id: (int) $data['type_organisation_id'],
            taille_entreprise_id: (int) $data['taille_entreprise_id'],
            ville_id: (int) $data['ville_id'],
            site_web: $data['site_web'] ?? null,
            poste: $data['poste'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'nom_entreprise' => $this->nom_entreprise,
            'type_organisation_id' => $this->type_organisation_id,
            'taille_entreprise_id' => $this->taille_entreprise_id,
            'ville_id' => $this->ville_id,
            'site_web' => $this->site_web,
            'poste' => $this->poste,
        ];
    }
}

<?php

namespace App\DTOs\Candidate;

use App\Http\Requests\Candidate\StoreExperienceRequest;

readonly class ExperienceData
{
    public function __construct(
        public int $poste_id,
        public string $entreprise,
        public string $debut,
        public ?string $fin = null,
        public ?int $type_experience_id = null,
    ) {}

    public static function fromRequest(StoreExperienceRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    public static function fromArray(array $data): self
    {
        return new self(
            poste_id: (int) $data['poste_id'],
            entreprise: $data['entreprise'],
            debut: $data['debut'],
            fin: $data['fin'] ?? null,
            type_experience_id: isset($data['type_experience_id']) ? (int) $data['type_experience_id'] : null,
        );
    }

    public function toArray(): array
    {
        return [
            'poste_id' => $this->poste_id,
            'entreprise' => $this->entreprise,
            'debut' => $this->debut,
            'fin' => $this->fin,
            'type_experience_id' => $this->type_experience_id,
        ];
    }
}

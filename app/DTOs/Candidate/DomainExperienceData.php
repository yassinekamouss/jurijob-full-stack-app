<?php

namespace App\DTOs\Candidate;

use App\Http\Requests\Candidate\StoreDomainExperienceRequest;

readonly class DomainExperienceData
{
    public function __construct(
        public int $domaine_experience_id,
    ) {}

    public static function fromRequest(StoreDomainExperienceRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    public static function fromArray(array $data): self
    {
        return new self(
            domaine_experience_id: (int) $data['domaine_experience_id'],
        );
    }

    public function toArray(): array
    {
        return [
            'domaine_experience_id' => $this->domaine_experience_id,
        ];
    }
}

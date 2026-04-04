<?php

namespace App\DTOs\Candidate;

use App\Http\Requests\Candidate\StoreSpecialisationRequest;

readonly class SpecialisationData
{
    public function __construct(
        public int $specialisation_id,
    ) {}

    public static function fromRequest(StoreSpecialisationRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    public static function fromArray(array $data): self
    {
        return new self(
            specialisation_id: (int) $data['specialisation_id'],
        );
    }

    public function toArray(): array
    {
        return [
            'specialisation_id' => $this->specialisation_id,
        ];
    }
}

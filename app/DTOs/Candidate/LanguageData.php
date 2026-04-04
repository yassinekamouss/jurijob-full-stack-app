<?php

namespace App\DTOs\Candidate;

use App\Http\Requests\Candidate\StoreLanguageRequest;

readonly class LanguageData
{
    public function __construct(
        public int $langue_id,
        public int $niveau_langue_id,
    ) {}

    public static function fromRequest(StoreLanguageRequest $request): self
    {
        return self::fromArray($request->validated());
    }

    public static function fromArray(array $data): self
    {
        return new self(
            langue_id: (int) $data['langue_id'],
            niveau_langue_id: (int) $data['niveau_langue_id'],
        );
    }

    public function toArray(): array
    {
        return [
            'langue_id' => $this->langue_id,
            'niveau_langue_id' => $this->niveau_langue_id,
        ];
    }
}

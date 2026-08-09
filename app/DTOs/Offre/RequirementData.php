<?php

namespace App\DTOs\Offre;

readonly class RequirementData
{
    /**
     * @param  array<string, mixed>  $metadata
     */
    public function __construct(
        public int $taxonomy_id,
        public string $taxonomy_type,
        public array $metadata = []
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            taxonomy_id: (int) $data['taxonomy_id'],
            taxonomy_type: $data['taxonomy_type'],
            metadata: $data['metadata'] ?? [],
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'taxonomy_id' => $this->taxonomy_id,
            'taxonomy_type' => $this->taxonomy_type,
            'metadata' => $this->metadata,
        ];
    }
}

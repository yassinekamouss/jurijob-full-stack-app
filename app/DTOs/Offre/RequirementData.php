<?php

namespace App\DTOs\Offre;

readonly class RequirementData
{
    public function __construct(
        public int $taxonomy_id,
        public string $taxonomy_type,
        public string $importance,
        public string $operator = 'OR',
        public array $requirements_data = []
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            taxonomy_id: (int) $data['taxonomy_id'],
            taxonomy_type: $data['taxonomy_type'],
            importance: $data['importance'],
            operator: $data['operator'] ?? 'OR',
            requirements_data: $data['requirements_data'] ?? [],
        );
    }

    public function toArray(): array
    {
        return [
            'taxonomy_id' => $this->taxonomy_id,
            'taxonomy_type' => $this->taxonomy_type,
            'importance' => $this->importance,
            'operator' => $this->operator,
            'requirements_data' => $this->requirements_data,
        ];
    }
}

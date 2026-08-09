<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereMultiple;
use App\Services\Matching\Contracts\MatchingStrategy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

abstract class AbstractMatchingStrategy implements MatchingStrategy
{
    /**
     * Default weights for importance levels.
     *
     * @var array<string, int>
     */
    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 10,
    ];

    /**
     * {@inheritDoc}
     */
    abstract public function apply(Builder $query, Offre $offre): Builder;

    /**
     * {@inheritDoc}
     */
    abstract public function getScoreSubquery(Offre $offre): string;

    /**
     * {@inheritDoc}
     */
    abstract public function getScoreAlias(): string;

    /**
     * {@inheritDoc}
     */
    abstract public function getMaxScore(Offre $offre): int;

    /**
     * Get the numeric weight for a given importance level.
     */
    protected function getWeight(string $importance): int
    {
        return $this->weights[$importance] ?? 0;
    }

    /**
     * {@inheritDoc}
     */
    public function isActive(Offre $offre): bool
    {
        return $this->getCriteres($offre)->isNotEmpty();
    }

    /**
     * Get the strategy type (to be defined by concrete classes).
     */
    abstract protected function getStrategyType(): string;

    /**
     * Retrieve all criteria for this strategy's type from the flat table.
     *
     * @return Collection<int, OffreCritereMultiple>
     */
    protected function getCriteres(Offre $offre): Collection
    {
        return $offre->criteresMultiples
            ->where('type_critere', $this->getStrategyType())
            ->values();
    }

    /**
     * Build filters for indispensable criteria.
     *
     * @param  Collection<int, OffreCritereMultiple>  $criteres
     */
    protected function applyIndispensableFilter(
        Builder $query,
        Collection $criteres,
        string $pivotTable,
        string $pivotColumn
    ): Builder {
        $indispensables = $criteres->filter(
            fn (OffreCritereMultiple $c) => ($c->metadata['importance'] ?? '') === 'indispensable'
        );

        if ($indispensables->isEmpty()) {
            return $query;
        }

        $ids = $indispensables->pluck('critere_id')->toArray();

        // AND Logic: Candidate must possess ALL requested indispensable criteria.
        return $query->whereIn('candidats.id', function ($q) use ($pivotTable, $pivotColumn, $ids) {
            $q->select('candidat_id')
                ->from($pivotTable)
                ->whereIn($pivotColumn, $ids)
                ->groupBy('candidat_id')
                ->havingRaw("COUNT(DISTINCT $pivotColumn) = ?", [count($ids)]);
        });
    }
}

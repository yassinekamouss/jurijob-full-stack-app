<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use App\Services\Matching\Contracts\MatchingStrategy;
use Illuminate\Database\Eloquent\Builder;

abstract class AbstractMatchingStrategy implements MatchingStrategy
{
    /**
     * Default weights for each importance level.
     * Subclasses can override this if needed.
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
     * Apply the matching logic to the query (Indispensable filtering).
     */
    abstract public function apply(Builder $query, Offre $offre): Builder;

    /**
     * Apply the score calculation via Joins.
     */
    abstract public function applyScoreJoin(Builder $query, Offre $offre): Builder;

    /**
     * Get the SQL column name or expression for the score in the final SELECT.
     */
    abstract public function getScoreColumn(Offre $offre): string;

    /**
     * Get the maximum score for this strategy given an offer.
     */
    abstract public function getMaxScore(Offre $offre): int;

    /**
     * Get the weight for a given importance level.
     */
    protected function getWeight(string $importance): int
    {
        return $this->weights[$importance] ?? 0;
    }
}

<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
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
     * Apply the matching logic to the query.
     */
    abstract public function apply(Builder $query, Offre $offre): Builder;

    /**
     * Get the SQL scoring fragment for this strategy.
     */
    abstract public function getScoreQuery(Offre $offre): string;

    /**
     * Calculate a partial score for a candidate.
     */
    abstract public function calculateScore(Candidat $candidat, Offre $offre): int;

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

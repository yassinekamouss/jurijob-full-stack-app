<?php

namespace App\Services\Matching\Contracts;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

interface MatchingStrategy
{
    /**
     * Apply indispensable filtering to the query (required criteria only).
     */
    public function apply(Builder $query, Offre $offre): Builder;

    /**
     * Get a SQL subquery that calculates the score for this strategy.
     * Returns a subquery in the form: (SELECT SUM(...) as score FROM table WHERE ...) as alias_name
     *
     * @return string SQL subquery expression
     */
    public function getScoreSubquery(Offre $offre): string;

    /**
     * Get the alias name used in getScoreSubquery().
     * Example: "lang_scores" for language strategy
     */
    public function getScoreAlias(): string;

    /**
     * Get the maximum possible score for this strategy given an offer.
     */
    public function getMaxScore(Offre $offre): int;

    /**
     * Check if this strategy is active for the given offer (has criteria).
     */
    public function isActive(Offre $offre): bool;
}

<?php

namespace App\Services\Matching\Contracts;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

interface MatchingStrategy
{
    /**
     * Apply the matching logic to the query (Indispensable filtering).
     */
    public function apply(Builder $query, Offre $offre): Builder;

    /**
     * Apply the score calculation via Joins.
     */
    public function applyScoreJoin(Builder $query, Offre $offre): Builder;

    /**
     * Get the SQL column name or expression for the score in the final SELECT.
     * Example: "COALESCE(lang_scores.score, 0)"
     */
    public function getScoreColumn(Offre $offre): string;

    /**
     * Get the maximum possible score for this strategy given an offer.
     */
    public function getMaxScore(Offre $offre): int;
}

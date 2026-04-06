<?php

namespace App\Services\Matching\Contracts;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

interface MatchingStrategy
{
    /**
     * Apply the matching logic to the query (Indispensable filtering).
     */
    public function apply(Builder $query, Offre $offre): Builder;

    /**
     * Get the SQL expression to calculate the score for this strategy.
     */
    public function getScoreQuery(Offre $offre): string;

    /**
     * Calculate a partial score for a candidate (PHP fallback/Percentage calculation).
     */
    public function calculateScore(Candidat $candidat, Offre $offre): int;

    /**
     * Get the maximum possible score for this strategy given an offer.
     */
    public function getMaxScore(Offre $offre): int;
}

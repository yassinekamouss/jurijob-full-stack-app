<?php

namespace App\Services\Matching;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Services\Matching\Contracts\MatchingStrategy;
use App\Services\Matching\Strategies\TotalExperienceMatchingStrategy;
use Illuminate\Support\Collection;

class MatchingEngine
{
    /**
     * @param  iterable<MatchingStrategy>  $strategies
     */
    public function __construct(protected iterable $strategies)
    {
    }

    /**
     * Get a list of candidates matched and sorted by score.
     */
    public function getMatches(Offre $offre, bool $allowOverqualified = false): Collection
    {
        $query = Candidat::query();

        // 1. Pre-filtering (General context)
        $query->where('poste_id', $offre->poste_id)
            ->whereIn('candidats.id', function ($q) use ($offre) {
                $q->select('candidat_id')
                    ->from('candidat_type_travails')
                    ->where('type_travail_id', $offre->type_travail_id);
            });


        // 2. Apply filtering and scoring joins
        foreach ($this->strategies as $strategy) {
            if ($strategy instanceof TotalExperienceMatchingStrategy) {
                $strategy->setAllowOverqualified($allowOverqualified);
            }

            // Filtering (Indispensable)
            $query = $strategy->apply($query, $offre);

            // Scoring (Joins)
            $query = $strategy->applyScoreJoin($query, $offre);
        }

        // 3. Assemble total score expression
        $scoreFragments = [];
        $maxPossibleScore = 0;

        foreach ($this->strategies as $strategy) {
            $scoreFragments[] = $strategy->getScoreColumn($offre);
            $maxPossibleScore += $strategy->getMaxScore($offre);
        }

        $scoreExpression = implode(' + ', $scoreFragments);

        $query->selectRaw("candidats.*, ($scoreExpression) as total_sql_score")
            ->orderBy('total_sql_score', 'desc')
            ->limit(100);

        // 4. Fetch candidates with relationships
        $candidates = $query->with([
            'langues',
            'specialisations',
            'villeTravails',
            'formations',
            'domainExperiences',
            'modeTravails',
        ])->get();

        // 5. Finalize relative Percentage Score (%)
        return $candidates->map(function ($candidate) use ($maxPossibleScore) {
            $totalScore = (int) $candidate->total_sql_score;

            $candidate->matching_score = $maxPossibleScore > 0
                ? (int) min(100, round(($totalScore / $maxPossibleScore) * 100))
                : 0;

            return $candidate;
        })->values();
    }
}

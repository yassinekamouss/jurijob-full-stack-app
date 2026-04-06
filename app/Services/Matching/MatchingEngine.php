<?php

namespace App\Services\Matching;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Services\Matching\Strategies\CityMatchingStrategy;
use App\Services\Matching\Strategies\ExperienceMatchingStrategy;
use App\Services\Matching\Strategies\FormationMatchingStrategy;
use App\Services\Matching\Strategies\LanguageMatchingStrategy;
use App\Services\Matching\Strategies\ModeTravailMatchingStrategy;
use App\Services\Matching\Strategies\SpecialisationMatchingStrategy;
use App\Services\Matching\Strategies\TotalExperienceMatchingStrategy;
use Illuminate\Support\Collection;

class MatchingEngine
{
    protected array $strategies = [];

    public function __construct()
    {
        $this->strategies = [
            new LanguageMatchingStrategy,
            new SpecialisationMatchingStrategy,
            new CityMatchingStrategy,
            new FormationMatchingStrategy,
            new ExperienceMatchingStrategy,
            new ModeTravailMatchingStrategy,
            new TotalExperienceMatchingStrategy,
        ];
    }

    /**
     * Get a list of candidates matched and sorted by score.
     */
    public function getMatches(Offre $offre, bool $allowOverqualified = false): Collection
    {
        $query = Candidat::query();

        // 1. Strict Pre-filtering (Performance SQL)
        $query->where('poste_id', $offre->poste_id)
            ->whereHas('typeTravails', function ($q) use ($offre) {
                $q->where('type_travail_id', $offre->type_travail_id);
            });

        // 2. Set context and apply Filtering logic
        foreach ($this->strategies as $strategy) {
            if ($strategy instanceof TotalExperienceMatchingStrategy) {
                $strategy->setAllowOverqualified($allowOverqualified);
            }
            $query = $strategy->apply($query, $offre);
        }

        // 3. Migration to SQL Scoring (Option A)
        // We generate a virtual column 'total_score' by summing all strategy SQL fragments
        $scoreFragments = [];
        foreach ($this->strategies as $strategy) {
            $scoreFragments[] = '('.$strategy->getScoreQuery($offre).')';
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
        $maxPossibleScore = 0;
        foreach ($this->strategies as $strategy) {
            $maxPossibleScore += $strategy->getMaxScore($offre);
        }

        return $candidates->map(function ($candidate) use ($maxPossibleScore) {
            $totalScore = (int) $candidate->total_sql_score;

            // Calculate percentage score (avoid division by zero)
            $candidate->matching_score = $maxPossibleScore > 0
                ? (int) min(100, round(($totalScore / $maxPossibleScore) * 100))
                : 0;

            return $candidate;
        })->sortByDesc('matching_score')->values();
    }
}

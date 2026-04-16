<?php

namespace App\Services\Matching;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Services\Matching\Contracts\MatchingStrategy;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection;

class MatchingEngine
{
    /**
     * Minimum matching score percentage (0-100) to include a candidate.
     * Candidates below this threshold are filtered out.
     */
    private const MINIMUM_MATCHING_SCORE = 50;

    /**
     * @param  iterable<MatchingStrategy>  $strategies
     */
    public function __construct(protected iterable $strategies) {}

    /**
     * Get a list of candidates matched and sorted by score.
     * Uses correlated subqueries instead of multiple JOINs for improved performance and memory efficiency.
     *
     * @param  Offre  $offre  The job offer to match against.
     * @return Collection<int, mixed> List of candidates with their matching percentage.
     */
    public function getMatches(Offre $offre): Collection
    {
        // 0. Eager load only the necessary data for matching strategies to avoid N+1 queries.
        $offre->loadMissing(['critereGroupes.criteres']);

        $query = Candidat::query()->select('candidats.id', 'candidats.user_id');

        // 1. Pre-filtering: Keep only candidates matching the base post and allowed working types.
        $query->where('candidats.poste_id', $offre->poste_id)
            ->where('candidats.niveau_experience_id', '=', $offre->niveau_experience_id)
            ->whereHas('typeTravails', function ($q) use ($offre) {
                $q->where('type_travail_id', $offre->type_travail_id);
            });

        // 2. Filter to only active strategies (those with criteria defined for this offer).
        $activeStrategies = $this->getActiveStrategies($offre);

        // 3. Apply indispensable filtering for active matching strategies.
        foreach ($activeStrategies as $strategy) {
            $query = $strategy->apply($query, $offre);
        }

        // 4. Build all scoring subqueries and calculate the theoretical maximum score.
        $scoreSubqueries = [];
        $maxPossibleScore = 0;

        foreach ($activeStrategies as $strategy) {
            $scoreSubqueries[] = $strategy->getScoreSubquery($offre);
            $maxPossibleScore += $strategy->getMaxScore($offre);
        }

        // 5. Build the total score expression (sum of all strategies).
        $scoreExpression = '('.implode(' + ', $scoreSubqueries).')';

        // 6. Execute matching query using correlated subqueries (O(N) memory overhead).
        $candidates = $query
            ->selectRaw("$scoreExpression as total_sql_score")
            ->orderBy('total_sql_score', 'desc')
            ->limit(100)
            ->get();

        // 7. Project results into relative percentages and filter by threshold.
        return $this->calculateAndFilterMatchingScores($candidates, $maxPossibleScore);
    }

    /**
     * Get only the active strategies for the given offer.
     * A strategy is active if it has criteria defined for the offer.
     *
     * @param  Offre  $offre  The job offer to filter strategies for.
     * @return array<MatchingStrategy>
     */
    private function getActiveStrategies(Offre $offre): array
    {
        return array_filter(
            iterator_to_array($this->strategies),
            fn (MatchingStrategy $strategy) => $strategy->isActive($offre)
        );
    }

    /**
     * Projects absolute SQL scores into relative percentage scores (0-100%).
     *
     * @param  EloquentCollection  $candidates  Collection of candidates with total_sql_score.
     * @param  int  $maxPossibleScore  Maximum possible score for the current offer.
     * @return Collection<int, mixed>
     */
    private function calculateAndFilterMatchingScores(EloquentCollection $candidates, int $maxPossibleScore): Collection
    {
        return $candidates
            ->map(fn ($candidate) => $this->enrichCandidateWithPercentage($candidate, $maxPossibleScore))
            ->filter(fn ($candidate) => $candidate->matching_score >= self::MINIMUM_MATCHING_SCORE)
            ->values();
    }

    /**
     * Calculates the matching percentage for a single candidate.
     *
     * @param  Candidat  $candidate  Candidate row with total_sql_score property.
     * @param  int  $maxPossibleScore  Maximum possible score for normalization.
     * @return mixed Enriched candidate object.
     */
    private function enrichCandidateWithPercentage(mixed $candidate, int $maxPossibleScore): mixed
    {
        $totalScore = (int) $candidate->total_sql_score;

        $candidate->matching_score = $maxPossibleScore > 0
            ? (int) min(100, round(($totalScore / $maxPossibleScore) * 100))
            : 0;

        return $candidate;
    }
}

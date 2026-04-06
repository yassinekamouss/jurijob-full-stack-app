<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class TotalExperienceMatchingStrategy extends AbstractMatchingStrategy
{
    /**
     * Total experience is often weighted heavily.
     */
    protected array $weights = [
        'indispensable' => 150,
        'important' => 75,
        'souhaitable' => 30,
        'facultatif' => 10,
    ];

    protected bool $allowOverqualified = false;

    public function setAllowOverqualified(bool $allowOverqualified): void
    {
        $this->allowOverqualified = $allowOverqualified;
    }

    public function apply(Builder $query, Offre $offre): Builder
    {
        if (! $offre->niveau_experience_id) {
            return $query;
        }

        // Apply strict or flexible filtering based on $allowOverqualified
        if ($this->allowOverqualified) {
            return $query->where('niveau_experience_id', '>=', $offre->niveau_experience_id);
        }

        return $query->where('niveau_experience_id', '=', $offre->niveau_experience_id);
    }

    public function getScoreQuery(Offre $offre): string
    {
        if (! $offre->niveau_experience_id) {
            return '0';
        }

        $requiredLevel = (int) $offre->niveau_experience_id;
        $weight = $this->weights['important'];
        $bonusWeight = (int) ($weight * 1.1);

        if ($this->allowOverqualified) {
            return 'CASE '.
                   "WHEN niveau_experience_id = $requiredLevel THEN $weight ".
                   "WHEN niveau_experience_id > $requiredLevel THEN $bonusWeight ".
                   'ELSE 0 END';
        }

        return "CASE WHEN niveau_experience_id = $requiredLevel THEN $weight ELSE 0 END";
    }

    public function calculateScore(Candidat $candidat, Offre $offre): int
    {
        if (! $offre->niveau_experience_id || ! $candidat->niveau_experience_id) {
            return 0;
        }

        $weight = $this->weights['important'];

        // Exact match gets 100% score
        if ((int) $candidat->niveau_experience_id === (int) $offre->niveau_experience_id) {
            return $weight;
        }

        // Higher level (if allowed) gets a 10% bonus (you mentioned 80% or a bonus)
        if ($this->allowOverqualified && (int) $candidat->niveau_experience_id > (int) $offre->niveau_experience_id) {
            return (int) ($weight * 1.1); // Bonus for overqualification
        }

        return 0;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->niveau_experience_id ? $this->weights['important'] : 0;
    }
}

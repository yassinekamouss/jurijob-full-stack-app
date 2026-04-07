<?php

namespace App\Services\Matching\Strategies;

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
        // We no longer filter by experience level to allow ranking instead of exclusion
        return $query;
    }

    public function applyScoreJoin(Builder $query, Offre $offre): Builder
    {
        // No join needed as niveau_experience_id is on the candidats table
        return $query;
    }

    public function getScoreColumn(Offre $offre): string
    {
        if (!$offre->niveau_experience_id) {
            return '0';
        }

        $requiredLevel = (int) $offre->niveau_experience_id;
        $weight = $this->weights['important'];
        $bonusWeight = (int) ($weight * 1.1);
        $baseScore = (int) ($weight * 0.1); // Score de base pour les sur-qualifiés si non autorisés

        if ($this->allowOverqualified) {
            return 'CASE ' .
                "WHEN candidats.niveau_experience_id = $requiredLevel THEN $weight " .
                "WHEN candidats.niveau_experience_id > $requiredLevel THEN $bonusWeight " .
                'ELSE 0 END';
        }

        // If not explicitly allowing overqualified, give them a base score to rank them at the bottom
        return 'CASE ' .
            "WHEN candidats.niveau_experience_id = $requiredLevel THEN $weight " .
            "WHEN candidats.niveau_experience_id > $requiredLevel THEN $baseScore " .
            'ELSE 0 END';
    }

    public function getMaxScore(Offre $offre): int
    {
        if (!$offre->niveau_experience_id) {
            return 0;
        }

        // Max possible score is with the 10% bonus
        return (int) ($this->weights['important'] * 1.1);
    }
}

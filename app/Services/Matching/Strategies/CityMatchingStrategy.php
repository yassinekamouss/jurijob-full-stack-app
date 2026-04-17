<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class CityMatchingStrategy extends AbstractMatchingStrategy
{
    private const REMOTE_MODE_ID = 2; // Télétravail

    private const SCORE_ALIAS = 'city_score';

    private const TYPE = 'ville';

    protected array $weights = [
        'indispensable' => 80,
        'important' => 40,
        'souhaitable' => 10,
        'facultatif' => 5,
    ];

    protected function getStrategyType(): string
    {
        return self::TYPE;
    }

    public function isActive(Offre $offre): bool
    {
        // Only active if the offer is NOT in remote mode
        return $offre->mode_travail_id !== self::REMOTE_MODE_ID;
    }

    public function apply(Builder $query, Offre $offre): Builder
    {
        // If remote work mode, don't filter by city
        if ($offre->mode_travail_id === self::REMOTE_MODE_ID) {
            return $query;
        }

        $villeId = $offre->ville_id;

        if (! $villeId) {
            return $query;
        }

        // Filter candidates who are willing to work in this city
        return $query->whereIn('candidats.id', function ($q) use ($villeId) {
            $q->select('candidat_id')
                ->from('candidat_ville_travails')
                ->where('ville_id', $villeId);
        });
    }

    public function getScoreSubquery(Offre $offre): string
    {
        // If remote work mode, no scoring for city
        if ($offre->mode_travail_id === self::REMOTE_MODE_ID) {
            return '0';
        }

        $villeId = (int) $offre->ville_id;

        if (! $villeId) {
            return '0';
        }

        // Award points if candidate is willing to work in this city
        return "(SELECT CASE WHEN EXISTS(
                    SELECT 1 FROM candidat_ville_travails 
                    WHERE ville_id = $villeId AND candidat_id = candidats.id
                ) THEN 60 ELSE 0 END)";
    }

    public function getScoreAlias(): string
    {
        return self::SCORE_ALIAS;
    }

    public function getMaxScore(Offre $offre): int
    {
        // If remote mode, no city score
        if ($offre->mode_travail_id === self::REMOTE_MODE_ID) {
            return 0;
        }

        return $offre->ville_id ? 60 : 0;
    }
}

<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class ModeTravailMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'mode_travail_score';

    private const TYPE = 'mode_travail';

    protected array $weights = [
        'indispensable' => 60,
        'important' => 30,
        'souhaitable' => 10,
        'facultatif' => 5,
    ];

    protected function getStrategyType(): string
    {
        return self::TYPE;
    }

    public function isActive(Offre $offre): bool
    {
        return (bool) $offre->mode_travail_id;
    }

    public function apply(Builder $query, Offre $offre): Builder
    {
        $modeId = $offre->mode_travail_id;

        if (! $modeId) {
            return $query;
        }

        return $query->whereIn('candidats.id', function ($q) use ($modeId) {
            $q->select('candidat_id')
                ->from('candidat_mode_travails')
                ->where('mode_travail_id', $modeId);
        });
    }

    public function getScoreSubquery(Offre $offre): string
    {
        $modeId = (int) $offre->mode_travail_id;

        if (! $modeId) {
            return '0';
        }

        return "(SELECT CASE WHEN EXISTS(
                    SELECT 1 FROM candidat_mode_travails 
                    WHERE mode_travail_id = $modeId AND candidat_id = candidats.id
                ) THEN 60 ELSE 0 END)";
    }

    public function getScoreAlias(): string
    {
        return self::SCORE_ALIAS;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->mode_travail_id ? 60 : 0;
    }
}

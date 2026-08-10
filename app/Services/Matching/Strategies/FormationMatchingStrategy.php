<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class FormationMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'form_score';

    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 5,
    ];

    protected function getStrategyType(): string
    {
        // Formation juridique is now a direct field on offres, not a critere multiple.
        // This strategy matches based on offre->formation_juridique_id vs candidat->formation_juridique_id.
        return '__formation_not_a_critere_multiple__';
    }

    public function isActive(Offre $offre): bool
    {
        return $offre->formation_juridique_id !== null;
    }

    public function apply(Builder $query, Offre $offre): Builder
    {
        // Not eliminatory — we only award points, no hard filter.
        return $query;
    }

    public function getScoreSubquery(Offre $offre): string
    {
        if (! $offre->formation_juridique_id) {
            return '0';
        }

        $formationId = (int) $offre->formation_juridique_id;
        $weight = $this->getWeight('important');

        return "(CASE WHEN candidats.formation_juridique_id = $formationId THEN $weight ELSE 0 END)";
    }

    public function getScoreAlias(): string
    {
        return self::SCORE_ALIAS;
    }

    public function getMaxScore(Offre $offre): int
    {
        if (! $offre->formation_juridique_id) {
            return 0;
        }

        return $this->getWeight('important');
    }
}

<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class SpecialisationMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'spec_score';

    private const TYPE = 'SPECIALISATION';

    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 5,
    ];

    protected function getStrategyType(): string
    {
        return self::TYPE;
    }

    public function apply(Builder $query, Offre $offre): Builder
    {
        $criteres = $this->getCriteres($offre);

        if ($criteres->isEmpty()) {
            return $query;
        }

        return $this->applyIndispensableFilter($query, $criteres, 'candidat_specialisations', 'specialisation_id');
    }

    public function getScoreSubquery(Offre $offre): string
    {
        $criteres = $this->getCriteres($offre);

        if ($criteres->isEmpty()) {
            return '0';
        }

        $ids = $criteres->pluck('critere_id')->implode(',');

        $cases = $criteres->map(function ($req) {
            $importance = $req->metadata['importance'] ?? 'facultatif';

            return 'WHEN specialisation_id = '.(int) $req->critere_id.' THEN '.$this->getWeight($importance);
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) 
                  FROM candidat_specialisations 
                  WHERE specialisation_id IN ($ids) 
                  AND candidat_id = candidats.id)";
    }

    public function getScoreAlias(): string
    {
        return self::SCORE_ALIAS;
    }

    public function getMaxScore(Offre $offre): int
    {
        $criteres = $this->getCriteres($offre);

        if ($criteres->isEmpty()) {
            return 0;
        }

        return (int) $criteres->sum(fn ($c) => $this->getWeight($c->metadata['importance'] ?? 'facultatif'));
    }
}

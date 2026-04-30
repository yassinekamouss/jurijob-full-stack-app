<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class SpecialisationMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'spec_score';

    private const TYPE = 'specialisation';

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
        $group = $this->getGroupForType($offre, self::TYPE);

        if (! $group) {
            return $query;
        }

        return $this->applyIndispensableFilter($query, $group, 'candidat_specialisations', 'specialisation_id');
    }

    public function getScoreSubquery(Offre $offre): string
    {
        $group = $this->getGroupForType($offre, self::TYPE);

        if (! $group || $group->criteres->isEmpty()) {
            return '0';
        }

        $ids = $group->criteres->pluck('critere_id')->implode(',');

        $cases = $group->criteres->map(function ($req) {
            return 'WHEN specialisation_id = '.(int) $req->critere_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        $aggregator = $group->operateur === 'OR' ? 'MAX' : 'SUM';

        return "(SELECT COALESCE($aggregator(CASE $cases ELSE 0 END), 0) 
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
        $group = $this->getGroupForType($offre, self::TYPE);

        if (! $group) {
            return 0;
        }

        if ($group->operateur === 'OR') {
            return (int) $group->criteres->max(fn ($c) => $this->getWeight($c->importance));
        }

        return (int) $group->criteres->sum(fn ($c) => $this->getWeight($c->importance));
    }
}

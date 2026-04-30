<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class ExperienceMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'exp_score';

    private const TYPE = 'domaine_experience';

    protected array $weights = [
        'indispensable' => 120,
        'important' => 60,
        'souhaitable' => 30,
        'facultatif' => 10,
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

        return $this->applyIndispensableFilter($query, $group, 'candidat_domain_experiences', 'domaine_experience_id');
    }

    public function getScoreSubquery(Offre $offre): string
    {
        $group = $this->getGroupForType($offre, self::TYPE);

        if (! $group || $group->criteres->isEmpty()) {
            return '0';
        }

        $ids = $group->criteres->pluck('critere_id')->implode(',');

        $cases = $group->criteres->map(function ($req) {
            return 'WHEN domaine_experience_id = '.(int) $req->critere_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        $aggregator = $group->operateur === 'OR' ? 'MAX' : 'SUM';

        return "(SELECT COALESCE($aggregator(CASE $cases ELSE 0 END), 0) 
                  FROM candidat_domain_experiences 
                  WHERE domaine_experience_id IN ($ids) 
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

<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class FormationMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'form_score';

    private const TYPE = 'formation_juridique';

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

        $indispensables = $group->criteres->where('importance', 'indispensable');

        if ($indispensables->isEmpty()) {
            return $query;
        }

        $ids = $indispensables->pluck('critere_id')->toArray();

        // Since it's a direct column, we filter candidats directly.
        return $query->whereIn('candidats.formation_juridique_id', $ids);
    }

    public function getScoreSubquery(Offre $offre): string
    {
        $group = $this->getGroupForType($offre, self::TYPE);

        if (! $group || $group->criteres->isEmpty()) {
            return '0';
        }

        $cases = $group->criteres->map(function ($req) {
            return 'WHEN candidats.formation_juridique_id = '.(int) $req->critere_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        return "(CASE $cases ELSE 0 END)";
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

<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class LanguageMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'lang_score';

    private const TYPE = 'langue';

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

        $aggregator = $group->operateur === 'OR' ? 'orWhere' : 'where';

        return $query->whereIn('candidats.id', function ($q) use ($indispensables, $group) {
            $q->select('candidat_id')
                ->from('candidat_langues')
                ->where(function ($sub) use ($indispensables, $group) {
                    foreach ($indispensables as $req) {
                        $method = ($group->operateur === 'OR') ? 'orWhere' : 'where';
                        $sub->$method(function ($s) use ($req) {
                            $s->where('langue_id', $req->critere_id)
                                ->where('niveau_langue_id', '>=', $req->valeur_id);
                        });
                    }
                });

            if ($group->operateur === 'AND') {
                $q->groupBy('candidat_id')
                    ->havingRaw('COUNT candidat_id = candidats.id(DISTINCT langue_id) = ?', [$indispensables->count()]);
            }
        });
    }

    public function getScoreSubquery(Offre $offre): string
    {
        $group = $this->getGroupForType($offre, self::TYPE);

        if (! $group || $group->criteres->isEmpty()) {
            return '0';
        }

        $ids = $group->criteres->pluck('critere_id')->implode(',');

        $cases = $group->criteres->map(function ($req) {
            $langueId = (int) $req->critere_id;
            $requiredLevelId = (int) $req->valeur_id;
            $weight = $this->getWeight($req->importance);
            $bonusWeight = (int) ($weight * 1.1);

            return "WHEN langue_id = $langueId AND niveau_langue_id = $requiredLevelId THEN $weight ".
                "WHEN langue_id = $langueId AND niveau_langue_id > $requiredLevelId THEN $bonusWeight";
        })->implode(' ');

        $aggregator = $group->operateur === 'OR' ? 'MAX' : 'SUM';

        return "(SELECT COALESCE($aggregator(CASE $cases ELSE 0 END), 0) 
                  FROM candidat_langues 
                  WHERE langue_id IN ($ids) 
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

        $sumFunc = $group->operateur === 'OR' ? 'max' : 'sum';

        return (int) $group->criteres->$sumFunc(fn ($req) => $this->getWeight($req->importance) * 1.1);
    }
}

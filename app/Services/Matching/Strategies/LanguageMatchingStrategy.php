<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class LanguageMatchingStrategy extends AbstractMatchingStrategy
{
    private const SCORE_ALIAS = 'lang_score';

    private const TYPE = 'LANGUE';

    protected array $weights = [
        'indispensable' => 50,
        'important' => 25,
        'souhaitable' => 15,
        'facultatif' => 3,
    ];

    protected function getStrategyType(): string
    {
        return self::TYPE;
    }

    public function apply(Builder $query, Offre $offre): Builder
    {
        $criteres = $this->getCriteres($offre);
        $indispensables = $criteres->filter(fn ($c) => ($c->metadata['importance'] ?? '') === 'indispensable');

        if ($indispensables->isEmpty()) {
            return $query;
        }

        return $query->whereIn('candidats.id', function ($q) use ($indispensables) {
            $q->select('candidat_id')
                ->from('candidat_langues')
                ->where(function ($sub) use ($indispensables) {
                    foreach ($indispensables as $req) {
                        $niveauId = $req->metadata['niveau_langue_id'] ?? null;
                        $sub->orWhere(function ($s) use ($req, $niveauId) {
                            $s->where('langue_id', $req->critere_id);
                            if ($niveauId) {
                                $s->where('niveau_langue_id', '>=', $niveauId);
                            }
                        });
                    }
                });
        });
    }

    public function getScoreSubquery(Offre $offre): string
    {
        $criteres = $this->getCriteres($offre);

        if ($criteres->isEmpty()) {
            return '0';
        }

        $ids = $criteres->pluck('critere_id')->implode(',');

        $cases = $criteres->map(function ($req) {
            $langueId = (int) $req->critere_id;
            $importance = $req->metadata['importance'] ?? 'facultatif';
            $requiredLevelId = (int) ($req->metadata['niveau_langue_id'] ?? 0);
            $weight = $this->getWeight($importance);
            $bonusWeight = (int) ($weight * 1.1);

            if ($requiredLevelId > 0) {
                return "WHEN langue_id = $langueId AND niveau_langue_id = $requiredLevelId THEN $weight ".
                    "WHEN langue_id = $langueId AND niveau_langue_id > $requiredLevelId THEN $bonusWeight";
            }

            return "WHEN langue_id = $langueId THEN $weight";
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) 
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
        $criteres = $this->getCriteres($offre);

        if ($criteres->isEmpty()) {
            return 0;
        }

        return (int) $criteres->sum(fn ($c) => $this->getWeight($c->metadata['importance'] ?? 'facultatif') * 1.1);
    }
}

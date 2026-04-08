<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class LanguageMatchingStrategy extends AbstractMatchingStrategy
{
    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 5,
    ];

    public function apply(Builder $query, Offre $offre): Builder
    {
        $indispensableLanguages = $offre->langueRequirements()
            ->where('importance', 'indispensable')
            ->get();

        if ($indispensableLanguages->isEmpty()) {
            return $query;
        }

        // Optimized filtering: Single JOIN with HAVING COUNT for all indispensable requirements
        // We match candidate languages where level is >= required level
        return $query->whereIn('candidats.id', function ($q) use ($indispensableLanguages) {
            $q->select('candidat_id')
                ->from('candidat_langues')
                ->where(function ($sub) use ($indispensableLanguages) {
                    foreach ($indispensableLanguages as $req) {
                        $sub->orWhere(function ($s) use ($req) {
                            $s->where('langue_id', $req->langue_id)
                                ->where('niveau_langue_id', '>=', $req->niveau_langue_id);
                        });
                    }
                })
                ->groupBy('candidat_id')
                ->havingRaw('COUNT(DISTINCT langue_id) = ?', [$indispensableLanguages->count()]);
        });
    }

    public function applyScoreJoin(Builder $query, Offre $offre): Builder
    {
        $requirements = $offre->langueRequirements;

        if ($requirements->isEmpty()) {
            return $query;
        }

        $cases = $requirements->map(function ($req) {
            $langueId = (int) $req->langue_id;
            $requiredLevelId = (int) $req->niveau_langue_id;
            $weight = $this->getWeight($req->importance);
            $bonusWeight = (int) ($weight * 1.1);

            return "WHEN langue_id = $langueId AND niveau_langue_id = $requiredLevelId THEN $weight ".
                   "WHEN langue_id = $langueId AND niveau_langue_id > $requiredLevelId THEN $bonusWeight";
        })->implode(' ');

        $subquery = "SELECT candidat_id, SUM(CASE $cases ELSE 0 END) as score 
                     FROM candidat_langues 
                     GROUP BY candidat_id";

        return $query->leftJoin(
            DB::raw("($subquery) as lang_scores"),
            'lang_scores.candidat_id',
            '=',
            'candidats.id'
        );
    }

    public function getScoreColumn(Offre $offre): string
    {
        if ($offre->langueRequirements->isEmpty()) {
            return '0';
        }

        return 'COALESCE(lang_scores.score, 0)';
    }

    public function getMaxScore(Offre $offre): int
    {
        // Max score includes the 10% bonus for over-qualification to keep percentage <= 100%
        return (int) $offre->langueRequirements->sum(fn ($req) => $this->getWeight($req->importance) * 1.1);
    }
}

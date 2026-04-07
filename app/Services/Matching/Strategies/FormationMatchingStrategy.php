<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class FormationMatchingStrategy extends AbstractMatchingStrategy
{
    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 5,
    ];

    public function apply(Builder $query, Offre $offre): Builder
    {
        $indispensableIds = $offre->formationJuridiqueRequirements()
            ->where('importance', 'indispensable')
            ->pluck('formation_juridique_id')
            ->toArray();

        if (empty($indispensableIds)) {
            return $query;
        }

        return $query->whereIn('candidats.id', function ($q) use ($indispensableIds) {
            $q->select('candidat_id')
                ->from('candidat_formations')
                ->whereIn('formation_juridique_id', $indispensableIds)
                ->groupBy('candidat_id')
                ->havingRaw('COUNT(DISTINCT formation_juridique_id) = ?', [count($indispensableIds)]);
        });
    }

    public function applyScoreJoin(Builder $query, Offre $offre): Builder
    {
        $requirements = $offre->formationJuridiqueRequirements;

        if ($requirements->isEmpty()) {
            return $query;
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN formation_juridique_id = '.(int) $req->formation_juridique_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        $subquery = "SELECT candidat_id, SUM(CASE $cases ELSE 0 END) as score 
                     FROM candidat_formations 
                     GROUP BY candidat_id";

        return $query->leftJoin(
            DB::raw("($subquery) as form_scores"),
            'form_scores.candidat_id',
            '=',
            'candidats.id'
        );
    }

    public function getScoreColumn(Offre $offre): string
    {
        return 'COALESCE(form_scores.score, 0)';
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->formationJuridiqueRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

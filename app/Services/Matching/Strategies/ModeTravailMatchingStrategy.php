<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ModeTravailMatchingStrategy extends AbstractMatchingStrategy
{
    protected array $weights = [
        'indispensable' => 60,
        'important' => 30,
        'souhaitable' => 10,
        'facultatif' => 5,
    ];

    public function apply(Builder $query, Offre $offre): Builder
    {
        $indispensableIds = $offre->modeTravailRequirements()
            ->where('importance', 'indispensable')
            ->pluck('mode_travail_id')
            ->toArray();

        if (empty($indispensableIds)) {
            return $query;
        }

        return $query->whereIn('candidats.id', function ($q) use ($indispensableIds) {
            $q->select('candidat_id')
                ->from('candidat_mode_travails')
                ->whereIn('mode_travail_id', $indispensableIds)
                ->groupBy('candidat_id')
                ->havingRaw('COUNT(DISTINCT mode_travail_id) = ?', [count($indispensableIds)]);
        });
    }

    public function applyScoreJoin(Builder $query, Offre $offre): Builder
    {
        $requirements = $offre->modeTravailRequirements;

        if ($requirements->isEmpty()) {
            return $query;
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN mode_travail_id = '.(int) $req->mode_travail_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        $subquery = "SELECT candidat_id, SUM(CASE $cases ELSE 0 END) as score 
                     FROM candidat_mode_travails 
                     GROUP BY candidat_id";

        return $query->leftJoin(
            DB::raw("($subquery) as mode_scores"),
            'mode_scores.candidat_id',
            '=',
            'candidats.id'
        );
    }

    public function getScoreColumn(Offre $offre): string
    {
        if ($offre->modeTravailRequirements->isEmpty()) {
            return '0';
        }

        return 'COALESCE(mode_scores.score, 0)';
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->modeTravailRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

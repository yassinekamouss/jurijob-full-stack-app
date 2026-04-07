<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class CityMatchingStrategy extends AbstractMatchingStrategy
{
    protected array $weights = [
        'indispensable' => 80,
        'important' => 40,
        'souhaitable' => 10,
        'facultatif' => 5,
    ];

    public function apply(Builder $query, Offre $offre): Builder
    {
        $indispensableIds = $offre->villeRequirements()
            ->where('importance', 'indispensable')
            ->pluck('ville_id')
            ->toArray();

        if (empty($indispensableIds)) {
            return $query;
        }

        return $query->whereIn('candidats.id', function ($q) use ($indispensableIds) {
            $q->select('candidat_id')
                ->from('candidat_ville_travails')
                ->whereIn('ville_id', $indispensableIds)
                ->groupBy('candidat_id')
                ->havingRaw('COUNT(DISTINCT ville_id) = ?', [count($indispensableIds)]);
        });
    }

    public function applyScoreJoin(Builder $query, Offre $offre): Builder
    {
        $requirements = $offre->villeRequirements;

        if ($requirements->isEmpty()) {
            return $query;
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN ville_id = '.(int) $req->ville_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        $subquery = "SELECT candidat_id, SUM(CASE $cases ELSE 0 END) as score 
                     FROM candidat_ville_travails 
                     GROUP BY candidat_id";

        return $query->leftJoin(
            DB::raw("($subquery) as city_scores"),
            'city_scores.candidat_id',
            '=',
            'candidats.id'
        );
    }

    public function getScoreColumn(Offre $offre): string
    {
        return 'COALESCE(city_scores.score, 0)';
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->villeRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

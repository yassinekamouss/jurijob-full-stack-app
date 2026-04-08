<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class SpecialisationMatchingStrategy extends AbstractMatchingStrategy
{
    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 5,
    ];

    public function apply(Builder $query, Offre $offre): Builder
    {
        $indispensableIds = $offre->specialisationRequirements()
            ->where('importance', 'indispensable')
            ->pluck('specialisation_id')
            ->toArray();

        if (empty($indispensableIds)) {
            return $query;
        }

        // Optimized filtering: Single JOIN with HAVING COUNT for all indispensable requirements
        return $query->whereIn('candidats.id', function ($q) use ($indispensableIds) {
            $q->select('candidat_id')
                ->from('candidat_specialisations')
                ->whereIn('specialisation_id', $indispensableIds)
                ->groupBy('candidat_id')
                ->havingRaw('COUNT(DISTINCT specialisation_id) = ?', [count($indispensableIds)]);
        });
    }

    public function applyScoreJoin(Builder $query, Offre $offre): Builder
    {
        $requirements = $offre->specialisationRequirements;

        if ($requirements->isEmpty()) {
            return $query;
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN specialisation_id = '.(int) $req->specialisation_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        $subquery = "SELECT candidat_id, SUM(CASE $cases ELSE 0 END) as score 
                     FROM candidat_specialisations 
                     GROUP BY candidat_id";

        return $query->leftJoin(
            DB::raw("($subquery) as spec_scores"),
            'spec_scores.candidat_id',
            '=',
            'candidats.id'
        );
    }

    public function getScoreColumn(Offre $offre): string
    {
        if ($offre->specialisationRequirements->isEmpty()) {
            return '0';
        }

        return 'COALESCE(spec_scores.score, 0)';
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->specialisationRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ExperienceMatchingStrategy extends AbstractMatchingStrategy
{
    protected array $weights = [
        'indispensable' => 120,
        'important' => 60,
        'souhaitable' => 30,
        'facultatif' => 10,
    ];

    public function apply(Builder $query, Offre $offre): Builder
    {
        $indispensableIds = $offre->domainExperienceRequirements()
            ->where('importance', 'indispensable')
            ->pluck('domaine_experience_id')
            ->toArray();

        if (empty($indispensableIds)) {
            return $query;
        }

        return $query->whereIn('candidats.id', function ($q) use ($indispensableIds) {
            $q->select('candidat_id')
                ->from('candidat_domain_experiences')
                ->whereIn('domaine_experience_id', $indispensableIds)
                ->groupBy('candidat_id')
                ->havingRaw('COUNT(DISTINCT domaine_experience_id) = ?', [count($indispensableIds)]);
        });
    }

    public function applyScoreJoin(Builder $query, Offre $offre): Builder
    {
        $requirements = $offre->domainExperienceRequirements;

        if ($requirements->isEmpty()) {
            return $query;
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN domaine_experience_id = '.(int) $req->domaine_experience_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        $subquery = "SELECT candidat_id, SUM(CASE $cases ELSE 0 END) as score 
                     FROM candidat_domain_experiences 
                     GROUP BY candidat_id";

        return $query->leftJoin(
            DB::raw("($subquery) as exp_scores"),
            'exp_scores.candidat_id',
            '=',
            'candidats.id'
        );
    }

    public function getScoreColumn(Offre $offre): string
    {
        return 'COALESCE(exp_scores.score, 0)';
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->domainExperienceRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

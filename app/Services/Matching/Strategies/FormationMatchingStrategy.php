<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

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
        $indispensableFormations = $offre->formationJuridiqueRequirements()
            ->where('importance', 'indispensable')
            ->get();

        foreach ($indispensableFormations as $req) {
            $query->whereHas('formations', function ($q) use ($req) {
                $q->where('formation_juridique_id', $req->formation_juridique_id);
            });
        }

        return $query;
    }

    public function getScoreQuery(Offre $offre): string
    {
        $requirements = $offre->formationJuridiqueRequirements;

        if ($requirements->isEmpty()) {
            return '0';
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN formation_juridique_id = '.(int) $req->formation_juridique_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) FROM candidat_formations WHERE candidat_formations.candidat_id = candidats.id)";
    }

    public function calculateScore(Candidat $candidat, Offre $offre): int
    {
        $score = 0;
        $requirements = $offre->formationJuridiqueRequirements;

        foreach ($requirements as $req) {
            $match = $candidat->formations->first(function ($cf) use ($req) {
                return (int) $cf->formation_juridique_id === (int) $req->formation_juridique_id;
            });

            if ($match) {
                $score += $this->getWeight($req->importance);
            }
        }

        return $score;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->formationJuridiqueRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

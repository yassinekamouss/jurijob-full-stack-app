<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

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
        $indispensableSpecialisations = $offre->specialisationRequirements()
            ->where('importance', 'indispensable')
            ->get();

        foreach ($indispensableSpecialisations as $req) {
            $query->whereHas('specialisations', function ($q) use ($req) {
                $q->where('specialisation_id', $req->specialisation_id);
            });
        }

        return $query;
    }

    public function getScoreQuery(Offre $offre): string
    {
        $requirements = $offre->specialisationRequirements;

        if ($requirements->isEmpty()) {
            return '0';
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN specialisation_id = '.(int) $req->specialisation_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) FROM candidat_specialisations WHERE candidat_specialisations.candidat_id = candidats.id)";
    }

    public function calculateScore(Candidat $candidat, Offre $offre): int
    {
        $score = 0;
        $requirements = $offre->specialisationRequirements;

        foreach ($requirements as $req) {
            $match = $candidat->specialisations->first(function ($cs) use ($req) {
                return (int) $cs->specialisation_id === (int) $req->specialisation_id;
            });

            if ($match) {
                $score += $this->getWeight($req->importance);
            }
        }

        return $score;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->specialisationRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

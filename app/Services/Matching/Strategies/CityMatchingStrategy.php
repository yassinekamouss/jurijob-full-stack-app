<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

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
        $indispensableVilles = $offre->villeRequirements()
            ->where('importance', 'indispensable')
            ->get();

        foreach ($indispensableVilles as $req) {
            $query->whereHas('villeTravails', function ($q) use ($req) {
                $q->where('ville_id', $req->ville_id);
            });
        }

        return $query;
    }

    public function getScoreQuery(Offre $offre): string
    {
        $requirements = $offre->villeRequirements;

        if ($requirements->isEmpty()) {
            return '0';
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN ville_id = '.(int) $req->ville_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) FROM candidat_ville_travails WHERE candidat_ville_travails.candidat_id = candidats.id)";
    }

    public function calculateScore(Candidat $candidat, Offre $offre): int
    {
        $score = 0;
        $requirements = $offre->villeRequirements;

        foreach ($requirements as $req) {
            $match = $candidat->villeTravails->first(function ($cv) use ($req) {
                return (int) $cv->ville_id === (int) $req->ville_id;
            });

            if ($match) {
                $score += $this->getWeight($req->importance);
            }
        }

        return $score;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->villeRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

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
        $indispensableModes = $offre->modeTravailRequirements()
            ->where('importance', 'indispensable')
            ->get();

        foreach ($indispensableModes as $req) {
            $query->whereHas('modeTravails', function ($q) use ($req) {
                $q->where('mode_travail_id', $req->mode_travail_id);
            });
        }

        return $query;
    }

    public function getScoreQuery(Offre $offre): string
    {
        $requirements = $offre->modeTravailRequirements;

        if ($requirements->isEmpty()) {
            return '0';
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN mode_travail_id = '.(int) $req->mode_travail_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) FROM candidat_mode_travails WHERE candidat_mode_travails.candidat_id = candidats.id)";
    }

    public function calculateScore(Candidat $candidat, Offre $offre): int
    {
        $score = 0;
        $requirements = $offre->modeTravailRequirements;

        foreach ($requirements as $req) {
            $match = $candidat->modeTravails->first(function ($cm) use ($req) {
                return (int) $cm->mode_travail_id === (int) $req->mode_travail_id;
            });

            if ($match) {
                $score += $this->getWeight($req->importance);
            }
        }

        return $score;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->modeTravailRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

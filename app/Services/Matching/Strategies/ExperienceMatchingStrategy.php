<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

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
        $indispensableExperiences = $offre->domainExperienceRequirements()
            ->where('importance', 'indispensable')
            ->get();

        foreach ($indispensableExperiences as $req) {
            $query->whereHas('domainExperiences', function ($q) use ($req) {
                $q->where('domaine_experience_id', $req->domaine_experience_id);
            });
        }

        return $query;
    }

    public function getScoreQuery(Offre $offre): string
    {
        $requirements = $offre->domainExperienceRequirements;

        if ($requirements->isEmpty()) {
            return '0';
        }

        $cases = $requirements->map(function ($req) {
            return 'WHEN domaine_experience_id = '.(int) $req->domaine_experience_id.' THEN '.$this->getWeight($req->importance);
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) FROM candidat_domain_experiences WHERE candidat_domain_experiences.candidat_id = candidats.id)";
    }

    public function calculateScore(Candidat $candidat, Offre $offre): int
    {
        $score = 0;
        $requirements = $offre->domainExperienceRequirements;

        foreach ($requirements as $req) {
            $domainMatch = $candidat->domainExperiences->contains('domaine_experience_id', $req->domaine_experience_id);

            if ($domainMatch) {
                $score += $this->getWeight($req->importance);
            }
        }

        return $score;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->domainExperienceRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

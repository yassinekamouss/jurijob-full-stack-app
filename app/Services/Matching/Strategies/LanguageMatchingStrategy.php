<?php

namespace App\Services\Matching\Strategies;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;

class LanguageMatchingStrategy extends AbstractMatchingStrategy
{
    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 5,
    ];

    public function apply(Builder $query, Offre $offre): Builder
    {
        $indispensableLanguages = $offre->langueRequirements()
            ->where('importance', 'indispensable')
            ->get();

        foreach ($indispensableLanguages as $req) {
            $query->whereHas('langues', function ($q) use ($req) {
                $q->where('langue_id', $req->langue_id)
                    ->where('niveau_langue_id', '>=', $req->niveau_langue_id);
            });
        }

        return $query;
    }

    public function getScoreQuery(Offre $offre): string
    {
        $requirements = $offre->langueRequirements;

        if ($requirements->isEmpty()) {
            return '0';
        }

        $cases = $requirements->map(function ($req) {
            $langueId = (int) $req->langue_id;
            $requiredLevelId = (int) $req->niveau_langue_id;
            $weight = $this->getWeight($req->importance);
            $bonusWeight = (int) ($weight * 1.1);

            return "WHEN langue_id = $langueId AND niveau_langue_id = $requiredLevelId THEN $weight ".
                   "WHEN langue_id = $langueId AND niveau_langue_id > $requiredLevelId THEN $bonusWeight";
        })->implode(' ');

        return "(SELECT COALESCE(SUM(CASE $cases ELSE 0 END), 0) FROM candidat_langues WHERE candidat_langues.candidat_id = candidats.id)";
    }

    public function calculateScore(Candidat $candidat, Offre $offre): int
    {
        $score = 0;
        $requirements = $offre->langueRequirements;

        foreach ($requirements as $req) {
            $match = $candidat->langues->first(function ($cl) use ($req) {
                return $cl->langue_id === $req->langue_id && $cl->niveau_langue_id >= $req->niveau_langue_id;
            });

            if ($match) {
                $weight = $this->getWeight($req->importance);

                // Add 10% bonus if candidate level is strictly higher than required
                if ($match->niveau_langue_id > $req->niveau_langue_id) {
                    $weight = (int) ($weight * 1.1);
                }

                $score += $weight;
            }
        }

        return $score;
    }

    public function getMaxScore(Offre $offre): int
    {
        return $offre->langueRequirements->sum(fn ($req) => $this->getWeight($req->importance));
    }
}

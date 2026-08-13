<?php

namespace App\Services\CandidateMatching;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class MatchingEngine
{
    public function __construct(private MatchScorer $scorer) {}

    /**
     * Rank eligible candidates for an offer.
     *
     * Pipeline:
     * 1. Eligible candidates only (accepte + active user)
     * 2. Way 1 (optional): indispensable languages hard filter
     * 3. Way 2: hard filters on candidats columns (no heavy joins)
     * 4. Soft scoring: language levels / penalties + specialisation penalties
     *
     * When no criteria are provided, the offer's stored values are used.
     * A `null` criterion is treated as "deactivated" (no filter applied).
     *
     * @return Collection<int, Candidat>
     */
    public function getMatches(Offre $offre, ?MatchingCriteria $criteria = null): Collection
    {
        $criteria ??= MatchingCriteria::fromOffre($offre);

        $query = Candidat::query()
            ->where('candidats.status', 'accepte')
            ->whereHas('user', fn (Builder $userQuery) => $userQuery->where('is_active', true));

        $this->applyIndispensableLanguageFilter($query, $criteria);
        $this->applyProfileHardFilters($query, $criteria);

        $candidates = $query
            ->with([
                'user:id,email,telephone,is_active',
                'poste',
                'niveauExperience',
                'formationJuridique',
                'langues.langue',
                'langues.niveauLangue',
                'specialisations.specialisation',
            ])
            ->get();

        return $candidates
            ->map(function (Candidat $candidat) use ($criteria) {
                $breakdown = $this->scorer->score($candidat, $criteria);
                $candidat->setAttribute('matching_score', $breakdown['score']);
                $candidat->setAttribute('matching_breakdown', $breakdown);

                return $candidat;
            })
            ->sortByDesc('matching_score')
            ->values();
    }

    /**
     * Way 1: if the criteria have indispensable languages, keep only candidates
     * who satisfy ALL of them (language + minimum level).
     */
    private function applyIndispensableLanguageFilter(Builder $query, MatchingCriteria $criteria): void
    {
        $indispensables = $criteria->languages()
            ->filter(fn (array $criterion) => ($criterion['metadata']['importance'] ?? '') === 'indispensable')
            ->values();

        if ($indispensables->isEmpty()) {
            return;
        }

        foreach ($indispensables as $criterion) {
            $query->whereHas('langues', function (Builder $languageQuery) use ($criterion) {
                $languageQuery->where('langue_id', $criterion['id']);

                $requiredLevelId = (int) ($criterion['metadata']['niveau_langue_id'] ?? 0);

                if ($requiredLevelId > 0) {
                    $languageQuery->where('niveau_langue_id', '>=', $requiredLevelId);
                }
            });
        }
    }

    /**
     * Way 2: hard filters using columns already on the candidats table.
     * Each criterion is optional: a `null` value skips the corresponding filter.
     */
    private function applyProfileHardFilters(Builder $query, MatchingCriteria $criteria): void
    {
        if ($criteria->posteId !== null) {
            $query->where('candidats.poste_id', $criteria->posteId);
        }

        if ($criteria->niveauExperienceId !== null) {
            $query->where('candidats.niveau_experience_id', $criteria->niveauExperienceId);
        }

        if ($criteria->formationJuridiqueId !== null) {
            $query->whereNotNull('candidats.formation_juridique_id')
                ->where('candidats.formation_juridique_id', '>=', $criteria->formationJuridiqueId);
        }

        if ($criteria->salaireId !== null) {
            $query->where('candidats.salaire_id', $criteria->salaireId);
        }

        if ($criteria->villeId !== null) {
            $query->whereHas('villeTravails', function (Builder $villeQuery) use ($criteria) {
                $villeQuery->where('ville_id', $criteria->villeId);
            });
        }

        if ($criteria->typeTravailId !== null) {
            $query->whereHas('typeTravails', function (Builder $typeQuery) use ($criteria) {
                $typeQuery->where('type_travail_id', $criteria->typeTravailId);
            });
        }

        if ($criteria->modeTravailId !== null) {
            $query->whereHas('modeTravails', function (Builder $modeQuery) use ($criteria) {
                $modeQuery->where('mode_travail_id', $criteria->modeTravailId);
            });
        }
    }
}

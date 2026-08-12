<?php

namespace App\Services\CandidateMatching;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereMultiple;
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
     * @return Collection<int, Candidat>
     */
    public function getMatches(Offre $offre): Collection
    {
        $offre->loadMissing('criteresMultiples');

        $query = Candidat::query()
            ->where('candidats.status', 'accepte')
            ->whereHas('user', fn (Builder $userQuery) => $userQuery->where('is_active', true));

        $this->applyIndispensableLanguageFilter($query, $offre);
        $this->applyProfileHardFilters($query, $offre);

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
            ->map(function (Candidat $candidat) use ($offre) {
                $breakdown = $this->scorer->score($candidat, $offre);
                $candidat->setAttribute('matching_score', $breakdown['score']);
                $candidat->setAttribute('matching_breakdown', $breakdown);

                return $candidat;
            })
            ->sortByDesc('matching_score')
            ->values();
    }

    /**
     * Way 1: if the offer has indispensable languages, keep only candidates
     * who satisfy ALL of them (language + minimum level).
     */
    private function applyIndispensableLanguageFilter(Builder $query, Offre $offre): void
    {
        $indispensables = $this->languageCriteria($offre)
            ->filter(fn (OffreCritereMultiple $criterion) => ($criterion->metadata['importance'] ?? '') === 'indispensable')
            ->values();

        if ($indispensables->isEmpty()) {
            return;
        }

        foreach ($indispensables as $criterion) {
            $query->whereHas('langues', function (Builder $languageQuery) use ($criterion) {
                $languageQuery->where('langue_id', $criterion->critere_id);

                $requiredLevelId = (int) ($criterion->metadata['niveau_langue_id'] ?? 0);

                if ($requiredLevelId > 0) {
                    $languageQuery->where('niveau_langue_id', '>=', $requiredLevelId);
                }
            });
        }
    }

    /**
     * Way 2: hard filters using columns already on the candidats table.
     */
    private function applyProfileHardFilters(Builder $query, Offre $offre): void
    {
        $query->where('candidats.poste_id', $offre->poste_id)
            ->where('candidats.niveau_experience_id', $offre->niveau_experience_id);

        if ($offre->formation_juridique_id !== null) {
            $query->whereNotNull('candidats.formation_juridique_id')
                ->where('candidats.formation_juridique_id', '>=', $offre->formation_juridique_id);
        }

        if ($offre->salaire_id !== null) {
            $query->where('candidats.salaire_id', $offre->salaire_id);
        }
    }

    /**
     * @return Collection<int, OffreCritereMultiple>
     */
    private function languageCriteria(Offre $offre): Collection
    {
        return $offre->criteresMultiples
            ->where('type_critere', 'LANGUE')
            ->values();
    }
}

<?php

namespace App\Services\CandidateMatching;

use App\Models\Candidat\Candidat;
use Illuminate\Support\Collection;

class MatchScorer
{
    public const BASE_SCORE = 100;

    public const SPECIALISATION_PENALTY = 5;

    /**
     * @var array<string, int>
     */
    public const LANGUAGE_PENALTIES = [
        'important' => 4,
        'souhaitable' => 2,
        'facultatif' => 0,
    ];

    /**
     * @return array{score: int, language_bonus: int, language_penalty: int, specialisation_penalty: int}
     */
    public function score(Candidat $candidat, MatchingCriteria $criteria): array
    {
        $languageCriteria = $criteria->languages();
        $specialisationCriteria = $criteria->specialisations();

        $languageBonus = $this->languageLevelBonus($candidat, $languageCriteria);
        $languagePenalty = $this->languagePenalty($candidat, $languageCriteria);
        $specialisationPenalty = $this->specialisationPenalty($candidat, $specialisationCriteria);

        return [
            'score' => self::BASE_SCORE + $languageBonus - $languagePenalty - $specialisationPenalty,
            'language_bonus' => $languageBonus,
            'language_penalty' => $languagePenalty,
            'specialisation_penalty' => $specialisationPenalty,
        ];
    }

    /**
     * @param  Collection<int, array{type: string, id: int, metadata: array<string, mixed>}>  $languageCriteria
     */
    private function languageLevelBonus(Candidat $candidat, Collection $languageCriteria): int
    {
        $bonus = 0;

        foreach ($languageCriteria as $criterion) {
            $candidateLanguage = $candidat->langues->firstWhere('langue_id', $criterion['id']);

            if ($candidateLanguage === null) {
                continue;
            }

            $requiredLevelId = (int) ($criterion['metadata']['niveau_langue_id'] ?? 0);
            $candidateLevelId = (int) $candidateLanguage->niveau_langue_id;

            if ($requiredLevelId > 0 && $candidateLevelId < $requiredLevelId) {
                continue;
            }

            // Prefer higher language levels among otherwise equal candidates.
            $bonus += ($candidateLevelId - $requiredLevelId);
        }

        return $bonus;
    }

    /**
     * Soft penalties for non-indispensable language misses / under-level.
     *
     * @param  Collection<int, array{type: string, id: int, metadata: array<string, mixed>}>  $languageCriteria
     */
    private function languagePenalty(Candidat $candidat, Collection $languageCriteria): int
    {
        $penalty = 0;

        foreach ($languageCriteria as $criterion) {
            $importance = $criterion['metadata']['importance'] ?? 'facultatif';

            if ($importance === 'indispensable') {
                continue;
            }

            if ($this->meetsLanguageRequirement($candidat, $criterion)) {
                continue;
            }

            $penalty += self::LANGUAGE_PENALTIES[$importance] ?? self::LANGUAGE_PENALTIES['facultatif'];
        }

        return $penalty;
    }

    /**
     * @param  Collection<int, array{type: string, id: int, metadata: array<string, mixed>}>  $specialisationCriteria
     */
    private function specialisationPenalty(Candidat $candidat, Collection $specialisationCriteria): int
    {
        if ($specialisationCriteria->isEmpty()) {
            return 0;
        }

        $candidateSpecialisationIds = $candidat->specialisations
            ->pluck('specialisation_id')
            ->all();

        $missingCount = $specialisationCriteria
            ->pluck('id')
            ->reject(fn (int|string $id) => in_array($id, $candidateSpecialisationIds, false))
            ->count();

        return $missingCount * self::SPECIALISATION_PENALTY;
    }

    /**
     * @param  array{type: string, id: int, metadata: array<string, mixed>}  $criterion
     */
    private function meetsLanguageRequirement(Candidat $candidat, array $criterion): bool
    {
        $candidateLanguage = $candidat->langues->firstWhere('langue_id', $criterion['id']);

        if ($candidateLanguage === null) {
            return false;
        }

        $requiredLevelId = (int) ($criterion['metadata']['niveau_langue_id'] ?? 0);

        if ($requiredLevelId <= 0) {
            return true;
        }

        return (int) $candidateLanguage->niveau_langue_id >= $requiredLevelId;
    }
}

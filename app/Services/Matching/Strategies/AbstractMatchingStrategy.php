<?php

namespace App\Services\Matching\Strategies;

use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereGroupe;
use App\Services\Matching\Contracts\MatchingStrategy;
use Illuminate\Database\Eloquent\Builder;

abstract class AbstractMatchingStrategy implements MatchingStrategy
{
    /**
     * Default weights for importance levels (Indispensable, Important, Souhaitable, Facultatif).
     *
     * @var array<string, int>
     */
    protected array $weights = [
        'indispensable' => 100,
        'important' => 50,
        'souhaitable' => 20,
        'facultatif' => 10,
    ];

    /**
     * {@inheritDoc}
     */
    abstract public function apply(Builder $query, Offre $offre): Builder;

    /**
     * {@inheritDoc}
     */
    abstract public function getScoreSubquery(Offre $offre): string;

    /**
     * {@inheritDoc}
     */
    abstract public function getScoreAlias(): string;

    /**
     * {@inheritDoc}
     */
    abstract public function getMaxScore(Offre $offre): int;

    /**
     * Get the numeric weight for a given importance level.
     */
    protected function getWeight(string $importance): int
    {
        return $this->weights[$importance] ?? 0;
    }

    /**
     * {@inheritDoc}
     */
    public function isActive(Offre $offre): bool
    {
        $group = $this->getGroupForType($offre, $this->getStrategyType());

        return $group !== null && $group->criteres->isNotEmpty();
    }

    /**
     * Get the strategy type (to be defined by concrete classes).
     */
    abstract protected function getStrategyType(): string;

    /**
     * Helper to retrieve the criteria group for a specific type.
     */
    protected function getGroupForType(Offre $offre, string $type): ?OffreCritereGroupe
    {
        return $offre->critereGroupes
            ->where('type_critere', $type)
            ->first();
    }

    /**
     * Build filters for indispensable criteria based on group operator (AND/OR).
     *
     * @param  Builder  $query  The candidate query.
     * @param  OffreCritereGroupe  $group  The criteria group.
     * @param  string  $pivotTable  The name of the candidate pivot table.
     * @param  string  $pivotColumn  The name of the foreign key column in the pivot table.
     */
    protected function applyIndispensableFilter(
        Builder $query,
        OffreCritereGroupe $group,
        string $pivotTable,
        string $pivotColumn
    ): Builder {
        $indispensables = $group->criteres->where('importance', 'indispensable');

        if ($indispensables->isEmpty()) {
            return $query;
        }

        $ids = $indispensables->pluck('critere_id')->toArray();

        // AND Login: Candidate must possess ALL requested indispensable criteria.
        if ($group->operateur === 'AND') {
            return $query->whereIn('candidats.id', function ($q) use ($pivotTable, $pivotColumn, $ids) {
                $q->select('candidat_id')
                    ->from($pivotTable)
                    ->whereIn($pivotColumn, $ids)
                    ->groupBy('candidat_id')
                    ->havingRaw("COUNT(DISTINCT $pivotColumn) = ?", [count($ids)]);
            });
        }

        // OR Logic: Candidate must possess at least ONE of the requested indispensable criteria.
        return $query->whereIn('candidats.id', function ($q) use ($pivotTable, $pivotColumn, $ids) {
            $q->select('candidat_id')
                ->from($pivotTable)
                ->whereIn($pivotColumn, $ids);
        });
    }
}

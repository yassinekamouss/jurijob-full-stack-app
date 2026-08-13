<?php

namespace App\Services\Offre;

use App\Enums\OffreStatut;
use App\Models\Offre\Offre;
use InvalidArgumentException;
use RuntimeException;

class OffreStatusTransition
{
    public const ACTOR_ADMIN = 'admin';

    public const ACTOR_RECRUTEUR = 'recruteur';

    /**
     * Attributes allowed to be mass-assigned alongside the status.
     *
     * @var array<int, string>
     */
    private const ALLOWED_ATTRIBUTES = ['payment_reference'];

    /**
     * @var array<string, array<string, list<string>>>
     */
    private const TRANSITIONS = [
        self::ACTOR_ADMIN => [
            OffreStatut::EnTraitement->value => [
                OffreStatut::AttentePaiement->value,
                OffreStatut::Archive->value,
            ],
            OffreStatut::AttentePaiement->value => [OffreStatut::Archive->value , OffreStatut::EnTraitement->value],
            OffreStatut::VerificationPaiement->value => [
                OffreStatut::CvEnvoyes->value,
                OffreStatut::AttentePaiement->value,
                OffreStatut::Archive->value,
            ],
            OffreStatut::CvEnvoyes->value => [OffreStatut::Archive->value],
        ],
        self::ACTOR_RECRUTEUR => [
            OffreStatut::AttentePaiement->value => [OffreStatut::VerificationPaiement->value],
        ],
    ];

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function transition(Offre $offre, OffreStatut $to, string $actor, array $attributes = []): Offre
    {
        $from = OffreStatut::tryFrom((string) $offre->statut);

        if ($from === null) {
            throw new RuntimeException("Statut d'offre invalide : {$offre->statut}");
        }

        if (! $this->canTransition($from, $to, $actor)) {
            throw new InvalidArgumentException(
                "Transition interdite de {$from->value} vers {$to->value} pour {$actor}."
            );
        }

        $allowedAttributes = array_intersect_key($attributes, array_flip(self::ALLOWED_ATTRIBUTES));

        $offre->update([
            ...$allowedAttributes,
            'statut' => $to->value,
        ]);

        return $offre->refresh();
    }

    public function canTransition(OffreStatut $from, OffreStatut $to, string $actor): bool
    {
        $allowed = self::TRANSITIONS[$actor][$from->value] ?? [];

        return in_array($to->value, $allowed, true);
    }

    public function assertCanTransition(Offre $offre, OffreStatut $to, string $actor): void
    {
        $from = OffreStatut::tryFrom((string) $offre->statut);

        if ($from === null || ! $this->canTransition($from, $to, $actor)) {
            throw new InvalidArgumentException(
                "Transition interdite de {$offre->statut} vers {$to->value} pour {$actor}."
            );
        }
    }
}

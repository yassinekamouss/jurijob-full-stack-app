<?php

namespace App\Enums;

enum OffreStatut: string
{
    case EnTraitement = 'EN_TRAITEMENT';
    case AttentePaiement = 'ATTENTE_PAIEMENT';
    case VerificationPaiement = 'VERIFICATION_PAIEMENT';
    case CvEnvoyes = 'CV_ENVOYES';
    case Archive = 'ARCHIVE';

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function allowsRecruiterDeletion(): bool
    {
        return $this === self::EnTraitement;
    }
}

<?php

namespace App\Policies;

use App\Models\Candidat\CandidatDomainExperience;
use App\Models\User;

class CandidatDomainExperiencePolicy
{
    public function update(User $user, CandidatDomainExperience $candidatDomainExperience): bool
    {
        return $user->candidat->id === $candidatDomainExperience->candidat_id;
    }

    public function delete(User $user, CandidatDomainExperience $candidatDomainExperience): bool
    {
        return $user->candidat->id === $candidatDomainExperience->candidat_id;
    }
}

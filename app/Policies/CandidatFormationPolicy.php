<?php

namespace App\Policies;

use App\Models\Candidat\CandidatFormation;
use App\Models\User;

class CandidatFormationPolicy
{
    public function update(User $user, CandidatFormation $formation): bool
    {
        return $user->id === $formation->candidat->user_id;
    }

    public function delete(User $user, CandidatFormation $formation): bool
    {
        return $user->id === $formation->candidat->user_id;
    }
}

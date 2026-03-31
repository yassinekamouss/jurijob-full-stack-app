<?php

namespace App\Policies;

use App\Models\Candidat\CandidatFormation;
use App\Models\User;

class CandidatFormationPolicy
{
    /**
     * Determine whether the user can view the candidat formation file.
     */
    public function view(User $user, CandidatFormation $candidatFormation): bool
    {
        return $user->role === 'admin' || $user->id === $candidatFormation->candidat->user_id;
    }

    public function update(User $user, CandidatFormation $formation): bool
    {
        return $user->id === $formation->candidat->user_id;
    }

    public function delete(User $user, CandidatFormation $formation): bool
    {
        return $user->id === $formation->candidat->user_id;
    }
}

<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Candidat\CandidatFormation;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class CandidatFormationPolicy
{
    /**
     * Determine whether the user can view the candidat formation file.
     */
    public function view(Authenticatable $user, CandidatFormation $candidatFormation): bool
    {
        if ($user instanceof Admin) {
            return true;
        }

        if ($user instanceof User) {
            return $user->role === 'admin' || $user->id === $candidatFormation->candidat->user_id;
        }

        return false;
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

<?php

namespace App\Policies;

use App\Models\Candidat\Candidat;
use App\Models\User;

class CandidatPolicy
{
    /**
     * Determine whether the user can view the candidate's private files.
     */
    public function view(User $user, Candidat $candidat): bool
    {
        return $user->role === 'admin' || $user->id === $candidat->user_id;
    }
}

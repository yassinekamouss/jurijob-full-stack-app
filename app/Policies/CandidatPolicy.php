<?php

namespace App\Policies;

use App\Models\Admin;
use App\Models\Candidat\Candidat;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class CandidatPolicy
{
    /**
     * Determine whether the user can view the candidate's private files.
     */
    public function view(Authenticatable $user, Candidat $candidat): bool
    {
        if ($user instanceof Admin) {
            return true;
        }

        if ($user instanceof User) {
            return $user->role === 'admin' || $user->id === $candidat->user_id;
        }

        return false;
    }
}

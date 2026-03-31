<?php

namespace App\Policies;

use App\Models\Candidat\CandidatSpecialisation;
use App\Models\User;

class CandidatSpecialisationPolicy
{
    public function view(User $user, CandidatSpecialisation $specialisation): bool
    {
        return $user->id === $specialisation->candidat->user_id;
    }

    public function update(User $user, CandidatSpecialisation $specialisation): bool
    {
        return $user->id === $specialisation->candidat->user_id;
    }

    public function delete(User $user, CandidatSpecialisation $specialisation): bool
    {
        return $user->id === $specialisation->candidat->user_id;
    }
}

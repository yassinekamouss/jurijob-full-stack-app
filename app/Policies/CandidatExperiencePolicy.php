<?php

namespace App\Policies;

use App\Models\CandidatExperience;
use App\Models\User;

class CandidatExperiencePolicy
{
    public function view(User $user, CandidatExperience $experience): bool
    {
        return $user->id === $experience->candidat->user_id;
    }

    public function update(User $user, CandidatExperience $experience): bool
    {
        return $user->id === $experience->candidat->user_id;
    }

    public function delete(User $user, CandidatExperience $experience): bool
    {
        return $user->id === $experience->candidat->user_id;
    }
}

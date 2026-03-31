<?php

namespace App\Policies;

use App\Models\Candidat\CandidatLangue;
use App\Models\User;

class CandidatLanguePolicy
{
    public function view(User $user, CandidatLangue $langue): bool
    {
        return $user->id === $langue->candidat->user_id;
    }

    public function update(User $user, CandidatLangue $langue): bool
    {
        return $user->id === $langue->candidat->user_id;
    }

    public function delete(User $user, CandidatLangue $langue): bool
    {
        return $user->id === $langue->candidat->user_id;
    }
}

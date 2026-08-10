<?php

namespace App\Policies;

use App\Models\Offre\Offre;
use App\Models\User;

class OffrePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->recruteur()->exists();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Offre $offre): bool
    {
        return $user->recruteur()->exists() && $user->recruteur->id === $offre->recruteur_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->recruteur()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Offre $offre): bool
    {
        return $user->recruteur()->exists() && $user->recruteur->id === $offre->recruteur_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Offre $offre): bool
    {
        return $user->recruteur()->exists() && $user->recruteur->id === $offre->recruteur_id;
    }
}

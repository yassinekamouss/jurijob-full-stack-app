<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Contracts\Auth\MustVerifyEmail;

use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Models\Candidat\Candidat;
use App\Models\Recruteur\Recruteur;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'telephone',
        'email',
        'password',
        'role',
        'is_active',
        'is_archived',
    ];

    protected $hidden = [
        'password',
        'remember_token', // Sécurité standard
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_active' => 'boolean',
            'is_archived' => 'boolean',
            // Optionnel : on peut ajouter le cast pour la date de confirmation si besoin
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function recruteur(): HasOne
    {
        return $this->hasOne(Recruteur::class);
    }

    public function candidat(): HasOne
    {
        return $this->hasOne(Candidat::class);
    }
}
<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

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
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_active' => 'boolean',
            'is_archived' => 'boolean',
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'telephone',
        'email',
        'password',
        'image_url',
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

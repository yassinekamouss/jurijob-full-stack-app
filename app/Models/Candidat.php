<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Candidat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom',
        'prenom',
        'poste_recherche',
        'niveau_experience',
        'formation_juridique',
        'image_url',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function specialisations(): HasMany
    {
        return $this->hasMany(CandidatSpecialisation::class);
    }

    public function domainExperiences(): HasMany
    {
        return $this->hasMany(CandidatDomainExperience::class);
    }

    public function langues(): HasMany
    {
        return $this->hasMany(CandidatLangue::class);
    }

    public function typeTravails(): HasMany
    {
        return $this->hasMany(CandidatTypeTravail::class);
    }

    public function modeTravails(): HasMany
    {
        return $this->hasMany(CandidatModeTravail::class);
    }

    public function villeTravails(): HasMany
    {
        return $this->hasMany(CandidatVilleTravail::class);
    }

    public function formations(): HasMany
    {
        return $this->hasMany(CandidatFormation::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(CandidatExperience::class);
    }
}

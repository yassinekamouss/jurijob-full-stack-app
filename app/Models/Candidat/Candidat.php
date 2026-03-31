<?php

namespace App\Models\Candidat;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

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

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::updating(function ($candidat) {
            if ($candidat->isDirty('image_url') && $candidat->getOriginal('image_url')) {
                Storage::disk('private')->delete($candidat->getOriginal('image_url'));
            }
        });

        static::deleting(function ($candidat) {
            if ($candidat->image_url) {
                Storage::disk('private')->delete($candidat->image_url);
            }
        });
    }
}

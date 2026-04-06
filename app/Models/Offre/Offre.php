<?php

namespace App\Models\Offre;

use App\Models\Recruteur\Recruteur;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\TypeTravail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offre extends Model
{
    use HasFactory;

    protected $fillable = [
        'recruteur_id',
        'poste_id',
        'type_travail_id',
        'niveau_experience_id',
        'titre',
        'description',
        'statut',
    ];

    public function recruteur(): BelongsTo
    {
        return $this->belongsTo(Recruteur::class);
    }

    public function poste(): BelongsTo
    {
        return $this->belongsTo(Poste::class);
    }

    public function typeTravail(): BelongsTo
    {
        return $this->belongsTo(TypeTravail::class);
    }

    public function modeTravailRequirements(): HasMany
    {
        return $this->hasMany(OffreModeTravail::class);
    }

    public function langueRequirements(): HasMany
    {
        return $this->hasMany(OffreLangue::class);
    }

    public function specialisationRequirements(): HasMany
    {
        return $this->hasMany(OffreSpecialisation::class);
    }

    public function villeRequirements(): HasMany
    {
        return $this->hasMany(OffreVille::class);
    }

    public function formationJuridiqueRequirements(): HasMany
    {
        return $this->hasMany(OffreFormationsJuridique::class);
    }

    public function domainExperienceRequirements(): HasMany
    {
        return $this->hasMany(OffreDomainExperience::class);
    }
}

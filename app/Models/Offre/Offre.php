<?php

namespace App\Models\Offre;

use App\Models\Recruteur\Recruteur;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Ville;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Offre extends Model
{
    use HasFactory;

    protected $fillable = [
        'recruteur_id',
        'poste_id',
        'type_travail_id',
        'mode_travail_id',
        'ville_id',
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

    public function modeTravail(): BelongsTo
    {
        return $this->belongsTo(ModeTravail::class);
    }

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class);
    }

    public function niveauExperience(): BelongsTo
    {
        return $this->belongsTo(NiveauExperience::class);
    }

    /**
     * Groupes de critères (Logique par type : AND/OR)
     */
    public function critereGroupes(): HasMany
    {
        return $this->hasMany(OffreCritereGroupe::class);
    }

    /**
     * Tous les critères de l'offre à travers les groupes.
     */
    public function criteres(): HasManyThrough
    {
        return $this->hasManyThrough(OffreCritere::class, OffreCritereGroupe::class, 'offre_id', 'groupe_id');
    }
}

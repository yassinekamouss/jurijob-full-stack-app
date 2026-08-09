<?php

namespace App\Models\Offre;

use App\Models\Recruteur\Recruteur;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Salaire;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Urgence;
use App\Models\Taxonomy\Ville;
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
        'mode_travail_id',
        'ville_id',
        'niveau_experience_id',
        'formation_juridique_id',
        'salaire_id',
        'urgence_id',
        'titre',
        'description',
        'notes_complementaires',
        'nombre_cv',
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

    public function formationJuridique(): BelongsTo
    {
        return $this->belongsTo(FormationJuridique::class);
    }

    public function salaire(): BelongsTo
    {
        return $this->belongsTo(Salaire::class);
    }

    public function urgence(): BelongsTo
    {
        return $this->belongsTo(Urgence::class);
    }

    /**
     * Multiple-choice criteria (Langues and Spécialisations).
     */
    public function criteresMultiples(): HasMany
    {
        return $this->hasMany(OffreCritereMultiple::class);
    }
}

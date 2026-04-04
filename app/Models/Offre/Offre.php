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

    public function requirements(): HasMany
    {
        return $this->hasMany(OffreRequirement::class);
    }
}

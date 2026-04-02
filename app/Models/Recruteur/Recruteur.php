<?php

namespace App\Models\Recruteur;


use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recruteur extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom_entreprise',
        'poste',
        'type_organisation_id',
        'taille_entreprise_id',
        'site_web',
        'ville_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function typeOrganisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Taxonomy\TypeOrganisation::class);
    }

    public function tailleEntreprise(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Taxonomy\TailleEntreprise::class);
    }

    public function ville(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Taxonomy\Ville::class);
    }
}

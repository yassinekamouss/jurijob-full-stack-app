<?php

namespace App\Models;

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
        'type_organisation',
        'taille_entreprise',
        'site_web',
        'ville',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

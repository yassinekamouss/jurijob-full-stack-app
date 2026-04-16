<?php

namespace App\Models\Offre;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreCritere extends Model
{
    use HasFactory;

    protected $fillable = [
        'groupe_id',
        'critere_id',
        'valeur_id',
        'importance',
    ];

    public function groupe(): BelongsTo
    {
        return $this->belongsTo(OffreCritereGroupe::class, 'groupe_id');
    }
}

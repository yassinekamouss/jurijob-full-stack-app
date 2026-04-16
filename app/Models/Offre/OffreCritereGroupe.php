<?php

namespace App\Models\Offre;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OffreCritereGroupe extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'type_critere',
        'operateur',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function criteres(): HasMany
    {
        return $this->hasMany(OffreCritere::class, 'groupe_id');
    }
}

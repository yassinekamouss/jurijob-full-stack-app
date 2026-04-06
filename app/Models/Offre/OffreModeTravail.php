<?php

namespace App\Models\Offre;

use App\Models\Taxonomy\ModeTravail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreModeTravail extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'mode_travail_id',
        'importance',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function modeTravail(): BelongsTo
    {
        return $this->belongsTo(ModeTravail::class);
    }
}

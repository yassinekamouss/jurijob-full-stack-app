<?php

namespace App\Models\Offre;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class OffreRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'taxonomy_id',
        'taxonomy_type',
        'importance',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    /**
     * Get the parent taxonomy model (Polymorphic).
     */
    public function taxonomy(): MorphTo
    {
        return $this->morphTo();
    }
}

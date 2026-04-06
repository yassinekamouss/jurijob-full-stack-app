<?php

namespace App\Models\Offre;

use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauLangue;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreLangue extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'langue_id',
        'niveau_langue_id',
        'importance',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function langue(): BelongsTo
    {
        return $this->belongsTo(Langue::class);
    }

    public function niveauLangue(): BelongsTo
    {
        return $this->belongsTo(NiveauLangue::class);
    }
}

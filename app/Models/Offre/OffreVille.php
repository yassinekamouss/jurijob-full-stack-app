<?php

namespace App\Models\Offre;

use App\Models\Taxonomy\Ville;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreVille extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'ville_id',
        'importance',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class);
    }
}

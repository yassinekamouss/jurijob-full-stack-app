<?php

namespace App\Models\Offre;

use App\Models\Taxonomy\FormationJuridique;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreFormationsJuridique extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'formation_juridique_id',
        'importance',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function formationJuridique(): BelongsTo
    {
        return $this->belongsTo(FormationJuridique::class);
    }
}

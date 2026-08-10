<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Specialisation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatFormation extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'annee_debut',
        'annee_fin',
        'specialisation_id',
        'formation_juridique_id',
        'ecole_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function specialisation(): BelongsTo
    {
        return $this->belongsTo(Specialisation::class);
    }

    public function formationJuridique(): BelongsTo
    {
        return $this->belongsTo(FormationJuridique::class);
    }

    public function ecole(): BelongsTo
    {
        return $this->belongsTo(Ecole::class);
    }
}

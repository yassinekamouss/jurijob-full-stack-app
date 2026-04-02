<?php

namespace App\Models\Candidat;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

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
        'diploma_file',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function specialisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Taxonomy\Specialisation::class);
    }

    public function formationJuridique(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Taxonomy\FormationJuridique::class);
    }

    public function ecole(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Taxonomy\Ecole::class);
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::updating(function ($formation) {
            if ($formation->isDirty('diploma_file') && $formation->getOriginal('diploma_file')) {
                Storage::disk('private')->delete($formation->getOriginal('diploma_file'));
            }
        });

        static::deleting(function ($formation) {
            if ($formation->diploma_file) {
                Storage::disk('private')->delete($formation->diploma_file);
            }
        });
    }
}

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
        'niveau',
        'domaine',
        'ecole',
        'diploma_file',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
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

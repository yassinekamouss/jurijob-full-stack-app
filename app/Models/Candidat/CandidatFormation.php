<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Specialisation;
use Database\Factories\CandidatFormationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CandidatFormation extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return CandidatFormationFactory::new();
    }

    protected $fillable = [
        'candidat_id',
        'annee_debut',
        'annee_fin',
        'specialisation_id',
        'formation_juridique_id',
        'ecole_id',
        'autre_ecole',
        'diploma_file',
    ];

    protected $hidden = [
        'diploma_file',
    ];

    protected $appends = [
        'has_diploma',
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

    public function getHasDiplomaAttribute(): bool
    {
        return filled($this->diploma_file);
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::saved(function (CandidatFormation $formation): void {
            if ($formation->wasChanged('diploma_file')) {
                static::deleteDiplomaFile((string) $formation->getOriginal('diploma_file'));
            }
        });

        static::deleting(function (CandidatFormation $formation): void {
            static::deleteDiplomaFile((string) $formation->diploma_file);
        });
    }

    /**
     * Delete a stored diploma file from the private disk.
     *
     * Only files within the dedicated directory are eligible, which prevents
     * any path-traversal attempt from removing arbitrary storage files.
     */
    protected static function deleteDiplomaFile(string $path): void
    {
        if ($path === '' || ! Str::startsWith($path, 'candidat_diplomas/')) {
            return;
        }

        Storage::disk('private')->delete($path);
    }
}

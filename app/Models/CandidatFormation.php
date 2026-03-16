<?php

namespace App\Models;

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
        'niveau',
        'domaine',
        'ecole',
        'diploma_file',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }
}

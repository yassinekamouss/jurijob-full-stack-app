<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\TypeTravail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'debut',
        'fin',
        'type_travail_id',
        'entreprise',
        'poste_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function poste(): BelongsTo
    {
        return $this->belongsTo(Poste::class);
    }

    public function typeTravail(): BelongsTo
    {
        return $this->belongsTo(TypeTravail::class);
    }
}

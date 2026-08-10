<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\TypeTravail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatTypeTravail extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'type_travail_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function typeTravail(): BelongsTo
    {
        return $this->belongsTo(TypeTravail::class);
    }
}

<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\ModeTravail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatModeTravail extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'mode_travail_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function modeTravail(): BelongsTo
    {
        return $this->belongsTo(ModeTravail::class);
    }
}

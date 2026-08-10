<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\Ville;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatVilleTravail extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'ville_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class);
    }
}

<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauLangue;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatLangue extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'langue_id',
        'niveau_langue_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function langue(): BelongsTo
    {
        return $this->belongsTo(Langue::class);
    }

    public function niveauLangue(): BelongsTo
    {
        return $this->belongsTo(NiveauLangue::class);
    }
}

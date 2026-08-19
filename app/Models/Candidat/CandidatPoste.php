<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\Poste;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatPoste extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
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
}

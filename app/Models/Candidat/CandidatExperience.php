<?php

namespace App\Models\Candidat;

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
        'type_experience_id',
        'entreprise',
        'poste_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }
}

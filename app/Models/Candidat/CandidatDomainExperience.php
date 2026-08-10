<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\DomaineExperience;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatDomainExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'domaine_experience_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function domaineExperience(): BelongsTo
    {
        return $this->belongsTo(DomaineExperience::class);
    }
}

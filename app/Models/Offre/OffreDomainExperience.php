<?php

namespace App\Models\Offre;

use App\Models\Taxonomy\DomaineExperience;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreDomainExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'domaine_experience_id',
        'importance',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function domaineExperience(): BelongsTo
    {
        return $this->belongsTo(DomaineExperience::class);
    }
}

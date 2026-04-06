<?php

namespace App\Models\Offre;

use App\Models\Taxonomy\Specialisation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreSpecialisation extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'specialisation_id',
        'importance',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function specialisation(): BelongsTo
    {
        return $this->belongsTo(Specialisation::class);
    }
}

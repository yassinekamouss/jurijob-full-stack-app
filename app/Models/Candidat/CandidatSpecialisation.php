<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\Specialisation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidatSpecialisation extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'specialisation_id',
    ];

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }

    public function specialisation(): BelongsTo
    {
        return $this->belongsTo(Specialisation::class);
    }
}

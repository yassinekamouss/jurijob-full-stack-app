<?php

namespace App\Models\Offre;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreCritereMultiple extends Model
{
    protected $table = 'offre_criteres_multiples';

    protected $fillable = [
        'offre_id',
        'type_critere',
        'critere_id',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }
}

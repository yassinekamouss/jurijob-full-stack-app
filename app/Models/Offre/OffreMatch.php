<?php

namespace App\Models\Offre;

use App\Models\Candidat\Candidat;
use Database\Factories\OffreMatchFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OffreMatch extends Model
{
    /** @use HasFactory<OffreMatchFactory> */
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'candidat_id',
        'score',
    ];

    protected static function newFactory(): OffreMatchFactory
    {
        return OffreMatchFactory::new();
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'score' => 'integer',
        ];
    }

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    public function candidat(): BelongsTo
    {
        return $this->belongsTo(Candidat::class);
    }
}

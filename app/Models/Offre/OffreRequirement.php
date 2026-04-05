<?php

namespace App\Models\Offre;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class OffreRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'taxonomy_id',
        'taxonomy_type',
        'importance',
        'requirements_data',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'requirements_data' => 'array',
        ];
    }

    /**
     * Helper to guarantee that requirements_data returns always an array [].
     */
    protected function requirementsData(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ? json_decode($value, true) : [],
        );
    }

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }

    /**
     * Get the parent taxonomy model (Polymorphic).
     */
    public function taxonomy(): MorphTo
    {
        return $this->morphTo();
    }
}

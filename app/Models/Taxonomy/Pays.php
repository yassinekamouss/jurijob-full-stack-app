<?php

namespace App\Models\Taxonomy;

use App\Models\Taxonomy\Concerns\HasLocalizedTaxonomyLabel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pays extends Model
{
    use HasLocalizedTaxonomyLabel;

    protected $table = 'pays';

    public $timestamps = false;

    protected $fillable = [
        'code',
        'nom_fr',
        'nom_en',
    ];

    /**
     * @return HasMany<Ville, $this>
     */
    public function villes(): HasMany
    {
        return $this->hasMany(Ville::class);
    }
}

<?php

namespace App\Models\Taxonomy;

use App\Models\Taxonomy\Concerns\HasLocalizedTaxonomyLabel;
use Illuminate\Database\Eloquent\Model;

class NiveauLangue extends Model
{
    use HasLocalizedTaxonomyLabel;

    public $timestamps = false;

    protected $fillable = [
        'nom_fr',
        'nom_en',
    ];
}

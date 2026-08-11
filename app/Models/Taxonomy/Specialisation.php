<?php

namespace App\Models\Taxonomy;

use App\Models\Taxonomy\Concerns\HasLocalizedTaxonomyDomaine;
use App\Models\Taxonomy\Concerns\HasLocalizedTaxonomyLabel;
use Illuminate\Database\Eloquent\Model;

class Specialisation extends Model
{
    use HasLocalizedTaxonomyDomaine;
    use HasLocalizedTaxonomyLabel;

    public $timestamps = false;

    protected $fillable = [
        'nom_fr',
        'nom_en',
        'domaine_fr',
        'domaine_en',
    ];
}

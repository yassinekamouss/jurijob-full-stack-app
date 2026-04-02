<?php

namespace App\Models\Taxonomy;

use Illuminate\Database\Eloquent\Model;

class DomaineExperience extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'nom',
    ];
}

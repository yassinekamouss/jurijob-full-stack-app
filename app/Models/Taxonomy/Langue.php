<?php

namespace App\Models\Taxonomy;

use Illuminate\Database\Eloquent\Model;

class Langue extends Model
{
    public $timestamps = false;

        protected $fillable = [
        'nom',
    ];
}

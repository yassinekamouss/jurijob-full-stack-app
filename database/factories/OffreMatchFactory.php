<?php

namespace Database\Factories;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreMatch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OffreMatch>
 */
class OffreMatchFactory extends Factory
{
    protected $model = OffreMatch::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'offre_id' => Offre::factory(),
            'candidat_id' => Candidat::factory(),
            'score' => fake()->numberBetween(70, 110),
        ];
    }
}

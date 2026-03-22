<?php

namespace Database\Factories;

use App\Models\Candidat;
use App\Models\CandidatFormation;
use Illuminate\Database\Eloquent\Factories\Factory;

class CandidatFormationFactory extends Factory
{
    protected $model = CandidatFormation::class;

    public function definition(): array
    {
        return [
            'candidat_id' => Candidat::factory(),
            'annee_debut' => '2020',
            'annee_fin' => '2023',
            'niveau' => 'Master',
            'domaine' => 'Droit',
            'ecole' => $this->faker->company(),
        ];
    }
}

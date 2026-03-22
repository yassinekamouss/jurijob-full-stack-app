<?php

namespace Database\Factories;

use App\Models\Candidat;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CandidatFactory extends Factory
{
    protected $model = Candidat::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'poste_recherche' => $this->faker->jobTitle(),
            'niveau_experience' => 'Junior',
            'formation_juridique' => $this->faker->sentence(),
        ];
    }
}

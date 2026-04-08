<?php

namespace Database\Factories;

use App\Models\Candidat\Candidat;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\Poste;
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
            'poste_id' => Poste::inRandomOrder()->first()?->id ?? Poste::factory(),
            'niveau_experience_id' => NiveauExperience::inRandomOrder()->first()?->id ?? NiveauExperience::factory(),
            'formation_juridique_id' => FormationJuridique::inRandomOrder()->first()?->id ?? FormationJuridique::factory(),
        ];
    }
}

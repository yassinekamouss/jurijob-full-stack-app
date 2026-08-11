<?php

namespace Database\Factories;

use App\Models\Candidat\Candidat;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Salaire;
use App\Models\Taxonomy\Urgence;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CandidatFactory extends Factory
{
    protected $model = Candidat::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'status' => 'en_attente',
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'poste_id' => Poste::firstOrCreate(['nom' => 'Avocat'])->id,
            'niveau_experience_id' => NiveauExperience::firstOrCreate(['nom' => 'Junior'])->id,
            'formation_juridique_id' => FormationJuridique::firstOrCreate(['nom' => 'Master'])->id,
            'salaire_id' => Salaire::firstOrCreate(['nom' => '8 000 – 12 000 MAD/mois'])->id,
            'urgence_id' => Urgence::firstOrCreate(['nom' => 'Normal (2–4 sem.)', 'code' => 'normal'])->id,
        ];
    }

    public function enAttente(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'en_attente',
        ]);
    }

    public function accepte(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'accepte',
        ]);
    }

    public function refuse(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'refuse',
        ]);
    }

    public function archive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'archive',
        ]);
    }
}

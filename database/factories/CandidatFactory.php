<?php

namespace Database\Factories;

use App\Models\Candidat\Candidat;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\NiveauExperience;
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
            'niveau_experience_id' => NiveauExperience::firstOrCreate(
                ['nom_fr' => 'Junior'],
                ['nom_en' => 'Junior']
            )->id,
            'formation_juridique_id' => FormationJuridique::firstOrCreate(
                ['nom_fr' => 'Master'],
                ['nom_en' => 'Master']
            )->id,
            'salaire_id' => Salaire::firstOrCreate(
                ['nom_fr' => '8 000 – 12 000 MAD/mois'],
                ['nom_en' => '8,000 – 12,000 MAD/month']
            )->id,
            'urgence_id' => Urgence::firstOrCreate(
                ['code' => 'normal'],
                ['nom_fr' => 'Normal (2–4 sem.)', 'nom_en' => 'Normal (2–4 weeks)']
            )->id,
        ];
    }

    public function withPoste(int $posteId): static
    {
        return $this->afterCreating(function (Candidat $candidat) use ($posteId) {
            $candidat->postes()->create(['poste_id' => $posteId]);
        });
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

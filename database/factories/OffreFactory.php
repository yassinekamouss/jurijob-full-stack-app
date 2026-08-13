<?php

namespace Database\Factories;

use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\Pays;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Ville;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Offre>
 */
class OffreFactory extends Factory
{
    protected $model = Offre::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pays = Pays::query()->firstOrCreate(
            ['code' => 'MA'],
            ['nom_fr' => 'Maroc', 'nom_en' => 'Morocco']
        );

        return [
            'recruteur_id' => Recruteur::factory(),
            'poste_id' => Poste::query()->firstOrCreate(
                ['nom_fr' => 'Avocat'],
                ['nom_en' => 'Lawyer']
            )->id,
            'type_travail_id' => TypeTravail::query()->firstOrCreate(
                ['nom_fr' => 'CDI'],
                ['nom_en' => 'Permanent']
            )->id,
            'mode_travail_id' => ModeTravail::query()->firstOrCreate(
                ['nom_fr' => 'Présentiel'],
                ['nom_en' => 'On-site']
            )->id,
            'ville_id' => Ville::query()->firstOrCreate(
                ['nom_fr' => 'Casablanca'],
                ['nom_en' => 'Casablanca', 'pays_id' => $pays->id]
            )->id,
            'niveau_experience_id' => NiveauExperience::query()->firstOrCreate(
                ['nom_fr' => 'Junior'],
                ['nom_en' => 'Junior']
            )->id,
            'titre' => fake()->jobTitle(),
            'description' => fake()->paragraphs(2, true),
            'nombre_cv' => fake()->numberBetween(1, 5),
            'statut' => 'EN_TRAITEMENT',
        ];
    }

    public function enTraitement(): static
    {
        return $this->state(fn (array $attributes) => [
            'statut' => 'OffreStatut::EnTraitement->value',
        ]);
    }

    public function attentePaiement(): static
    {
        return $this->state(fn (array $attributes) => [
            'statut' => 'OffreStatut::AttentePaiement->value',
        ]);
    }

    public function verificationPaiement(): static
    {
        return $this->state(fn (array $attributes) => [
            'statut' => 'OffreStatut::VerificationPaiement->value',
        ]);
    }

    public function cvEnvoyes(): static
    {
        return $this->state(fn (array $attributes) => [
            'statut' => 'OffreStatut::CvEnvoyes->value',
        ]);
    }
}

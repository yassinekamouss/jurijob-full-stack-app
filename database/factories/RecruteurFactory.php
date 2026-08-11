<?php

namespace Database\Factories;

use App\Models\Recruteur\Recruteur;
use App\Models\Taxonomy\Pays;
use App\Models\Taxonomy\TailleEntreprise;
use App\Models\Taxonomy\TypeOrganisation;
use App\Models\Taxonomy\Ville;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Recruteur>
 */
class RecruteurFactory extends Factory
{
    protected $model = Recruteur::class;

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
            'user_id' => User::factory()->state(['role' => 'recruteur']),
            'nom_entreprise' => fake()->company(),
            'poste' => fake()->jobTitle(),
            'type_organisation_id' => TypeOrganisation::query()->firstOrCreate(
                ['nom_fr' => 'Cabinet'],
                ['nom_en' => 'Firm']
            )->id,
            'taille_entreprise_id' => TailleEntreprise::query()->firstOrCreate(
                ['nom_fr' => '1-10'],
                ['nom_en' => '1-10']
            )->id,
            'site_web' => fake()->optional()->url(),
            'ville_id' => Ville::query()->firstOrCreate(
                ['nom_fr' => 'Casablanca'],
                ['nom_en' => 'Casablanca', 'pays_id' => $pays->id]
            )->id,
        ];
    }
}

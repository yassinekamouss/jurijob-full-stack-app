<?php

namespace Database\Seeders;

use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\Ville;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OffreTestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if a recruteur exists, if not create one.
        $recruteurId = DB::table('recruteurs')->first()?->id;

        if (! $recruteurId) {
            $userId = DB::table('users')->insertGetId([
                'telephone' => '0600000000',
                'email' => 'recruteur@jurijob.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'role' => 'recruteur',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $recruteurId = DB::table('recruteurs')->insertGetId([
                'user_id' => $userId,
                'nom_entreprise' => 'Cabinet d\'Avocats Test',
                'type_organisation_id' => DB::table('type_organisations')->first()->id ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 1. Get Taxonomy IDs
        $posteIds = DB::table('postes')->pluck('id')->toArray();
        $typeIds = DB::table('type_travails')->pluck('id')->toArray();
        $modeIds = DB::table('mode_travails')->pluck('id')->toArray();
        $villeIds = Ville::pluck('id')->toArray();
        $niveauIds = DB::table('niveau_experiences')->pluck('id')->toArray();

        $specIds = Specialisation::pluck('id')->toArray();
        $langueIds = Langue::pluck('id')->toArray();
        $niveauLangueIds = NiveauLangue::pluck('id')->toArray();
        $formationIds = DB::table('formation_juridiques')->pluck('id')->toArray();
        $salaireIds = DB::table('salaires')->pluck('id')->toArray();
        $urgenceIds = DB::table('urgences')->pluck('id')->toArray();

        if (empty($posteIds) || empty($typeIds) || empty($modeIds)) {
            $this->command->warn('Taxonomies are empty. Please run TaxonomySeeder first.');

            return;
        }

        $importances = ['indispensable', 'important', 'souhaitable', 'facultatif'];

        $this->command->info('Seeding 50 offers for recruiter '.$recruteurId.'...');

        for ($i = 0; $i < 50; $i++) {
            $modeId = $modeIds[array_rand($modeIds)];
            $villeId = ($modeId == 2) ? null : (! empty($villeIds) ? $villeIds[array_rand($villeIds)] : null); // 2 is Remote

            $posteId = $posteIds[array_rand($posteIds)];
            $posteNom = DB::table('postes')->where('id', $posteId)->value('nom_fr');

            $offreId = DB::table('offres')->insertGetId([
                'recruteur_id' => $recruteurId,
                'poste_id' => $posteId,
                'type_travail_id' => $typeIds[array_rand($typeIds)],
                'mode_travail_id' => $modeId,
                'ville_id' => $villeId,
                'niveau_experience_id' => $niveauIds[array_rand($niveauIds)],
                'formation_juridique_id' => ! empty($formationIds) ? (rand(0, 1) ? $formationIds[array_rand($formationIds)] : null) : null,
                'salaire_id' => ! empty($salaireIds) ? (rand(0, 1) ? $salaireIds[array_rand($salaireIds)] : null) : null,
                'urgence_id' => ! empty($urgenceIds) ? $urgenceIds[array_rand($urgenceIds)] : null,
                'titre' => $posteNom.' '.fake()->jobTitle().' ('.fake()->city().')',
                'description' => fake()->paragraphs(3, true),
                'notes_complementaires' => rand(0, 1) ? fake()->sentence() : null,
                'nombre_cv' => rand(1, 5),
                'statut' => 'EN_TRAITEMENT',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Add Critere Multiples (Langues and Specialisations)
            $types = ['SPECIALISATION', 'LANGUE'];

            foreach ($types as $type) {
                if (rand(0, 1) === 0) {
                    continue;
                } // Randomly skip some criteria

                $availableIds = match ($type) {
                    'SPECIALISATION' => $specIds,
                    'LANGUE' => $langueIds,
                };

                if (empty($availableIds)) {
                    continue;
                }

                $count = min(count($availableIds), rand(1, 3));
                $randomKeys = (array) array_rand($availableIds, $count);

                foreach ($randomKeys as $key) {
                    $critId = $availableIds[$key];
                    $metadata = [
                        'importance' => $importances[array_rand($importances)],
                    ];

                    if ($type === 'LANGUE' && ! empty($niveauLangueIds)) {
                        $metadata['niveau_langue_id'] = $niveauLangueIds[array_rand($niveauLangueIds)];
                    }

                    try {
                        DB::table('offre_criteres_multiples')->insert([
                            'offre_id' => $offreId,
                            'type_critere' => $type,
                            'critere_id' => $critId,
                            'metadata' => json_encode($metadata),
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    } catch (\Exception $e) {
                        // Ignore duplicate entry errors
                    }
                }
            }
        }

        $this->command->info('Offers seeded successfully!');
    }
}

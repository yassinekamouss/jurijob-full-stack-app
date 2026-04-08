<?php

namespace Database\Seeders;

use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Ville;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LargeCandidatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Get Taxonomy IDs
        $specialisationIds = Specialisation::pluck('id')->toArray();
        $villeIds = Ville::pluck('id')->toArray();
        $modeTravailIds = ModeTravail::pluck('id')->toArray();
        $typeTravailIds = TypeTravail::pluck('id')->toArray();
        $posteIds = DB::table('postes')->pluck('id')->toArray();
        $niveauIds = DB::table('niveau_experiences')->pluck('id')->toArray();
        $formationIds = DB::table('formation_juridiques')->pluck('id')->toArray();
        $domainIds = DB::table('domaine_experiences')->pluck('id')->toArray();
        $langueIds = Langue::pluck('id')->toArray();
        $niveauLangueIds = NiveauLangue::pluck('id')->toArray();

        if (empty($specialisationIds) || empty($villeIds)) {
            $this->command->warn('Taxonomies are empty. Please run TaxonomySeeder first.');

            return;
        }

        $total = 10000;
        $batchSize = 250; // Smaller batch size for more complex relations
        $password = Hash::make('password');

        $this->command->info("Seeding $total candidates...");

        for ($i = 0; $i < $total; $i += $batchSize) {
            DB::transaction(function () use (
                $batchSize,
                $password,
                $specialisationIds,
                $villeIds,
                $modeTravailIds,
                $typeTravailIds,
                $posteIds,
                $niveauIds,
                $formationIds,
                $domainIds,
                $langueIds,
                $niveauLangueIds
            ) {
                $pivotData = [
                    'specialisations' => [],
                    'villes' => [],
                    'modes' => [],
                    'types' => [],
                    'domains' => [],
                    'langues' => [],
                ];

                for ($j = 0; $j < $batchSize; $j++) {
                    $userId = DB::table('users')->insertGetId([
                        'telephone' => fake()->phoneNumber(),
                        'email' => Str::random(10).'_'.fake()->unique()->safeEmail(),
                        'password' => $password,
                        'role' => 'candidat',
                        'is_active' => true,
                        'is_archived' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $candidateId = DB::table('candidats')->insertGetId([
                        'user_id' => $userId,
                        'nom' => fake()->lastName(),
                        'prenom' => fake()->firstName(),
                        'poste_id' => ! empty($posteIds) ? $posteIds[array_rand($posteIds)] : null,
                        'niveau_experience_id' => ! empty($niveauIds) ? $niveauIds[array_rand($niveauIds)] : null,
                        'formation_juridique_id' => ! empty($formationIds) ? $formationIds[array_rand($formationIds)] : null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    // Random 1-3 specialisations
                    $randomSpecs = (array) array_rand(array_flip($specialisationIds), rand(1, 3));
                    foreach ($randomSpecs as $specId) {
                        $pivotData['specialisations'][] = [
                            'candidat_id' => $candidateId,
                            'specialisation_id' => $specId,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    // Random 1-2 villes
                    $randomVilles = (array) array_rand(array_flip($villeIds), rand(1, 2));
                    foreach ($randomVilles as $villeId) {
                        $pivotData['villes'][] = [
                            'candidat_id' => $candidateId,
                            'ville_id' => $villeId,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    // Random 1 mode
                    if (! empty($modeTravailIds)) {
                        $pivotData['modes'][] = [
                            'candidat_id' => $candidateId,
                            'mode_travail_id' => $modeTravailIds[array_rand($modeTravailIds)],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    // Random 1 type
                    if (! empty($typeTravailIds)) {
                        $pivotData['types'][] = [
                            'candidat_id' => $candidateId,
                            'type_travail_id' => $typeTravailIds[array_rand($typeTravailIds)],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    // Random 1-2 domains
                    if (! empty($domainIds)) {
                        $randomDomains = (array) array_rand(array_flip($domainIds), rand(1, 2));
                        foreach ($randomDomains as $domainId) {
                            $pivotData['domains'][] = [
                                'candidat_id' => $candidateId,
                                'domaine_experience_id' => $domainId,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                    }

                    // Random 1-2 languages
                    if (! empty($langueIds)) {
                        $randomLangues = (array) array_rand(array_flip($langueIds), rand(1, 2));
                        foreach ($randomLangues as $langueId) {
                            $pivotData['langues'][] = [
                                'candidat_id' => $candidateId,
                                'langue_id' => $langueId,
                                'niveau_langue_id' => ! empty($niveauLangueIds) ? $niveauLangueIds[array_rand($niveauLangueIds)] : null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                    }
                }

                // Bulk insert pivot data
                DB::table('candidat_specialisations')->insert($pivotData['specialisations']);
                DB::table('candidat_ville_travails')->insert($pivotData['villes']);
                DB::table('candidat_mode_travails')->insert($pivotData['modes']);
                DB::table('candidat_type_travails')->insert($pivotData['types']);
                DB::table('candidat_domain_experiences')->insert($pivotData['domains']);
                DB::table('candidat_langues')->insert($pivotData['langues']);
            });

            $this->command->info('Processed '.($i + $batchSize).' candidates...');
        }

        $this->command->info('Done!');
    }
}

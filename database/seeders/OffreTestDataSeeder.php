<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Taxonomy\Ville;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauLangue;

class OffreTestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recruteurId = 1;
        
        // 1. Get Taxonomy IDs
        $posteIds = DB::table('postes')->pluck('id')->toArray();
        $typeIds = DB::table('type_travails')->pluck('id')->toArray();
        $modeIds = DB::table('mode_travails')->pluck('id')->toArray();
        $villeIds = Ville::pluck('id')->toArray();
        $niveauIds = DB::table('niveau_experiences')->pluck('id')->toArray();
        
        $specIds = Specialisation::pluck('id')->toArray();
        $langueIds = Langue::pluck('id')->toArray();
        $niveauLangueIds = NiveauLangue::pluck('id')->toArray();
        $domainIds = DB::table('domaine_experiences')->pluck('id')->toArray();
        $formationIds = DB::table('formation_juridiques')->pluck('id')->toArray();

        $importances = ['indispensable', 'important', 'souhaitable', 'facultatif'];
        $operators = ['AND', 'OR'];

        $this->command->info('Seeding 50 offers for recruiter 1...');

        for ($i = 0; $i < 50; $i++) {
            $modeId = $modeIds[array_rand($modeIds)];
            $villeId = ($modeId == 2) ? null : $villeIds[array_rand($villeIds)]; // 2 is Remote

            $posteId = $posteIds[array_rand($posteIds)];
            $posteNom = DB::table('postes')->where('id', $posteId)->value('nom');
            
            $offreId = DB::table('offres')->insertGetId([
                'recruteur_id' => $recruteurId,
                'poste_id' => $posteId,
                'type_travail_id' => $typeIds[array_rand($typeIds)],
                'mode_travail_id' => $modeId,
                'ville_id' => $villeId,
                'niveau_experience_id' => $niveauIds[array_rand($niveauIds)],
                'titre' => $posteNom . ' ' . fake()->jobTitle() . ' (' . fake()->city() . ')',
                'description' => fake()->paragraphs(3, true),
                'statut' => 'ouvert',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Add Critere Groups
            $types = ['specialisation', 'langue', 'domaine_experience', 'formation_juridique'];
            shuffle($types);
            $selectedTypes = array_slice($types, 0, rand(2, 4));

            foreach ($selectedTypes as $type) {
                $groupeId = DB::table('offre_critere_groupes')->insertGetId([
                    'offre_id' => $offreId,
                    'type_critere' => $type,
                    'operateur' => $operators[array_rand($operators)],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Add 1-3 criteria per group
                $availableIds = match($type) {
                    'specialisation' => $specIds,
                    'langue' => $langueIds,
                    'domaine_experience' => $domainIds,
                    'formation_juridique' => $formationIds,
                };

                if (empty($availableIds)) continue;

                $count = min(count($availableIds), rand(1, 3));
                $randomKeys = (array) array_rand($availableIds, $count);
                
                foreach ($randomKeys as $key) {
                    $critId = $availableIds[$key];
                    $valeurId = ($type === 'langue') ? $niveauLangueIds[array_rand($niveauLangueIds)] : null;

                    DB::table('offre_criteres')->insert([
                        'groupe_id' => $groupeId,
                        'critere_id' => $critId,
                        'valeur_id' => $valeurId,
                        'importance' => $importances[array_rand($importances)],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        $this->command->info('Offers seeded successfully!');
    }
}

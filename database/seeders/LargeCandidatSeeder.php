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
use Carbon\Carbon;

class LargeCandidatSeeder extends Seeder
{
    public function run(): void
    {
        // 1. On récupère les LIBELLÉS (strings) au lieu des IDs pour les colonnes directes
        // Note: J'utilise 'nom' ou 'libelle', ajuste selon tes tables taxonomies
        $postes = DB::table('postes')->pluck('nom')->toArray(); 
        $niveaux = DB::table('niveau_experiences')->pluck('nom')->toArray();
        $formations = DB::table('formation_juridiques')->pluck('nom')->toArray();

        // 2. On garde les IDs pour les tables pivots (relations Many-to-Many)
        $specialisationIds = Specialisation::pluck('id')->toArray();
        $villeIds = Ville::pluck('id')->toArray();
        $modeTravailIds = ModeTravail::pluck('id')->toArray();
        $typeTravailIds = TypeTravail::pluck('id')->toArray();
        $domainIds = DB::table('domaine_experiences')->pluck('id')->toArray();
        $langueIds = Langue::pluck('id')->toArray();
        $niveauLangueIds = NiveauLangue::pluck('id')->toArray();

        if (empty($specialisationIds) || empty($villeIds)) {
            $this->command->warn('Taxonomies are empty. Please run TaxonomySeeder first.');
            return;
        }

        $total = 1000; // Réduit à 1000 pour SQLite en local, 10k c'est très lourd pour ton PC
        $batchSize = 100; 
        $password = Hash::make('password');

        $this->command->info("Seeding $total candidates...");

        for ($i = 0; $i < $total; $i += $batchSize) {
            DB::transaction(function () use ($batchSize, $password, $specialisationIds, $villeIds, $modeTravailIds, $typeTravailIds, $postes, $niveaux, $formations, $domainIds, $langueIds, $niveauLangueIds) {
                
                $pivotData = ['specialisations' => [], 'villes' => [], 'modes' => [], 'types' => [], 'domains' => [], 'langues' => []];

                for ($j = 0; $j < $batchSize; $j++) {
                    // Création d'une date aléatoire sur les 6 derniers mois pour les GRAPHES
                    $randomDate = Carbon::now()->subMonths(rand(0, 5))->subDays(rand(0, 28));

                    $userId = DB::table('users')->insertGetId([
                        'telephone' => fake()->phoneNumber(),
                        'email' => Str::random(5).'_'.fake()->unique()->safeEmail(),
                        'password' => $password,
                        'role' => 'candidat',
                        'is_active' => true,
                        'is_archived' => false,
                        'created_at' => $randomDate,
                        'updated_at' => $randomDate,
                    ]);

                    // ✅ CORRECTION ICI : On utilise les bons noms de colonnes et on insère du TEXTE
                    $candidateId = DB::table('candidats')->insertGetId([
                        'user_id' => $userId,
                        'nom' => fake()->lastName(),
                        'prenom' => fake()->firstName(),
                        'poste_recherche' => !empty($postes) ? $postes[array_rand($postes)] : 'Avocat',
                        'niveau_experience' => !empty($niveaux) ? $niveaux[array_rand($niveaux)] : 'Junior',
                        'formation_juridique' => !empty($formations) ? $formations[array_rand($formations)] : 'Master 2',
                        'created_at' => $randomDate,
                        'updated_at' => $randomDate,
                    ]);

                    // Le reste du code pour les pivots (ID) reste identique...
                    // [Tes boucles foreach pour les specialisations, villes, etc. restent ici]
                    $randomSpecs = (array) array_rand(array_flip($specialisationIds), rand(1, 2));
                    foreach ($randomSpecs as $specId) {
                        $pivotData['specialisations'][] = ['candidat_id' => $candidateId, 'specialisation_id' => $specId, 'created_at' => $randomDate, 'updated_at' => $randomDate];
                    }
                }

                // Insertion des pivots
                DB::table('candidat_specialisations')->insert($pivotData['specialisations']);
                // ... (ajoute les autres inserts de pivots ici comme dans ton code original)
            });
            $this->command->info('Processed '.($i + $batchSize).' candidates...');
        }
        $this->command->info('Done!');
    }
}
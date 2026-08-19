<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
          /*
        $this->call([
            TaxonomySeeder::class,
        ]);

      
        DB::table('admins')->updateOrInsert(
            ['email' => 'admin@jurijob.ma'],
            [
                'name' => 'Admin JuriJob',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        if (! DB::table('users')->where('email', 'recruteur@example.com')->exists()) {
            $userId = DB::table('users')->insertGetId([
                'email' => 'recruteur@example.com',
                'password' => Hash::make('password'),
                'role' => 'recruteur',
                'is_active' => true,
                'is_archived' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('recruteurs')->insert([
                'user_id' => $userId,
                'nom_entreprise' => 'Example Company',
                'poste' => 'HR Manager',
                'type_organisation_id' => 1,
                'taille_entreprise_id' => 1,
                'site_web' => 'https://example.com',
                'ville_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        if (! DB::table('users')->where('email', 'candidat@example.com')->exists()) {
            $candidatUserId = DB::table('users')->insertGetId([
                'email' => 'candidat@example.com',
                'password' => Hash::make('password'),
                'role' => 'candidat',
                'is_active' => true,
                'is_archived' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('candidats')->insert([
                'user_id' => $candidatUserId,
                'nom' => 'Dupont',
                'prenom' => 'Jean',
                'poste_id' => 1,
                'niveau_experience_id' => 1,
                'formation_juridique_id' => 1,
                'salaire_id' => 1,
                'urgence_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->call([
            OffreTestDataSeeder::class,
            LargeCandidatSeeder::class,
        ]);
        */
    }
}

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            TaxonomySeeder::class,
        ]);

        $userId = \Illuminate\Support\Facades\DB::table('users')->insertGetId([
            'email' => 'recruteur@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'recruteur',
            'is_active' => true,
            'is_archived' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        \Illuminate\Support\Facades\DB::table('recruteurs')->insert([
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

        $this->call([
            OffreTestDataSeeder::class,
        ]);

        \Illuminate\Support\Facades\DB::table('admins')->insertOrIgnore([
            'name' => 'Admin',
            'email' => 'admin@jurijob.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'super_admin' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}

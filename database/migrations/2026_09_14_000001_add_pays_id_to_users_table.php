<?php

use App\Models\Taxonomy\Pays;
use App\Models\User;
use App\Repositories\TaxonomyRepository;
use App\Services\PhoneCountryResolver;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Safely add missing countries directly without running any seeder
        $missingCountries = [
            ['code' => 'TD', 'nom_fr' => 'Tchad', 'nom_en' => 'Chad'],
            ['code' => 'NE', 'nom_fr' => 'Niger', 'nom_en' => 'Niger'],
            ['code' => 'BE', 'nom_fr' => 'Belgique', 'nom_en' => 'Belgium'],
            ['code' => 'CH', 'nom_fr' => 'Suisse', 'nom_en' => 'Switzerland'],
            ['code' => 'CA', 'nom_fr' => 'Canada', 'nom_en' => 'Canada'],
            ['code' => 'ES', 'nom_fr' => 'Espagne', 'nom_en' => 'Spain'],
            ['code' => 'DJ', 'nom_fr' => 'Djibouti', 'nom_en' => 'Djibouti'],
            ['code' => 'KM', 'nom_fr' => 'Comores', 'nom_en' => 'Comoros'],
            ['code' => 'LY', 'nom_fr' => 'Libye', 'nom_en' => 'Libya'],
        ];

        foreach ($missingCountries as $country) {
            Pays::firstOrCreate(['code' => $country['code']], $country);
        }

        TaxonomyRepository::clearCache();
        PhoneCountryResolver::resetCache();

        // 2. Add pays_id column to users table
        if (! Schema::hasColumn('users', 'pays_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->foreignId('pays_id')
                    ->nullable()
                    ->after('telephone')
                    ->constrained('pays')
                    ->nullOnDelete();
            });
        }

        // 3. Backfill all existing users with resolved country (never leave NULL)
        User::query()->select(['id', 'telephone'])->chunkById(100, function ($users) {
            foreach ($users as $user) {
                $paysId = PhoneCountryResolver::resolveId($user->telephone);

                DB::table('users')
                    ->where('id', $user->id)
                    ->update(['pays_id' => $paysId]);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'pays_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['pays_id']);
                $table->dropColumn('pays_id');
            });
        }
    }
};

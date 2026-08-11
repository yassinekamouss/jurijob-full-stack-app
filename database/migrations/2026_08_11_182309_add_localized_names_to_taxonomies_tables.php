<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * @var list<string>
     */
    private array $tables = [
        'niveau_experiences',
        'niveau_langues',
        'formation_juridiques',
        'ecoles',
        'langues',
        'type_travails',
        'villes',
        'mode_travails',
        'postes',
        'type_organisations',
        'taille_entreprises',
        'salaires',
        'urgences',
        'specialisations',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach ($this->tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->renameColumn('nom', 'nom_fr');
            });

            Schema::table($tableName, function (Blueprint $table) {
                $table->string('nom_en')->default('')->after('nom_fr');
            });

            DB::table($tableName)->update([
                'nom_en' => DB::raw('nom_fr'),
            ]);
        }

        Schema::table('specialisations', function (Blueprint $table) {
            $table->renameColumn('domaine', 'domaine_fr');
        });

        Schema::table('specialisations', function (Blueprint $table) {
            $table->string('domaine_en')->nullable()->after('domaine_fr');
        });

        DB::table('specialisations')->update([
            'domaine_en' => DB::raw('domaine_fr'),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('specialisations', function (Blueprint $table) {
            $table->dropColumn('domaine_en');
        });

        Schema::table('specialisations', function (Blueprint $table) {
            $table->renameColumn('domaine_fr', 'domaine');
        });

        foreach ($this->tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropColumn('nom_en');
            });

            Schema::table($tableName, function (Blueprint $table) {
                $table->renameColumn('nom_fr', 'nom');
            });
        }
    }
};

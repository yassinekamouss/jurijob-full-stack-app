<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected array $tables = [
        'domaine_experiences',
        'ecoles',
        'formation_juridiques',
        'langues',
        'mode_travails',
        'niveau_experiences',
        'niveau_langues',
        'postes',
        'specialisations',
        'taille_entreprises',
        'type_organisations',
        'type_travails',
        'villes',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropTimestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->timestamps();
            });
        }
    }
};

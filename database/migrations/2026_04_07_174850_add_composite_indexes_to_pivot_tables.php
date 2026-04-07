<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('candidat_specialisations', function (Blueprint $table) {
            $table->index(['candidat_id', 'specialisation_id'], 'idx_candidat_specialisation');
        });

        Schema::table('candidat_langues', function (Blueprint $table) {
            $table->index(['candidat_id', 'langue_id'], 'idx_candidat_langue');
        });

        Schema::table('candidat_ville_travails', function (Blueprint $table) {
            $table->index(['candidat_id', 'ville_id'], 'idx_candidat_ville');
        });

        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->index(['candidat_id', 'formation_juridique_id'], 'idx_candidat_formation');
        });

        Schema::table('candidat_domain_experiences', function (Blueprint $table) {
            $table->index(['candidat_id', 'domaine_experience_id'], 'idx_candidat_domaine');
        });

        Schema::table('candidat_mode_travails', function (Blueprint $table) {
            $table->index(['candidat_id', 'mode_travail_id'], 'idx_candidat_mode');
        });

        Schema::table('candidat_type_travails', function (Blueprint $table) {
            $table->index(['candidat_id', 'type_travail_id'], 'idx_candidat_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('candidat_specialisations', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_specialisation');
        });

        Schema::table('candidat_langues', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_langue');
        });

        Schema::table('candidat_ville_travails', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_ville');
        });

        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_formation');
        });

        Schema::table('candidat_domain_experiences', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_domaine');
        });

        Schema::table('candidat_mode_travails', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_mode');
        });

        Schema::table('candidat_type_travails', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_type');
        });
    }

};

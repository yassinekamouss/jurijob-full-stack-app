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
            $table->index(['specialisation_id', 'candidat_id'], 'idx_can_specialisation');
        });

        Schema::table('candidat_domain_experiences', function (Blueprint $table) {
            $table->index(['domaine_experience_id', 'candidat_id'], 'idx_can_domain_exp');
        });

        Schema::table('candidat_langues', function (Blueprint $table) {
            $table->index(['langue_id', 'niveau_langue_id', 'candidat_id'], 'idx_can_langue');
        });

        Schema::table('candidat_type_travails', function (Blueprint $table) {
            $table->index(['type_travail_id', 'candidat_id'], 'idx_can_type_travail');
        });

        Schema::table('candidat_mode_travails', function (Blueprint $table) {
            $table->index(['mode_travail_id', 'candidat_id'], 'idx_can_mode_travail');
        });

        Schema::table('candidat_ville_travails', function (Blueprint $table) {
            $table->index(['ville_id', 'candidat_id'], 'idx_can_ville_travail');
        });

        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->index(['formation_juridique_id', 'candidat_id'], 'idx_can_formation_jur');
        });

        Schema::table('candidat_experiences', function (Blueprint $table) {
            $table->index(['poste_id', 'candidat_id'], 'idx_can_poste_exp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('candidat_specialisations', function (Blueprint $table) {
            $table->dropIndex('idx_can_specialisation');
        });

        Schema::table('candidat_domain_experiences', function (Blueprint $table) {
            $table->dropIndex('idx_can_domain_exp');
        });

        Schema::table('candidat_langues', function (Blueprint $table) {
            $table->dropIndex('idx_can_langue');
        });

        Schema::table('candidat_type_travails', function (Blueprint $table) {
            $table->dropIndex('idx_can_type_travail');
        });

        Schema::table('candidat_mode_travails', function (Blueprint $table) {
            $table->dropIndex('idx_can_mode_travail');
        });

        Schema::table('candidat_ville_travails', function (Blueprint $table) {
            $table->dropIndex('idx_can_ville_travail');
        });

        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->dropIndex('idx_can_formation_jur');
        });

        Schema::table('candidat_experiences', function (Blueprint $table) {
            $table->dropIndex('idx_can_poste_exp');
        });
    }
};

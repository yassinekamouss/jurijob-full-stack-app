<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds indexes to optimize the matching service performance.
     * The matching service performs correlated subqueries and filtering across multiple pivot tables.
     * These indexes are crucial for fast performance when matching candidates to job offers.
     */
    public function up(): void
    {
        // Index for formation_juridique_id filtering in FormationMatchingStrategy
        Schema::table('candidats', function (Blueprint $table) {
            $table->index('formation_juridique_id', 'idx_candidat_formation_juridique_id');
        });

        // Index for user_id foreign key relationship
        Schema::table('candidats', function (Blueprint $table) {
            $table->index('user_id', 'idx_candidat_user_id');
        });

        // Composite indexes for pivot tables - optimized for correlated subqueries
        // These prevent full table scans when matching strategies query for candidates with specific criteria

        // candidat_type_travails: Filter by type_travail_id and check candidat_id
        Schema::table('candidat_type_travails', function (Blueprint $table) {
            $table->index(['candidat_id', 'type_travail_id'], 'idx_cand_type_travail_candidat_id');
            $table->index(['type_travail_id', 'candidat_id'], 'idx_cand_type_travail_type_id');
        });

        // candidat_domain_experiences: Used in correlated subqueries (domaine_experience_id IN (...) AND candidat_id = ...)
        Schema::table('candidat_domain_experiences', function (Blueprint $table) {
            $table->index(['candidat_id', 'domaine_experience_id'], 'idx_cand_domain_exp_candidat_id');
            $table->index(['domaine_experience_id', 'candidat_id'], 'idx_cand_domain_exp_domain_id');
        });

        // candidat_specialisations: Used in correlated subqueries (specialisation_id IN (...) AND candidat_id = ...)
        Schema::table('candidat_specialisations', function (Blueprint $table) {
            $table->index(['candidat_id', 'specialisation_id'], 'idx_cand_spec_candidat_id');
            $table->index(['specialisation_id', 'candidat_id'], 'idx_cand_spec_spec_id');
        });

        // candidat_langues: Used in correlated subqueries with both langue_id IN (...) conditions and nivel_langue_id comparisons
        Schema::table('candidat_langues', function (Blueprint $table) {
            $table->index(['candidat_id', 'langue_id'], 'idx_cand_langue_candidat_id');
            $table->index(['langue_id', 'niveau_langue_id', 'candidat_id'], 'idx_cand_langue_lang_nivel');
        });

        // candidat_ville_travails: Used in correlated subqueries (ville_id IN (...) AND candidat_id = ...)
        Schema::table('candidat_ville_travails', function (Blueprint $table) {
            $table->index(['candidat_id', 'ville_id'], 'idx_cand_ville_candidat_id');
            $table->index(['ville_id', 'candidat_id'], 'idx_cand_ville_ville_id');
        });

        // candidat_mode_travails: Used in EXISTS checks and filtering (mode_travail_id = ... AND candidat_id = ...)
        Schema::table('candidat_mode_travails', function (Blueprint $table) {
            $table->index(['candidat_id', 'mode_travail_id'], 'idx_cand_mode_candidat_id');
            $table->index(['mode_travail_id', 'candidat_id'], 'idx_cand_mode_mode_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('candidats', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_formation_juridique_id');
            $table->dropIndex('idx_candidat_user_id');
        });

        Schema::table('candidat_type_travails', function (Blueprint $table) {
            $table->dropIndex('idx_cand_type_travail_candidat_id');
            $table->dropIndex('idx_cand_type_travail_type_id');
        });

        Schema::table('candidat_domain_experiences', function (Blueprint $table) {
            $table->dropIndex('idx_cand_domain_exp_candidat_id');
            $table->dropIndex('idx_cand_domain_exp_domain_id');
        });

        Schema::table('candidat_specialisations', function (Blueprint $table) {
            $table->dropIndex('idx_cand_spec_candidat_id');
            $table->dropIndex('idx_cand_spec_spec_id');
        });

        Schema::table('candidat_langues', function (Blueprint $table) {
            $table->dropIndex('idx_cand_langue_candidat_id');
            $table->dropIndex('idx_cand_langue_lang_nivel');
        });

        Schema::table('candidat_ville_travails', function (Blueprint $table) {
            $table->dropIndex('idx_cand_ville_candidat_id');
            $table->dropIndex('idx_cand_ville_ville_id');
        });

        Schema::table('candidat_mode_travails', function (Blueprint $table) {
            $table->dropIndex('idx_cand_mode_candidat_id');
            $table->dropIndex('idx_cand_mode_mode_id');
        });
    }
};

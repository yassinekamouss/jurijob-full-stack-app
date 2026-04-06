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
        Schema::create('offre_langues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->foreignId('langue_id')->constrained('langues')->cascadeOnDelete();
            $table->foreignId('niveau_langue_id')->constrained('niveau_langues')->cascadeOnDelete();
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif']);
            $table->timestamps();
        });

        Schema::create('offre_specialisations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->foreignId('specialisation_id')->constrained('specialisations')->cascadeOnDelete();
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif'])->default('important');
            $table->timestamps();
        });

        Schema::create('offre_villes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->foreignId('ville_id')->constrained('villes')->cascadeOnDelete();
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif'])->default('important');
            $table->timestamps();
        });

        Schema::create('offre_formations_juridiques', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->foreignId('formation_juridique_id')->constrained('formation_juridiques')->cascadeOnDelete();
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif'])->default('important');
            $table->timestamps();
        });

        Schema::create('offre_domain_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->foreignId('domaine_experience_id')->constrained('domaine_experiences')->cascadeOnDelete();
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif'])->default('important');
            $table->timestamps();
        });

        Schema::create('offre_mode_travails', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->foreignId('mode_travail_id')->constrained('mode_travails')->cascadeOnDelete();
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif'])->default('important');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_langues');
        Schema::dropIfExists('offre_specialisations');
        Schema::dropIfExists('offre_villes');
        Schema::dropIfExists('offre_formations_juridiques');
        Schema::dropIfExists('offre_experiences');
    }
};

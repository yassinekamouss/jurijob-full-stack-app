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
        // 1. Suppression des anciennes tables pivots
        Schema::dropIfExists('offre_villes');
        Schema::dropIfExists('offre_specialisations');
        Schema::dropIfExists('offre_langues');
        Schema::dropIfExists('offre_formations_juridiques');
        Schema::dropIfExists('offre_domain_experiences');

        // 2. Création de la table des Groupes de Critères (Logique)
        Schema::create('offre_critere_groupes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->string('type_critere')->index(); // 'ville', 'specialisation', 'langue', etc.
            $table->enum('operateur', ['AND', 'OR'])->default('OR');
            $table->timestamps();

            $table->unique(['offre_id', 'type_critere']); // Un groupe par type de critère par offre
        });

        // 3. Création de la table des Critères (Données)
        Schema::create('offre_criteres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('groupe_id')->constrained('offre_critere_groupes')->cascadeOnDelete();
            $table->unsignedBigInteger('critere_id')->index(); // ID de la taxonomie
            $table->unsignedBigInteger('valeur_id')->nullable()->index(); // ID du niveau (pour les langues par ex)
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif'])->default('important');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_criteres');
        Schema::dropIfExists('offre_critere_groupes');
    }
};

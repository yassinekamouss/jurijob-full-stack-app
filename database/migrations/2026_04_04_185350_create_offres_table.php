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
        Schema::create('offres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruteur_id')->constrained('recruteurs')->cascadeOnDelete();
            $table->foreignId('poste_id')->constrained('postes')->cascadeOnDelete();
            $table->foreignId('type_travail_id')->constrained('type_travails')->cascadeOnDelete();
            $table->foreignId('niveau_experience_id')->constrained('niveau_experiences')->cascadeOnDelete();
            $table->string('titre');
            $table->text('description');
            $table->string('statut')->default('ouvert'); // ouvert, fermé
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offres');
    }
};

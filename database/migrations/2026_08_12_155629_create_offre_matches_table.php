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
        Schema::create('offre_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->foreignId('candidat_id')->constrained('candidats')->cascadeOnDelete();
            $table->unsignedSmallInteger('score');
            $table->timestamps();

            $table->unique(['offre_id', 'candidat_id']);
            $table->index('offre_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_matches');
    }
};

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
        Schema::table('candidats', function (Blueprint $table) {
            // Critical index for the main WHERE filtering in matching
            $table->index('poste_id', 'idx_candidat_poste_id');

            // Important index for experience level scoring in matching
            $table->index('niveau_experience_id', 'idx_candidat_niveau_experience');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('candidats', function (Blueprint $table) {
            $table->dropIndex('idx_candidat_poste_id');
            $table->dropIndex('idx_candidat_niveau_experience');
        });
    }
};

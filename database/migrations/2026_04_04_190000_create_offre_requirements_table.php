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
        Schema::create('offre_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            
            // Polymorphic taxonomy link
            $table->unsignedBigInteger('taxonomy_id');
            $table->string('taxonomy_type');
            
            $table->enum('importance', ['indispensable', 'important', 'souhaitable', 'facultatif']);
            
            $table->timestamps();

            // Index for polymorphic lookups
            $table->index(['taxonomy_type', 'taxonomy_id'], 'offre_requirements_taxonomy_index');

            // Unique constraint to prevent duplicate requirements of the same taxonomy item for one offer
            $table->unique(['offre_id', 'taxonomy_type', 'taxonomy_id'], 'offre_requirements_unique_index');
            
            // Index for matching engine performance
            $table->index(['offre_id', 'taxonomy_type'], 'offre_requirements_matching_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_requirements');
    }
};

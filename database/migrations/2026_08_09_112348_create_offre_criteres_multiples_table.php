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
        Schema::create('offre_criteres_multiples', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();

            // Type of criteria: 'LANGUE' or 'SPECIALISATION'
            $table->string('type_critere', 50);

            // ID of the selected taxonomy item (langue_id or specialisation_id)
            $table->unsignedBigInteger('critere_id');

            // JSON metadata: for langue -> {"niveau_langue_id": X, "importance": "indispensable"}
            // For specialisation -> null
            $table->json('metadata')->nullable();

            $table->timestamps();

            $table->index('offre_id');
            $table->index('type_critere');

            // Prevent adding the same criteria twice for the same offer
            $table->unique(['offre_id', 'type_critere', 'critere_id'], 'unique_offre_type_critere');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_criteres_multiples');
    }
};

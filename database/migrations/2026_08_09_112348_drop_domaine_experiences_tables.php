<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('candidat_domain_experiences');
        Schema::dropIfExists('domaine_experiences');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Intentionally not restored; domaine_experiences has been fully removed from the app.
    }
};

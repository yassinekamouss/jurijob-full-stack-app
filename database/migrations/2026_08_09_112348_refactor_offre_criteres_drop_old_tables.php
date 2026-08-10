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
        Schema::dropIfExists('offre_criteres');
        Schema::dropIfExists('offre_critere_groupes');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Old tables intentionally not restored; this is a breaking refactor.
    }
};

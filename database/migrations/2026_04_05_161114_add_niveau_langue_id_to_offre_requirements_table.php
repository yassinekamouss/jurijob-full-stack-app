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
        Schema::table('offre_requirements', function (Blueprint $table) {
            $table->foreignId('niveau_langue_id')->nullable()->after('importance')->constrained('niveau_langues')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('offre_requirements', function (Blueprint $table) {
            $table->dropConstrainedForeignId('niveau_langue_id');
        });
    }
};

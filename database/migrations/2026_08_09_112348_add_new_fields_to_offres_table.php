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
        Schema::table('offres', function (Blueprint $table) {
            $table->foreignId('formation_juridique_id')->nullable()->after('niveau_experience_id')->constrained('formation_juridiques')->nullOnDelete();
            $table->foreignId('salaire_id')->nullable()->after('formation_juridique_id')->constrained('salaires')->nullOnDelete();
            $table->foreignId('urgence_id')->nullable()->after('salaire_id')->constrained('urgences')->nullOnDelete();
            $table->text('notes_complementaires')->nullable()->after('urgence_id');
            $table->unsignedSmallInteger('nombre_cv')->default(1)->after('notes_complementaires');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('offres', function (Blueprint $table) {
            $table->dropConstrainedForeignId('formation_juridique_id');
            $table->dropConstrainedForeignId('salaire_id');
            $table->dropConstrainedForeignId('urgence_id');
            $table->dropColumn(['notes_complementaires', 'nombre_cv']);
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('candidats', function (Blueprint $table) {
            $table->foreignId('salaire_id')->nullable()->after('formation_juridique_id')->constrained('salaires')->restrictOnDelete();
            $table->foreignId('urgence_id')->nullable()->after('salaire_id')->constrained('urgences')->restrictOnDelete();
        });

        $defaultSalaireId = DB::table('salaires')->orderBy('id')->value('id');
        $defaultUrgenceId = DB::table('urgences')->orderBy('id')->value('id');

        if ($defaultSalaireId && $defaultUrgenceId) {
            DB::table('candidats')
                ->whereNull('salaire_id')
                ->update(['salaire_id' => $defaultSalaireId]);

            DB::table('candidats')
                ->whereNull('urgence_id')
                ->update(['urgence_id' => $defaultUrgenceId]);
        }

        Schema::table('candidats', function (Blueprint $table) {
            $table->foreignId('salaire_id')->nullable(false)->change();
            $table->foreignId('urgence_id')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('candidats', function (Blueprint $table) {
            $table->dropConstrainedForeignId('salaire_id');
            $table->dropConstrainedForeignId('urgence_id');
        });
    }
};

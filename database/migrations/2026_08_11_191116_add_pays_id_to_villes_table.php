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
        Schema::table('villes', function (Blueprint $table) {
            $table->foreignId('pays_id')
                ->nullable()
                ->after('id')
                ->constrained('pays')
                ->nullOnDelete();
        });

        if (DB::table('villes')->whereNull('pays_id')->exists()) {
            $marocId = DB::table('pays')->where('code', 'MA')->value('id');

            if (! $marocId) {
                $marocId = DB::table('pays')->insertGetId([
                    'code' => 'MA',
                    'nom_fr' => 'Maroc',
                    'nom_en' => 'Morocco',
                ]);
            }

            DB::table('villes')
                ->whereNull('pays_id')
                ->update(['pays_id' => $marocId]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('villes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pays_id');
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidat_postes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidat_id')->constrained('candidats')->cascadeOnDelete();
            $table->foreignId('poste_id')->constrained('postes')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['candidat_id', 'poste_id']);
        });

        // Migrate existing data: copy each candidat's single poste_id into the pivot table.
        $now = now()->toDateTimeString();
        $rows = DB::table('candidats')
            ->whereNotNull('poste_id')
            ->select('id', 'poste_id')
            ->get()
            ->map(fn ($row) => [
                'candidat_id' => $row->id,
                'poste_id' => $row->poste_id,
                'created_at' => $now,
                'updated_at' => $now,
            ])
            ->all();

        if (! empty($rows)) {
            DB::table('candidat_postes')->insert($rows);
        }

        Schema::table('candidats', function (Blueprint $table) {
            $table->dropForeign('candidats_poste_id_foreign');
            $table->dropIndex('idx_candidat_poste_id');
            $table->dropColumn('poste_id');
        });
    }

    public function down(): void
    {
        Schema::table('candidats', function (Blueprint $table) {
            $table->foreignId('poste_id')->nullable()->constrained('postes')->nullOnDelete();
            $table->index('poste_id', 'idx_candidat_poste_id');
        });

        // Restore poste_id from the pivot (first poste per candidat).
        DB::statement('
            UPDATE candidats
            JOIN candidat_postes ON candidat_postes.candidat_id = candidats.id
            SET candidats.poste_id = candidat_postes.poste_id
        ');

        Schema::dropIfExists('candidat_postes');
    }
};

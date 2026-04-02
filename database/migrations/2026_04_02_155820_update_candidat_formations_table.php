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
        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->dropColumn('niveau');
            $table->foreignId('specialisation_id')->nullable()->constrained('specialisations')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->string('niveau')->nullable();
            $table->dropForeign(['specialisation_id']);
            $table->dropColumn('specialisation_id');
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('candidat_formations', 'diploma_file')) {
            return;
        }

        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->dropColumn('diploma_file');
        });
    }

    public function down(): void
    {
        if (Schema::hasColumn('candidat_formations', 'diploma_file')) {
            return;
        }

        Schema::table('candidat_formations', function (Blueprint $table) {
            $table->string('diploma_file')->nullable();
        });
    }
};

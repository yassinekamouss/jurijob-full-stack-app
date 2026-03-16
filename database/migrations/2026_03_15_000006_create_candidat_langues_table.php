<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidat_langues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidat_id')->constrained('candidats')->cascadeOnDelete();
            $table->string('nom');
            $table->string('niveau');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidat_langues');
    }
};

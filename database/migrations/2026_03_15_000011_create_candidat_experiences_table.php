<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidat_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidat_id')->constrained('candidats')->cascadeOnDelete();
            $table->string('debut')->nullable();
            $table->string('fin')->nullable();
            $table->foreignId('type_experience_id')->nullable()->constrained('type_experiences')->nullOnDelete();
            $table->string('entreprise')->nullable();
            $table->foreignId('poste_id')->nullable()->constrained('postes')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidat_experiences');
    }
};

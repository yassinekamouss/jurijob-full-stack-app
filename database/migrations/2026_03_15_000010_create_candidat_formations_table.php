<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidat_formations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidat_id')->constrained('candidats')->cascadeOnDelete();
            $table->string('annee_debut')->nullable();
            $table->string('annee_fin')->nullable();
            $table->string('niveau');
            $table->foreignId('formation_juridique_id')->nullable()->constrained('formation_juridiques')->nullOnDelete();
            $table->foreignId('ecole_id')->nullable()->constrained('ecoles')->nullOnDelete();
            $table->string('diploma_file');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidat_formations');
    }
};

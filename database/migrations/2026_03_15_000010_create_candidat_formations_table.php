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
            $table->string('domaine');
            $table->string('ecole');
            $table->string('diploma_file');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidat_formations');
    }
};

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
        Schema::table('recruteurs', function (Blueprint $table) {
            // Drop old string columns if they exist
            if (Schema::hasColumn('recruteurs', 'type_organisation')) {
                $table->dropColumn('type_organisation');
            }
            if (Schema::hasColumn('recruteurs', 'taille_entreprise')) {
                $table->dropColumn('taille_entreprise');
            }
            if (Schema::hasColumn('recruteurs', 'ville')) {
                $table->dropColumn('ville');
            }
        });

        Schema::table('recruteurs', function (Blueprint $table) {
            // Add foreign key columns
            $table->foreignId('type_organisation_id')
                  ->nullable()
                  ->constrained('type_organisations')
                  ->cascadeOnDelete();
            
            $table->foreignId('taille_entreprise_id')
                  ->nullable()
                  ->constrained('taille_entreprises')
                  ->cascadeOnDelete();
            
            $table->foreignId('ville_id')
                  ->nullable()
                  ->constrained('villes')
                  ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recruteurs', function (Blueprint $table) {
            $table->dropForeignIdFor(\App\Models\Taxonomy\TypeOrganisation::class);
            $table->dropForeignIdFor(\App\Models\Taxonomy\TailleEntreprise::class);
            $table->dropForeignIdFor(\App\Models\Taxonomy\Ville::class);
            
            // Re-add string columns
            $table->string('type_organisation')->nullable();
            $table->string('taille_entreprise')->nullable();
            $table->string('ville')->nullable();
        });
    }
};

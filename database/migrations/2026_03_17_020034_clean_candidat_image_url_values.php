<?php

use App\Models\Candidat;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Candidat::whereNotNull('image_url')->each(function ($candidat) {
            if (str_contains($candidat->image_url, 'candidat_profiles/')) {
                $candidat->image_url = str_replace('candidat_profiles/', '', $candidat->image_url);
                $candidat->save();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

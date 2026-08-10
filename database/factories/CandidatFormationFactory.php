<?php

namespace Database\Factories;

use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatFormation;
use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Specialisation;
use Illuminate\Database\Eloquent\Factories\Factory;

class CandidatFormationFactory extends Factory
{
    protected $model = CandidatFormation::class;

    public function definition(): array
    {
        return [
            'candidat_id' => Candidat::factory(),
            'annee_debut' => '2020',
            'annee_fin' => '2023',
            'specialisation_id' => Specialisation::firstOrCreate(['nom' => 'Droit des Affaires'])->id,
            'formation_juridique_id' => FormationJuridique::firstOrCreate(['nom' => 'Master'])->id,
            'ecole_id' => Ecole::firstOrCreate(['nom' => 'Sorbonne'])->id,
            'diploma_file' => 'candidat_diplomas/diploma.pdf',
        ];
    }
}

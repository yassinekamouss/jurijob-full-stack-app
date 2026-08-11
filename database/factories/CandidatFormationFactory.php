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
            'specialisation_id' => Specialisation::firstOrCreate(
                ['nom_fr' => 'Droit des Affaires'],
                [
                    'nom_en' => 'Business Law',
                    'domaine_fr' => 'Droit privé',
                    'domaine_en' => 'Private Law',
                ]
            )->id,
            'formation_juridique_id' => FormationJuridique::firstOrCreate(
                ['nom_fr' => 'Master'],
                ['nom_en' => 'Master']
            )->id,
            'ecole_id' => Ecole::firstOrCreate(
                ['nom_fr' => 'Sorbonne'],
                ['nom_en' => 'Sorbonne']
            )->id,
            'diploma_file' => 'candidat_diplomas/diploma.pdf',
        ];
    }
}

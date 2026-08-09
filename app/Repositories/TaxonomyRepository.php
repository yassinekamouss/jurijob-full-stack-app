<?php

namespace App\Repositories;

use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Salaire;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\TailleEntreprise;
use App\Models\Taxonomy\TypeOrganisation;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Urgence;
use App\Models\Taxonomy\Ville;
use Illuminate\Support\Facades\Cache;

class TaxonomyRepository
{
    public static function getAll(): array
    {
        return Cache::rememberForever('app_taxonomies', function () {
            return [
                'ecoles' => Ecole::select('id', 'nom')->orderBy('nom')->get()->toArray(),
                'formationJuridiques' => FormationJuridique::select('id', 'nom')->get()->toArray(),
                'langues' => Langue::select('id', 'nom')->get()->toArray(),
                'modeTravails' => ModeTravail::select('id', 'nom')->get()->toArray(),
                'niveauExperiences' => NiveauExperience::select('id', 'nom')->get()->toArray(),
                'niveauLangues' => NiveauLangue::select('id', 'nom')->get()->toArray(),
                'postes' => Poste::select('id', 'nom')->orderBy('nom')->get()->toArray(),
                'salaires' => Salaire::select('id', 'nom')->get()->toArray(),
                'specialisations' => Specialisation::select('id', 'nom', 'domaine')->orderBy('domaine')->orderBy('nom')->get()->toArray(),
                'tailleEntreprises' => TailleEntreprise::select('id', 'nom')->get()->toArray(),
                'typeOrganisations' => TypeOrganisation::select('id', 'nom')->get()->toArray(),
                'typeTravails' => TypeTravail::select('id', 'nom')->get()->toArray(),
                'urgences' => Urgence::select('id', 'nom', 'code')->get()->toArray(),
                'villes' => Ville::select('id', 'nom')->orderBy('nom')->get()->toArray(),
            ];
        });
    }

    public static function clearCache(): void
    {
        Cache::forget('app_taxonomies');
    }
}

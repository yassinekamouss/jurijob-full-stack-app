<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;

class TaxonomyRepository
{
    public static function getAll(): array
    {
        return Cache::rememberForever('app_taxonomies', function () {
            return [
                'domaineExperiences' => \App\Models\Taxonomy\DomaineExperience::select('id', 'nom')->get()->toArray(),
                'ecoles' => \App\Models\Taxonomy\Ecole::select('id', 'nom')->orderBy('nom')->get()->toArray(),
                'formationJuridiques' => \App\Models\Taxonomy\FormationJuridique::select('id', 'nom')->get()->toArray(),
                'langues' => \App\Models\Taxonomy\Langue::select('id', 'nom')->get()->toArray(),
                'modeTravails' => \App\Models\Taxonomy\ModeTravail::select('id', 'nom')->get()->toArray(),
                'niveauExperiences' => \App\Models\Taxonomy\NiveauExperience::select('id', 'nom')->get()->toArray(),
                'niveauLangues' => \App\Models\Taxonomy\NiveauLangue::select('id', 'nom')->get()->toArray(),
                'postes' => \App\Models\Taxonomy\Poste::select('id', 'nom')->orderBy('nom')->get()->toArray(),
                'specialisations' => \App\Models\Taxonomy\Specialisation::select('id', 'nom')->orderBy('nom')->get()->toArray(),
                'tailleEntreprises' => \App\Models\Taxonomy\TailleEntreprise::select('id', 'nom')->get()->toArray(),
                'typeOrganisations' => \App\Models\Taxonomy\TypeOrganisation::select('id', 'nom')->get()->toArray(),
                'typeTravails' => \App\Models\Taxonomy\TypeTravail::select('id', 'nom')->get()->toArray(),
                'villes' => \App\Models\Taxonomy\Ville::select('id', 'nom')->orderBy('nom')->get()->toArray(),
            ];
        });
    }

    public static function clearCache(): void
    {
        Cache::forget('app_taxonomies');
    }
}

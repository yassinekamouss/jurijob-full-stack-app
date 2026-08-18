<?php

namespace App\Repositories;

use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Pays;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Salaire;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\TailleEntreprise;
use App\Models\Taxonomy\TypeOrganisation;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Urgence;
use App\Models\Taxonomy\Ville;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class TaxonomyRepository
{
    /**
     * @return array<string, list<array<string, mixed>>>
     */
    public static function getAll(?string $locale = null): array
    {
        $locale = self::normalizeLocale($locale);

        return Cache::rememberForever("app_taxonomies_{$locale}", function () use ($locale) {
            return [
                'ecoles' => self::localizedList(Ecole::query(), $locale, orderByNom: true, extraColumns: ['pays_id']),
                'formationJuridiques' => self::localizedList(FormationJuridique::query(), $locale),
                'langues' => self::localizedList(Langue::query(), $locale),
                'modeTravails' => self::localizedList(ModeTravail::query(), $locale),
                'niveauExperiences' => self::localizedList(NiveauExperience::query(), $locale),
                'niveauLangues' => self::localizedList(NiveauLangue::query(), $locale),
                'postes' => self::localizedList(Poste::query(), $locale, orderByNom: true),
                'salaires' => self::localizedList(Salaire::query(), $locale),
                'specialisations' => self::localizedSpecialisations($locale),
                'tailleEntreprises' => self::localizedList(TailleEntreprise::query(), $locale),
                'typeOrganisations' => self::localizedList(TypeOrganisation::query(), $locale),
                'typeTravails' => self::localizedList(TypeTravail::query(), $locale),
                'urgences' => self::localizedList(Urgence::query(), $locale, extraColumns: ['code']),
                'pays' => self::localizedList(Pays::query(), $locale, orderByNom: true, extraColumns: ['code']),
                'villes' => self::localizedList(Ville::query(), $locale, orderByNom: true, extraColumns: ['pays_id']),
            ];
        });
    }

    public static function clearCache(): void
    {
        Cache::forget('app_taxonomies_fr');
        Cache::forget('app_taxonomies_en');
        Cache::forget('app_taxonomies');
    }

    private static function normalizeLocale(?string $locale): string
    {
        $locale ??= app()->getLocale();

        return $locale === 'en' ? 'en' : 'fr';
    }

    private static function nomColumn(string $locale): string
    {
        return $locale === 'en' ? 'nom_en' : 'nom_fr';
    }

    private static function domaineColumn(string $locale): string
    {
        return $locale === 'en' ? 'domaine_en' : 'domaine_fr';
    }

    /**
     * @param  Builder<Model>  $query
     * @param  list<string>  $extraColumns
     * @return list<array<string, mixed>>
     */
    private static function localizedList(
        Builder $query,
        string $locale,
        bool $orderByNom = false,
        array $extraColumns = [],
    ): array {
        $nomColumn = self::nomColumn($locale);
        $columns = array_merge(['id', 'nom_fr', 'nom_en'], $extraColumns);

        if ($orderByNom) {
            $query->orderBy($nomColumn);
        }

        return $query
            ->get($columns)
            ->map(function (Model $item) use ($locale, $extraColumns): array {
                $row = [
                    'id' => $item->getKey(),
                    'nom' => $item->localizedNom($locale),
                ];

                foreach ($extraColumns as $column) {
                    $row[$column] = $item->getAttribute($column);
                }

                return $row;
            })
            ->values()
            ->all();
    }

    /**
     * @return list<array<string, mixed>>
     */
    private static function localizedSpecialisations(string $locale): array
    {
        $nomColumn = self::nomColumn($locale);
        $domaineColumn = self::domaineColumn($locale);

        return Specialisation::query()
            ->orderBy($domaineColumn)
            ->orderBy($nomColumn)
            ->get(['id', 'nom_fr', 'nom_en', 'domaine_fr', 'domaine_en'])
            ->map(fn (Specialisation $item): array => [
                'id' => $item->id,
                'nom' => $item->localizedNom($locale),
                'domaine' => $item->localizedDomaine($locale),
            ])
            ->values()
            ->all();
    }
}

<?php

use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Specialisation;
use App\Repositories\TaxonomyRepository;
use Illuminate\Support\Facades\Cache;

beforeEach(function () {
    TaxonomyRepository::clearCache();

    Poste::create([
        'nom_fr' => 'Avocat',
        'nom_en' => 'Lawyer',
    ]);

    Langue::create([
        'nom_fr' => 'Français',
        'nom_en' => 'French',
    ]);

    Specialisation::create([
        'nom_fr' => 'Droit fiscal',
        'nom_en' => 'Tax Law',
        'domaine_fr' => 'Droit des entreprises',
        'domaine_en' => 'Business Law',
    ]);
});

afterEach(function () {
    TaxonomyRepository::clearCache();
});

test('taxonomy repository returns french labels for french locale', function () {
    app()->setLocale('fr');

    $taxonomies = TaxonomyRepository::getAll();

    expect(collect($taxonomies['postes'])->pluck('nom')->all())->toContain('Avocat')
        ->and(collect($taxonomies['langues'])->pluck('nom')->all())->toContain('Français')
        ->and(collect($taxonomies['specialisations'])->firstWhere('nom', 'Droit fiscal'))
        ->domaine->toBe('Droit des entreprises');
});

test('taxonomy repository returns english labels for english locale', function () {
    app()->setLocale('en');

    $taxonomies = TaxonomyRepository::getAll();

    expect(collect($taxonomies['postes'])->pluck('nom')->all())->toContain('Lawyer')
        ->and(collect($taxonomies['langues'])->pluck('nom')->all())->toContain('French')
        ->and(collect($taxonomies['specialisations'])->firstWhere('nom', 'Tax Law'))
        ->domaine->toBe('Business Law');
});

test('taxonomy model nom accessor follows current locale', function () {
    $poste = Poste::firstOrFail();

    app()->setLocale('fr');
    expect($poste->nom)->toBe('Avocat');

    app()->setLocale('en');
    expect($poste->fresh()->nom)->toBe('Lawyer');
});

test('taxonomy repository caches separately per locale', function () {
    app()->setLocale('fr');
    $french = TaxonomyRepository::getAll();

    app()->setLocale('en');
    $english = TaxonomyRepository::getAll();

    expect(Cache::has('app_taxonomies_fr'))->toBeTrue()
        ->and(Cache::has('app_taxonomies_en'))->toBeTrue()
        ->and(collect($french['postes'])->pluck('nom')->all())->toContain('Avocat')
        ->and(collect($english['postes'])->pluck('nom')->all())->toContain('Lawyer');
});

<?php

use App\Models\Taxonomy\Pays;
use App\Models\Taxonomy\Ville;
use App\Repositories\TaxonomyRepository;

beforeEach(function () {
    TaxonomyRepository::clearCache();

    $this->maroc = Pays::create([
        'code' => 'MA',
        'nom_fr' => 'Maroc',
        'nom_en' => 'Morocco',
    ]);

    $this->senegal = Pays::create([
        'code' => 'SN',
        'nom_fr' => 'Sénégal',
        'nom_en' => 'Senegal',
    ]);

    Ville::create([
        'pays_id' => $this->maroc->id,
        'nom_fr' => 'Casablanca',
        'nom_en' => 'Casablanca',
    ]);

    Ville::create([
        'pays_id' => $this->maroc->id,
        'nom_fr' => 'Rabat',
        'nom_en' => 'Rabat',
    ]);

    Ville::create([
        'pays_id' => $this->senegal->id,
        'nom_fr' => 'Dakar',
        'nom_en' => 'Dakar',
    ]);
});

afterEach(function () {
    TaxonomyRepository::clearCache();
});

test('taxonomy repository exposes localized countries and cities with pays_id', function () {
    app()->setLocale('fr');

    $taxonomies = TaxonomyRepository::getAll();

    expect(collect($taxonomies['pays'])->pluck('nom')->all())->toContain('Maroc', 'Sénégal')
        ->and(collect($taxonomies['villes'])->firstWhere('nom', 'Casablanca'))
        ->pays_id->toBe($this->maroc->id)
        ->and(collect($taxonomies['villes'])->firstWhere('nom', 'Dakar'))
        ->pays_id->toBe($this->senegal->id);
});

test('taxonomy repository returns english country labels', function () {
    app()->setLocale('en');

    $taxonomies = TaxonomyRepository::getAll();

    expect(collect($taxonomies['pays'])->pluck('nom')->all())->toContain('Morocco', 'Senegal');
});

test('ville belongs to a single country', function () {
    $ville = Ville::query()->where('nom_fr', 'Casablanca')->firstOrFail();

    expect($ville->pays)->not->toBeNull()
        ->and($ville->pays->code)->toBe('MA')
        ->and($this->maroc->villes)->toHaveCount(2);
});

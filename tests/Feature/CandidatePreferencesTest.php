<?php

use App\Models\Candidat\Candidat;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\Pays;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Ville;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create([
        'role' => 'candidat',
        'email_verified_at' => now(),
    ]);

    $this->candidat = Candidat::factory()->create([
        'user_id' => $this->user->id,
    ]);

    $this->pays = Pays::create([
        'code' => 'MA',
        'nom_fr' => 'Maroc',
        'nom_en' => 'Morocco',
    ]);

    $this->ville = Ville::create([
        'pays_id' => $this->pays->id,
        'nom_fr' => 'Casablanca',
        'nom_en' => 'Casablanca',
    ]);

    $this->otherVille = Ville::create([
        'pays_id' => $this->pays->id,
        'nom_fr' => 'Rabat',
        'nom_en' => 'Rabat',
    ]);

    $this->modeTravail = ModeTravail::create([
        'nom_fr' => 'Hybride',
        'nom_en' => 'Hybrid',
    ]);

    $this->typeTravail = TypeTravail::create([
        'nom_fr' => 'CDI',
        'nom_en' => 'Permanent Contract (CDI)',
    ]);
});

test('candidate can sync search preferences', function () {
    $this->actingAs($this->user)
        ->put(route('candidate.preferences.sync'), [
            'ville_ids' => [$this->ville->id, $this->otherVille->id],
            'mode_travail_ids' => [$this->modeTravail->id],
            'type_travail_ids' => [$this->typeTravail->id],
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($this->candidat->fresh()->villeTravails)->toHaveCount(2)
        ->and($this->candidat->fresh()->modeTravails)->toHaveCount(1)
        ->and($this->candidat->fresh()->typeTravails)->toHaveCount(1);
});

test('candidate preferences sync replaces previous values', function () {
    $this->candidat->villeTravails()->create(['ville_id' => $this->ville->id]);
    $this->candidat->modeTravails()->create(['mode_travail_id' => $this->modeTravail->id]);
    $this->candidat->typeTravails()->create(['type_travail_id' => $this->typeTravail->id]);

    $newMode = ModeTravail::create(['nom_fr' => 'Remote', 'nom_en' => 'Remote']);

    $this->actingAs($this->user)
        ->put(route('candidate.preferences.sync'), [
            'ville_ids' => [$this->otherVille->id],
            'mode_travail_ids' => [$newMode->id],
            'type_travail_ids' => [$this->typeTravail->id],
        ])
        ->assertRedirect();

    expect($this->candidat->fresh()->villeTravails->pluck('ville_id')->all())
        ->toBe([$this->otherVille->id])
        ->and($this->candidat->fresh()->modeTravails->pluck('mode_travail_id')->all())
        ->toBe([$newMode->id]);
});

test('candidate preferences require at least one city mode and type', function () {
    $this->actingAs($this->user)
        ->put(route('candidate.preferences.sync'), [
            'ville_ids' => [],
            'mode_travail_ids' => [],
            'type_travail_ids' => [],
        ])
        ->assertSessionHasErrors(['ville_ids', 'mode_travail_ids', 'type_travail_ids']);
});

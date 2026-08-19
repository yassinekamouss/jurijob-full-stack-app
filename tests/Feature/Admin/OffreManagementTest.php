<?php

use App\Models\Admin;
use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Models\User;

test('guests cannot access admin offres', function () {
    $this->get(route('admin.offres.index'))
        ->assertRedirect(route('admin.login'));
});

test('admin can view offres filtered by statut', function () {
    $admin = Admin::factory()->create();

    Offre::factory()->verificationPaiement()->create(['titre' => 'Offre vérification']);
    Offre::factory()->enTraitement()->create(['titre' => 'Offre traitement']);

    $this->actingAs($admin, 'admin')
        ->get(route('admin.offres.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/Offres')
            ->where('currentStatut', 'VERIFICATION_PAIEMENT')
            ->has('offres.data', 1)
            ->where('offres.data.0.titre', 'Offre vérification')
        );
});

test('admin can filter offres by en traitement statut', function () {
    $admin = Admin::factory()->create();

    Offre::factory()->enTraitement()->create(['titre' => 'Matching bientôt']);
    Offre::factory()->verificationPaiement()->create();

    $this->actingAs($admin, 'admin')
        ->get(route('admin.offres.index', ['statut' => 'EN_TRAITEMENT']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/Offres')
            ->where('currentStatut', 'EN_TRAITEMENT')
            ->has('offres.data', 1)
            ->where('offres.data.0.titre', 'Matching bientôt')
        );
});

test('admin can confirm payment and move offre to cv envoyes', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->verificationPaiement()->create();

    $this->actingAs($admin, 'admin')
        ->post(route('admin.offres.confirm-payment', $offre))
        ->assertRedirect();

    expect($offre->fresh()->statut)->toBe('CV_ENVOYES');
});

test('admin cannot confirm payment for offre not in verification', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->enTraitement()->create();

    $this->actingAs($admin, 'admin')
        ->from(route('admin.offres.index', ['statut' => 'EN_TRAITEMENT']))
        ->post(route('admin.offres.confirm-payment', $offre))
        ->assertRedirect(route('admin.offres.index', ['statut' => 'EN_TRAITEMENT']))
        ->assertSessionHasErrors('offre');

    expect($offre->fresh()->statut)->toBe('EN_TRAITEMENT');
});

test('admin can view matching candidates for an offre', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->enTraitement()->create([
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    $candidat = Candidat::factory()->accepte()->create([
        'niveau_experience_id' => $offre->niveau_experience_id,
        'user_id' => User::factory()->create([
            'role' => 'candidat',
            'is_active' => true,
        ])->id,
    ]);

    $candidat->postes()->create(['poste_id' => $offre->poste_id]);

    $this->actingAs($admin, 'admin')
        ->get(route('admin.offres.matching', $offre))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/OffreMatching')
            ->where('offre.id', $offre->id)
            ->has('candidates')
        );
});

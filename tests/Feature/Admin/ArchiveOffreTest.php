<?php

use App\Models\Admin;
use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;
use App\Models\User;

it('allows the admin to archive an offre from any status', function (string $statut) {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->create(['statut' => $statut]);

    $this->actingAs($admin, 'admin')
        ->post(route('admin.offres.archive', $offre))
        ->assertRedirect(route('admin.offres.index', ['statut' => 'ARCHIVE']))
        ->assertSessionHas('success');

    expect($offre->fresh()->statut)->toBe('ARCHIVE');
})->with([
    'en traitement' => ['EN_TRAITEMENT'],
    'attente paiement' => ['ATTENTE_PAIEMENT'],
    'vérification paiement' => ['VERIFICATION_PAIEMENT'],
    'cv envoyés' => ['CV_ENVOYES'],
]);

it('forbids archiving an already archived offre', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->create(['statut' => 'ARCHIVE']);

    $this->actingAs($admin, 'admin')
        ->from(route('admin.offres.index', ['statut' => 'ARCHIVE']))
        ->post(route('admin.offres.archive', $offre))
        ->assertRedirect(route('admin.offres.index', ['statut' => 'ARCHIVE']))
        ->assertSessionHasErrors('offre');

    expect($offre->fresh()->statut)->toBe('ARCHIVE');
});

it('forbids a recruiter from archiving an offre', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    $recruteur = Recruteur::factory()->create(['user_id' => $user->id]);
    $offre = Offre::factory()->enTraitement()->create(['recruteur_id' => $recruteur->id]);

    $this->actingAs($user)
        ->post(route('admin.offres.archive', $offre))
        ->assertRedirect(route('admin.login'));

    expect($offre->fresh()->statut)->toBe('EN_TRAITEMENT');
});

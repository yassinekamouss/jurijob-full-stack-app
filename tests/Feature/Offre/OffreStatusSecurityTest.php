<?php

use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;
use App\Models\User;

it('lets a recruiter confirm the transfer on his own offer', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    $recruteur = Recruteur::factory()->create(['user_id' => $user->id]);
    $offre = Offre::factory()->attentePaiement()->create(['recruteur_id' => $recruteur->id]);

    $this->actingAs($user)
        ->post(route('offres.confirm-transfer', $offre))
        ->assertRedirect(route('offres.index'))
        ->assertSessionHas('success');

    expect($offre->fresh()->statut)->toBe('VERIFICATION_PAIEMENT');
});

it('forbids a recruiter from confirming the transfer on another recruiter offer', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    Recruteur::factory()->create(['user_id' => $user->id]);
    $otherRecruteur = Recruteur::factory()->create();
    $offre = Offre::factory()->attentePaiement()->create(['recruteur_id' => $otherRecruteur->id]);

    $this->actingAs($user)
        ->from(route('offres.show', $offre))
        ->post(route('offres.confirm-transfer', $offre))
        ->assertForbidden();

    expect($offre->fresh()->statut)->toBe('ATTENTE_PAIEMENT');
});

it('forbids confirming the transfer when the offer is not awaiting payment', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    $recruteur = Recruteur::factory()->create(['user_id' => $user->id]);
    $offre = Offre::factory()->enTraitement()->create(['recruteur_id' => $recruteur->id]);

    $this->actingAs($user)
        ->from(route('offres.show', $offre))
        ->post(route('offres.confirm-transfer', $offre))
        ->assertSessionHasErrors('offre');

    expect($offre->fresh()->statut)->toBe('EN_TRAITEMENT');
});

it('keeps the status unchanged when the transfer is rejected', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    $recruteur = Recruteur::factory()->create(['user_id' => $user->id]);
    $offre = Offre::factory()->cvEnvoyes()->create(['recruteur_id' => $recruteur->id]);

    $this->actingAs($user)
        ->from(route('offres.show', $offre))
        ->post(route('offres.confirm-transfer', $offre))
        ->assertSessionHasErrors('offre');

    expect($offre->fresh()->statut)->toBe('CV_ENVOYES');
});

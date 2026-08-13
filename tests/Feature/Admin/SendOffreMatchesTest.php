<?php

use App\Models\Admin;
use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatModeTravail;
use App\Models\Candidat\CandidatTypeTravail;
use App\Models\Candidat\CandidatVilleTravail;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreMatch;
use App\Models\User;

function acceptedCandidateFor(Offre $offre): Candidat
{
    $candidat = Candidat::factory()->accepte()->create([
        'poste_id' => $offre->poste_id,
        'niveau_experience_id' => $offre->niveau_experience_id,
        'user_id' => User::factory()->create([
            'role' => 'candidat',
            'is_active' => true,
        ])->id,
    ]);

    CandidatTypeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'type_travail_id' => $offre->type_travail_id,
    ]);

    CandidatModeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'mode_travail_id' => $offre->mode_travail_id,
    ]);

    if ($offre->ville_id !== null) {
        CandidatVilleTravail::query()->create([
            'candidat_id' => $candidat->id,
            'ville_id' => $offre->ville_id,
        ]);
    }

    return $candidat;
}

test('admin can send selected matches and move offre to attente paiement', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->enTraitement()->create([
        'nombre_cv' => 2,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    $candidates = collect([
        acceptedCandidateFor($offre),
        acceptedCandidateFor($offre),
    ]);

    $this->actingAs($admin, 'admin')
        ->post(route('admin.offres.matching.send', $offre), [
            'candidates' => $candidates->map(fn ($candidat) => ['id' => $candidat->id, 'score' => 85])->all(),
        ])
        ->assertRedirect(route('admin.offres.index', ['statut' => 'ATTENTE_PAIEMENT']))
        ->assertSessionHas('success');

    expect($offre->fresh()->statut)->toBe('ATTENTE_PAIEMENT')
        ->and(OffreMatch::query()->where('offre_id', $offre->id)->count())->toBe(2);

    foreach ($candidates as $candidat) {
        $this->assertDatabaseHas('offre_matches', [
            'offre_id' => $offre->id,
            'candidat_id' => $candidat->id,
            'score' => 85,
        ]);
    }
});

test('admin can send fewer candidates than nombre_cv', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->enTraitement()->create([
        'nombre_cv' => 2,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    $candidat = acceptedCandidateFor($offre);

    $this->actingAs($admin, 'admin')
        ->post(route('admin.offres.matching.send', $offre), [
            'candidates' => [['id' => $candidat->id, 'score' => 70]],
        ])
        ->assertRedirect(route('admin.offres.index', ['statut' => 'ATTENTE_PAIEMENT']))
        ->assertSessionHas('success');

    expect($offre->fresh()->statut)->toBe('ATTENTE_PAIEMENT')
        ->and(OffreMatch::query()->where('offre_id', $offre->id)->count())->toBe(1);
});

test('admin cannot send more candidates than nombre_cv', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->enTraitement()->create([
        'nombre_cv' => 1,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    $candidates = collect([
        acceptedCandidateFor($offre),
        acceptedCandidateFor($offre),
    ]);

    $this->actingAs($admin, 'admin')
        ->from(route('admin.offres.matching', $offre))
        ->post(route('admin.offres.matching.send', $offre), [
            'candidates' => $candidates->map(fn ($candidat) => ['id' => $candidat->id, 'score' => 90])->all(),
        ])
        ->assertRedirect(route('admin.offres.matching', $offre))
        ->assertSessionHasErrors('candidates');

    expect($offre->fresh()->statut)->toBe('EN_TRAITEMENT')
        ->and(OffreMatch::query()->where('offre_id', $offre->id)->exists())->toBeFalse();
});

test('admin cannot send matches for offre not in traitement', function () {
    $admin = Admin::factory()->create();
    $offre = Offre::factory()->attentePaiement()->create([
        'nombre_cv' => 1,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    $candidat = acceptedCandidateFor($offre);

    $this->actingAs($admin, 'admin')
        ->from(route('admin.offres.matching', $offre))
        ->post(route('admin.offres.matching.send', $offre), [
            'candidates' => [['id' => $candidat->id, 'score' => 80]],
        ])
        ->assertRedirect(route('admin.offres.matching', $offre))
        ->assertSessionHasErrors('offre');
});

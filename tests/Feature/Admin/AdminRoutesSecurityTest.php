<?php

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;
use App\Models\User;

$adminRoutes = [
    'matching' => fn (Offre $offre) => route('admin.offres.matching', $offre),
    'matching.send' => fn (Offre $offre) => route('admin.offres.matching.send', $offre),
    'confirm-payment' => fn (Offre $offre) => route('admin.offres.confirm-payment', $offre),
    'archive' => fn (Offre $offre) => route('admin.offres.archive', $offre),
];

it('redirects guests to the admin login for every admin offre route', function (string $routeName) use ($adminRoutes) {
    $offre = Offre::factory()->enTraitement()->create();

    $response = match ($routeName) {
        'matching' => $this->get($adminRoutes['matching']($offre)),
        default => $this->post($adminRoutes[$routeName]($offre)),
    };

    $response->assertRedirect(route('admin.login'));
})->with(['matching', 'matching.send', 'confirm-payment', 'archive']);

it('denies access to a recruiter on every admin offre route', function (string $routeName) use ($adminRoutes) {
    $user = User::factory()->create(['role' => 'recruteur']);
    Recruteur::factory()->create(['user_id' => $user->id]);
    $offre = Offre::factory()->enTraitement()->create();

    $response = match ($routeName) {
        'matching' => $this->actingAs($user)->get($adminRoutes['matching']($offre)),
        default => $this->actingAs($user)->post($adminRoutes[$routeName]($offre)),
    };

    $response->assertRedirect(route('admin.login'));
    expect(Offre::find($offre->id)->statut)->toBe($offre->statut);
})->with(['matching', 'matching.send', 'confirm-payment', 'archive']);

it('denies access to a candidate on every admin offre route', function (string $routeName) use ($adminRoutes) {
    $user = User::factory()->create(['role' => 'candidat']);
    Candidat::factory()->create(['user_id' => $user->id]);
    $offre = Offre::factory()->enTraitement()->create();

    $response = match ($routeName) {
        'matching' => $this->actingAs($user)->get($adminRoutes['matching']($offre)),
        default => $this->actingAs($user)->post($adminRoutes[$routeName]($offre)),
    };

    $response->assertRedirect(route('admin.login'));
})->with(['matching', 'matching.send', 'confirm-payment', 'archive']);

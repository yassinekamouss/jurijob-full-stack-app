<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated candidate is redirected to candidate dashboard', function () {
    $user = User::factory()->create(['role' => 'candidat']);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('candidate.dashboard'));
});

test('authenticated recruteur is redirected to recruteur dashboard', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('recruteur.dashboard'));
});

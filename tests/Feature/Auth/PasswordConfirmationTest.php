<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('confirm password screen can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('password.confirm'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('auth/confirm-password'),
    );
});

test('password confirmation requires authentication', function () {
    $response = $this->get(route('password.confirm'));

    $response->assertRedirect(route('login'));
});

test('password can be confirmed and redirects recruiter to security settings', function () {
    $user = User::factory()->create(['role' => 'recruteur']);

    $response = $this->actingAs($user)->post(route('password.confirm.store'), [
        'password' => 'password',
    ]);

    $response->assertRedirect(route('recruteur.settings', ['tab' => 'security']));
    $response->assertSessionHas('auth.password_confirmed_at');
});

test('password can be confirmed and redirects candidate to security settings', function () {
    $user = User::factory()->create(['role' => 'candidat']);

    $response = $this->actingAs($user)->post(route('password.confirm.store'), [
        'password' => 'password',
    ]);

    $response->assertRedirect(route('candidate.settings', ['tab' => 'security']));
    $response->assertSessionHas('auth.password_confirmed_at');
});

test('password is not confirmed with invalid password', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('password.confirm.store'), [
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors('password');
});

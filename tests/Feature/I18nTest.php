<?php

use Illuminate\Support\Facades\App;

test('default locale is french (fr)', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    expect(App::getLocale())->toBe('fr');
});

test('locale can be changed to english via post route', function () {
    $response = $this->post('/locale/en');

    $response->assertRedirect();
    $response->assertSessionHas('locale', 'en');
    $response->assertPlainCookie('locale', 'en');
});

test('invalid locale falls back to default locale (fr)', function () {
    $response = $this->post('/locale/invalid');

    $response->assertRedirect();
    $response->assertSessionHas('locale', 'fr');
    $response->assertPlainCookie('locale', 'fr');
});

test('session locale persists across requests', function () {
    $this->withSession(['locale' => 'en'])
        ->get('/')
        ->assertStatus(200);

    expect(App::getLocale())->toBe('en');
});

test('locale cookie persists locale across requests', function () {
    $this->withUnencryptedCookie('locale', 'en')
        ->get('/')
        ->assertStatus(200);

    expect(App::getLocale())->toBe('en');
});

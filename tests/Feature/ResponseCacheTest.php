<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\User;
use Spatie\ResponseCache\Facades\ResponseCache;

test('home page can be rendered and cached for guests', function () {
    ResponseCache::clear();

    $response1 = $this->get('/');
    $response1->assertStatus(200);

    $response2 = $this->get('/');
    $response2->assertStatus(200);
});

test('authenticated user requests bypass response cache for home page', function () {
    ResponseCache::clear();

    $user = User::factory()->create(['role' => 'candidat']);

    $response = $this->actingAs($user)->get('/');
    $response->assertStatus(200);
});

test('inertia navigation requests receive inertia json and bypass cached html response', function () {
    ResponseCache::clear();

    // Direct browser navigation caches HTML response
    $htmlResponse = $this->get('/');
    $htmlResponse->assertStatus(200);

    // Get current Inertia asset version
    $version = app(HandleInertiaRequests::class)->version(request());

    // Subsequent Inertia AJAX navigation must return Inertia JSON, not cached HTML
    $inertiaResponse = $this->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => $version,
    ])->get('/');

    $inertiaResponse->assertStatus(200);
    $inertiaResponse->assertHeader('X-Inertia', 'true');
    $inertiaResponse->assertJsonPath('component', 'Home');
});

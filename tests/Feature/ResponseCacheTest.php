<?php

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

<?php

use Inertia\Testing\AssertableInertia as Assert;

test('mentions legales page can be rendered', function () {
    $response = $this->get('/mentions-legales');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('MentionsLegales'));
});

test('cgu page can be rendered', function () {
    $response = $this->get('/cgu');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('Cgu'));
});

test('cgv page can be rendered', function () {
    $response = $this->get('/cgv');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page->component('Cgv'));
});

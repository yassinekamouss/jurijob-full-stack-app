<?php

test('mentions legales page can be rendered', function () {
    $response = $this->get('/mentions-legales');

    $response->assertStatus(200);
    $response->assertViewIs('pages.mentions-legales');
});

test('cgu page can be rendered', function () {
    $response = $this->get('/cgu');

    $response->assertStatus(200);
    $response->assertViewIs('pages.cgu');
});

test('cgv page can be rendered', function () {
    $response = $this->get('/cgv');

    $response->assertStatus(200);
    $response->assertViewIs('pages.cgv');
});

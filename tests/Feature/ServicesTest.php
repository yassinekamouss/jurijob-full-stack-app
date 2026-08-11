<?php

test('services page can be rendered', function () {
    $response = $this->get('/services');

    $response->assertStatus(200);
    $response->assertViewIs('pages.services');
});

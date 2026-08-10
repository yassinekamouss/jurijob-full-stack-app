<?php

test('faq page can be rendered', function () {
    $response = $this->get(route('faq'));

    $response->assertOk();
    $response->assertViewIs('pages.faq');
});

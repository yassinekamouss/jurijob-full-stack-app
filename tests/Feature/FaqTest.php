<?php

use Inertia\Testing\AssertableInertia as Assert;

test('faq page can be rendered', function () {
    $response = $this->get(route('faq'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('Faq'));
});

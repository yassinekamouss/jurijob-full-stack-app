<?php

test('sitemap xml route returns valid xml content with correct public urls', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'text/xml; charset=UTF-8');
    $response->assertSee('https://jurijob.ma/');
    $response->assertSee('https://jurijob.ma/services');
    $response->assertSee('https://jurijob.ma/faq');
    $response->assertSee('https://jurijob.ma/cgv');
    $response->assertSee('https://jurijob.ma/cgu');
    $response->assertSee('https://jurijob.ma/mentions-legales');
    $response->assertDontSee('/register/candidat');
    $response->assertDontSee('/candidate/');
    $response->assertDontSee('/admin/');
});

test('robots txt exists and has secure configuration', function () {
    $robotsPath = public_path('robots.txt');
    expect(file_exists($robotsPath))->toBeTrue();

    $content = file_get_contents($robotsPath);
    expect($content)->toContain('Disallow: /candidate/')
        ->toContain('Disallow: /admin/')
        ->toContain('Disallow: /register/')
        ->toContain('Sitemap: https://jurijob.ma/sitemap.xml');
});

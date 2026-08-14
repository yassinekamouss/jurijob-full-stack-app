<?php

use Illuminate\Support\Facades\Route;

beforeEach(function () {
    Route::get('/test-error-403', fn () => abort(403));
    Route::get('/test-error-419', fn () => abort(419));
    Route::get('/test-error-429', fn () => abort(429));
    Route::get('/test-error-500', fn () => abort(500));
    Route::get('/test-error-503', fn () => abort(503));
});

test('non-existent route returns status 404 and renders native blade 404 page', function () {
    $response = $this->get('/non-existent-route-for-testing-404-jurijob');

    $response->assertStatus(404);
    $response->assertSee('404');
    $response->assertSee('Page introuvable');
    $response->assertSee('Cette page a peut-être été déplacée');
});

test('http exceptions render respective native blade error pages', function (int $status, string $expectedTitle, string $expectedMessage) {
    $response = $this->get("/test-error-{$status}");

    $response->assertStatus($status);
    $response->assertSee((string) $status);
    $response->assertSee($expectedTitle);
    $response->assertSee($expectedMessage);
})->with([
    [403, 'Accès refusé', 'Vous n\'avez pas les autorisations nécessaires'],
    [419, 'Session expirée', 'Votre session a expiré'],
    [429, 'Trop de requêtes', 'Vous avez effectué trop de requêtes'],
    [500, 'Une erreur est survenue', 'Notre serveur a rencontré un problème inattendu'],
    [503, 'Service indisponible', 'JuriJob est temporairement indisponible'],
]);

test('blade error pages do not leak sensitive information', function (int $status) {
    $url = $status === 404 ? '/non-existent-route-for-testing-404-jurijob' : "/test-error-{$status}";
    $response = $this->get($url);

    $content = $response->getContent();

    expect($content)->not->toContain('DB_PASSWORD')
        ->not->toContain('APP_KEY')
        ->not->toContain('SQLSTATE')
        ->not->toContain('Stack trace:')
        ->not->toContain('/vendor/laravel/');
})->with([403, 404, 419, 429, 500, 503]);

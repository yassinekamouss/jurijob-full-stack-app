<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Spatie\ResponseCache\Facades\ResponseCache;

beforeEach(function () {
    config(['responsecache.enabled' => false]);
    ResponseCache::clear();
});

test('Scenario 1: Première visite -> locale par défaut est le français (fr)', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    expect(App::getLocale())->toBe('fr');

    $pageData = $response->original->getData()['page'];
    expect($pageData['component'])->toBe('Home');
    expect($pageData['props']['locale'])->toBe('fr');
    expect($pageData['props']['direction'])->toBe('ltr');
    expect($pageData['props']['translations'])->toBeArray();
});

test('Scenario 2: Passage FR -> EN via POST /locale/en', function () {
    $response = $this->post('/locale/en');

    $response->assertRedirect();
    $response->assertSessionHas('locale', 'en');
    $response->assertPlainCookie('locale', 'en');

    $followUp = $this->get('/');
    expect(App::getLocale())->toBe('en');

    $pageData = $followUp->original->getData()['page'];
    expect($pageData['props']['locale'])->toBe('en');
    expect($pageData['props']['direction'])->toBe('ltr');
});

test('Scenario 3: Passage EN -> FR via POST /locale/fr', function () {
    $this->withSession(['locale' => 'en']);

    $response = $this->post('/locale/fr');

    $response->assertRedirect();
    $response->assertSessionHas('locale', 'fr');
    $response->assertPlainCookie('locale', 'fr');

    $followUp = $this->get('/');
    expect(App::getLocale())->toBe('fr');

    $pageData = $followUp->original->getData()['page'];
    expect($pageData['props']['locale'])->toBe('fr');
});

test('Scenario 4: Refresh de la page (persistance via session et cookie)', function () {
    $response1 = $this->withUnencryptedCookie('locale', 'en')->get('/');
    $response1->assertStatus(200);
    expect(App::getLocale())->toBe('en');

    $response2 = $this->withUnencryptedCookie('locale', 'en')->get('/');
    $response2->assertStatus(200);
    expect(App::getLocale())->toBe('en');

    $pageData = $response2->original->getData()['page'];
    expect($pageData['props']['locale'])->toBe('en');
});

test('Scenario 5: Navigation Inertia (en-tête X-Inertia)', function () {
    $this->withSession(['locale' => 'en']);

    $req = Request::create('/');
    $version = app(HandleInertiaRequests::class)->version($req);

    $headers = ['X-Inertia' => 'true'];
    if ($version !== null) {
        $headers['X-Inertia-Version'] = $version;
    }

    $response = $this->withHeaders($headers)->get('/');

    $response->assertStatus(200);
    $response->assertHeader('X-Inertia', 'true');

    $pageProps = $response->json('props');
    expect($pageProps['locale'])->toBe('en');
    expect($pageProps['translations'])->toBeArray();
});

test('Scenario 6: Navigation directe vers différentes URL (Blade & Inertia)', function () {
    $this->withSession(['locale' => 'en']);

    // Inertia route
    $homeResponse = $this->get('/');
    $homeData = $homeResponse->original->getData()['page'];
    expect($homeData['props']['locale'])->toBe('en');

    // Blade route (Services)
    $servicesResponse = $this->get('/services');
    $servicesResponse->assertStatus(200);
    expect(App::getLocale())->toBe('en');
    $servicesResponse->assertSee('lang="en"', false);

    // Blade route (FAQ)
    $faqResponse = $this->get('/faq');
    $faqResponse->assertStatus(200);
    expect(App::getLocale())->toBe('en');
    $faqResponse->assertSee('lang="en"', false);
});

test('Scenario 7: Utilisateur non authentifié (guest)', function () {
    $this->assertGuest();

    $response = $this->post('/locale/en');
    $response->assertRedirect();
    $response->assertSessionHas('locale', 'en');

    $loginResponse = $this->get('/login');
    $loginData = $loginResponse->original->getData()['page'];
    expect($loginData['props']['locale'])->toBe('en');
});

test('Scenario 8: Utilisateur authentifié (candidat / recruteur)', function () {
    $user = User::factory()->create([
        'role' => 'candidat',
        'email_verified_at' => now(),
    ]);

    $this->actingAs($user);

    $response = $this->post('/locale/en');
    $response->assertRedirect();
    $response->assertSessionHas('locale', 'en');

    // Authenticated user candidate dashboard
    $dashboardResponse = $this->get('/candidate/dashboard');
    $dashboardResponse->assertStatus(200);
    $dashboardData = $dashboardResponse->original->getData()['page'];
    expect($dashboardData['props']['locale'])->toBe('en');
});

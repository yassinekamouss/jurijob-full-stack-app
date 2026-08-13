<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\CandidateController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OffreController as AdminOffreController;
use App\Http\Controllers\Admin\RecruiterController;
use App\Http\Controllers\Auth\CheckEmailController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Candidate\DashboardController as CandidateDashboardController;
use App\Http\Controllers\Candidate\ExperienceController;
use App\Http\Controllers\Candidate\FormationController;
use App\Http\Controllers\Candidate\LanguageController;
use App\Http\Controllers\Candidate\PreferenceController;
use App\Http\Controllers\Candidate\SettingsController;
use App\Http\Controllers\Candidate\SpecialisationController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\Offre\OffreController;
use App\Http\Controllers\Recruiter\DashboardController as RecruiterDashboardController;
use App\Http\Controllers\Recruiter\SettingsController as RecruiterSettingsController;
use App\Repositories\TaxonomyRepository;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/locale/{locale}', [LocaleController::class, 'update'])->name('locale.update');

Route::inertia('/', 'Home')->name('home');
Route::view('/services', 'pages.services')->name('services');
Route::view('/faq', 'pages.faq')->name('faq');
Route::view('/mentions-legales', 'pages.mentions-legales')->name('mentions-legales');
Route::view('/cgu', 'pages.cgu')->name('cgu');
Route::view('/cgv', 'pages.cgv')->name('cgv');

Route::get('/sitemap.xml', function () {
    return response()
        ->view('sitemap')
        ->header('Content-Type', 'text/xml');
})->name('sitemap');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        // ... previous dashboard logic ...
        $user = auth()->user();
        if ($user->role === 'candidat') {
            return redirect()->route('candidate.dashboard');
        }
        if ($user->role === 'recruteur') {
            return redirect()->route('recruteur.dashboard');
        }

        return redirect()->route('home');
    })->name('dashboard');

    Route::get('/candidate/dashboard', [CandidateDashboardController::class, 'index'])->name('candidate.dashboard');

    // Candidate Settings
    Route::get('/candidate/settings', [SettingsController::class, 'index'])->name('candidate.settings');
    Route::put('/candidate/settings/profile', [SettingsController::class, 'updateProfile'])->name('candidate.settings.update-profile');

    // Candidate Profile Relations (CRUD)
    Route::prefix('candidate')->name('candidate.')->group(function () {
        Route::resource('experiences', ExperienceController::class)->only(['store', 'update', 'destroy']);
        Route::resource('formations', FormationController::class)->only(['store', 'update', 'destroy']);
        Route::put('specialisations/sync', [SpecialisationController::class, 'sync'])->name('specialisations.sync');
        Route::resource('specialisations', SpecialisationController::class)->only(['store', 'update', 'destroy']);
        Route::resource('langues', LanguageController::class)->only(['store', 'update', 'destroy']);
        Route::put('preferences/sync', [PreferenceController::class, 'sync'])->name('preferences.sync');
    });

    Route::middleware('role:candidat')->group(function () {
        Route::get('/candidate/dashboard', [CandidateDashboardController::class, 'index'])->name('candidate.dashboard');
    });

    Route::middleware('role:recruteur')->group(function () {
        Route::get('/recruteur/dashboard', [RecruiterDashboardController::class, 'index'])->name('recruteur.dashboard');

        Route::get('/recruteur/settings', [RecruiterSettingsController::class, 'index'])->name('recruteur.settings');
        Route::put('/recruteur/settings/profile', [RecruiterSettingsController::class, 'updateProfile'])->name('recruteur.settings.update-profile');

        Route::get('/recruteur/offres/{offre}/paiement', [OffreController::class, 'payment'])->name('offres.payment');
        Route::post('/recruteur/offres/{offre}/confirm-transfer', [OffreController::class, 'confirmTransfer'])->name('offres.confirm-transfer');
        Route::get('/recruteur/offres/{offre}/profils', [OffreController::class, 'profiles'])->name('offres.profiles');
        Route::resource('/recruteur/offres', OffreController::class)->except(['edit', 'update']);
    });
});

// admin login Route
Route::middleware('guest:admin')->group(function () {
    Route::get('/admin/login', fn () => Inertia::render('admin/auth/Login'))->name('admin.login');
    Route::post('/admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1');
});

// Admin Protected Routes
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/candidats', [CandidateController::class, 'index'])->name('admin.candidates.index');
    Route::post('/admin/candidats/{candidate}/approve', [CandidateController::class, 'approve'])->name('admin.candidates.approve');
    Route::post('/admin/candidats/{candidate}/reject', [CandidateController::class, 'reject'])->name('admin.candidates.reject');
    Route::post('/admin/candidats/{candidate}/archive', [CandidateController::class, 'archive'])->name('admin.candidates.archive');
    Route::get('/admin/recruteurs', [RecruiterController::class, 'index'])->name('admin.recruteurs.index');
    // Route::get('/admin/recruteurs/{recruteur}/applications', [ApplicationsController::class, 'index'])->name('admin.recruteurs.applications'); // TODO: Create/Import ApplicationsController

    Route::get('/admin/recruteurs/{recruteur}/applications', [RecruiterController::class, 'showApplications'])->name('admin.recruteurs.applications');
    Route::get('/admin/recruteurs/{recruteur}/offres', [AdminOffreController::class, 'indexByRecruteur'])->name('admin.recruteurs.offres');
    Route::get('/admin/offres', [AdminOffreController::class, 'index'])->name('admin.offres.index');
    Route::get('/admin/offres/{offre}/matching', [AdminOffreController::class, 'matching'])->name('admin.offres.matching');
    Route::post('/admin/offres/{offre}/matching/custom', [AdminOffreController::class, 'customMatching'])->name('admin.offres.matching.custom');
    Route::post('/admin/offres/{offre}/matching', [AdminOffreController::class, 'sendMatches'])->name('admin.offres.matching.send');
    Route::post('/admin/offres/{offre}/confirm-payment', [AdminOffreController::class, 'confirmPayment'])->name('admin.offres.confirm-payment');
    Route::post('/admin/offres/{offre}/archive', [AdminOffreController::class, 'archive'])->name('admin.offres.archive');
    Route::post('/admin/offres/{offre}/revert-to-traitement', [AdminOffreController::class, 'revertToTraitement'])->name('admin.offres.revert-to-traitement');
    Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});

// Candidat & Recruteur Registration Routes
// ... registration routes ...
Route::get('/register/candidat', fn () => Inertia::render('auth/register-candidat', [
    'taxonomies' => fn () => TaxonomyRepository::getAll(),
]))->name('register.candidat.form');

Route::get('/register/recruteur', fn () => Inertia::render('auth/register-recruteur', [
    'taxonomies' => fn () => TaxonomyRepository::getAll(),
]))->name('register.recruteur.form');
Route::post('/check-email', CheckEmailController::class)->name('check.email');

// Social OAuth Routes
Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirectToProvider'])
    ->middleware('guest')
    ->name('social.redirect')
    ->where('provider', 'google|linkedin-openid');

Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback'])
    ->name('social.callback')
    ->where('provider', 'google|linkedin-openid');

// Fallback: complete registration when role was not pre-selected
Route::post('/auth/social/complete-registration', [SocialAuthController::class, 'completeRegistration'])
    ->name('social.complete-registration');

// Guest Email Verification Route (Overrides Fortify's default)
Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

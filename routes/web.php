<?php

use App\Http\Controllers\Auth\CheckEmailController;
use App\Http\Controllers\Candidate\DashboardController as CandidateDashboardController;
use App\Http\Controllers\Candidate\DiplomaController;
use App\Http\Controllers\Candidate\ExperienceController;
use App\Http\Controllers\Candidate\FormationController;
use App\Http\Controllers\Candidate\LanguageController;
use App\Http\Controllers\Candidate\ProfileImageController;
use App\Http\Controllers\Candidate\SettingsController;
use App\Http\Controllers\Candidate\SpecialisationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Home')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        // ... previous dashboard logic ...
        $user = auth()->user();
        if ($user->role === 'candidat') {
            return redirect()->route('candidate.dashboard');
        }
        if ($user->role === 'recruteur') {
            return redirect()->route('recruiter.dashboard');
        }

        return redirect()->route('home');
    })->name('dashboard');

    Route::get('/candidate/dashboard', [CandidateDashboardController::class, 'index'])->name('candidate.dashboard');

    // Candidate Settings
    Route::get('/candidate/settings', [SettingsController::class, 'index'])->name('candidate.settings');
    Route::put('/candidate/settings/profile', [SettingsController::class, 'updateProfile'])->name('candidate.settings.update-profile');
    Route::put('/candidate/settings/account', [SettingsController::class, 'updateAccount'])->name('candidate.settings.update-account');
    Route::post('/candidate/settings/image', [SettingsController::class, 'updateImage'])->name('candidate.settings.update-image');

    // Secure File Access
    Route::get('/candidate/profile-image/{candidat}', ProfileImageController::class)->name('candidate.profile-image');
    Route::get('/candidate/diploma/{formation}', DiplomaController::class)->name('candidate.diploma');

    // Candidate Profile Relations (CRUD)
    Route::prefix('candidate')->name('candidate.')->group(function () {
        Route::resource('experiences', ExperienceController::class)->only(['store', 'update', 'destroy']);
        Route::resource('formations', FormationController::class)->only(['store', 'update', 'destroy']);
        Route::resource('specialisations', SpecialisationController::class)->only(['store', 'update', 'destroy']);
        Route::resource('langues', LanguageController::class)->only(['store', 'update', 'destroy']);
    });

    // Placeholder for recruiter dashboard
    Route::get('/recruiter/dashboard', fn () => Inertia::render('recruiter/Dashboard'))->name('recruiter.dashboard');
});

// Candidat & Recruteur Registration Routes
// ... registration routes ...
Route::get('/register/candidat', fn () => Inertia::render('auth/register-candidat'))->name('register.candidat.form');
Route::get('/register/recruteur', fn () => Inertia::render('auth/register-recruteur'))->name('register.recruteur.form');
Route::post('/check-email', CheckEmailController::class)->name('check.email');

require __DIR__.'/settings.php';

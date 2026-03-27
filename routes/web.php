<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Auth\CheckEmailController;
use App\Http\Controllers\Candidate\DashboardController as CandidateDashboardController;
use App\Http\Controllers\Candidate\DiplomaController;
use App\Http\Controllers\Candidate\ExperienceController;
use App\Http\Controllers\Candidate\FormationController;
use App\Http\Controllers\Candidate\LanguageController;
use App\Http\Controllers\Candidate\ProfileImageController;
use App\Http\Controllers\Candidate\SettingsController;
use App\Http\Controllers\Candidate\SpecialisationController;

use App\Http\Controllers\Auth\VerifyEmailController;


use App\Http\Controllers\Recruiter\DashboardController as RecruiterDashboardController;
use App\Http\Controllers\Recruiter\SettingsController as RecruiterSettingsController;

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
            return redirect()->route('recruteur.dashboard');
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

    Route::middleware('role:candidat')->group(function () {
        Route::get('/candidate/dashboard', [CandidateDashboardController::class, 'index'])->name('candidate.dashboard');
    });

    Route::middleware('role:recruteur')->group(function () {
        Route::get('/recruteur/dashboard', [RecruiterDashboardController::class, 'index'])->name('recruteur.dashboard');
        
        Route::get('/recruteur/settings', [RecruiterSettingsController::class, 'index'])->name('recruteur.settings');
        Route::put('/recruteur/settings/profile', [RecruiterSettingsController::class, 'updateProfile'])->name('recruteur.settings.update-profile');
    });
});

// admin login Route
Route::middleware('guest:admin')->group(function () {
    Route::get('/admin/login', fn () => Inertia::render('admin/auth/Login'))->name('admin.login');
    Route::post('/admin/login', [AdminAuthController::class, 'login']);
});

// Admin Protected Routes
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', fn () => Inertia::render('admin/Dashboard'))->name('admin.dashboard');
    Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});

// Candidat & Recruteur Registration Routes
// ... registration routes ...
Route::get('/register/candidat', fn () => Inertia::render('auth/register-candidat'))->name('register.candidat.form');
Route::get('/register/recruteur', fn () => Inertia::render('auth/register-recruteur'))->name('register.recruteur.form');
Route::post('/check-email', CheckEmailController::class)->name('check.email');

// Guest Email Verification Route (Overrides Fortify's default)
Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

require __DIR__.'/settings.php';

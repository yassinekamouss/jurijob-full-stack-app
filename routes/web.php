<?php

use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Auth\CheckEmailController;
use App\Http\Controllers\Candidate\DashboardController as CandidateDashboardController;
use App\Http\Controllers\Candidate\ProfileImageController;
use App\Http\Controllers\DownloadPrivateFileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Home')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        if ($user->role === 'candidat') {
            return redirect()->route('candidate.dashboard');
        }
        if ($user->role === 'recruteur') {
            return redirect()->route('recruiter.dashboard');
        }

        return redirect()->route('home');
    })->name('dashboard');

    Route::middleware('role:candidat')->group(function () {
        Route::get('/candidate/dashboard', [CandidateDashboardController::class, 'index'])->name('candidate.dashboard');
    });

    Route::middleware('role:recruteur')->group(function () {
        Route::get('/recruiter/dashboard', fn () => Inertia::render('recruiter/Dashboard'))->name('recruiter.dashboard');
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
Route::get('/register/candidat', fn () => Inertia::render('auth/register-candidat'))->name('register.candidat.form');
Route::get('/register/recruteur', fn () => Inertia::render('auth/register-recruteur'))->name('register.recruteur.form');
Route::post('/check-email', CheckEmailController::class)->name('check.email');

// Public route for candidate profile images (Temporary)
Route::get('/candidat-profile-image/{filename}', ProfileImageController::class)->name('candidate.profile-image');

// Private File Download Route securely inside auth
Route::get('/private/file', DownloadPrivateFileController::class)->name('download.private')->middleware('auth');

require __DIR__.'/settings.php';

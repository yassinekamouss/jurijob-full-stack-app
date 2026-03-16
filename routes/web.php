<?php

use App\Http\Controllers\Auth\CheckEmailController;
use App\Http\Controllers\DownloadPrivateFileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// Candidat Registration Routes
Route::get('/register/candidat', fn () => Inertia::render('auth/register-candidat'))->name('register.candidat.form');
Route::post('/check-email', CheckEmailController::class)->name('check.email');

// Private File Download Route securely inside auth
Route::get('/private/file', DownloadPrivateFileController::class)->name('download.private')->middleware('auth');

require __DIR__.'/settings.php';

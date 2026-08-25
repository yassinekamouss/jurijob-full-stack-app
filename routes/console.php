<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Envoi quotidien d'un rappel aux candidats (max 210) ayant un profil incomplet
Schedule::command('app:send-profile-reminders')
    ->dailyAt('23:15')
    ->timezone('Africa/Casablanca');


<?php

namespace App\Providers;

use App\Mail\VerifyEmailFrench;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\ServiceProvider;

class MailServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new VerifyEmailFrench($notifiable, $url))
                ->to($notifiable->email);
        });
    }
}

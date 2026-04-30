<?php

namespace App\Providers;

use App\Services\Matching\MatchingEngine;
use App\Services\Matching\Strategies\CityMatchingStrategy;
use App\Services\Matching\Strategies\ExperienceMatchingStrategy;
use App\Services\Matching\Strategies\FormationMatchingStrategy;
use App\Services\Matching\Strategies\LanguageMatchingStrategy;
use App\Services\Matching\Strategies\ModeTravailMatchingStrategy;
use App\Services\Matching\Strategies\SpecialisationMatchingStrategy;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->tag([
            LanguageMatchingStrategy::class,
            SpecialisationMatchingStrategy::class,
            CityMatchingStrategy::class,
            FormationMatchingStrategy::class,
            ExperienceMatchingStrategy::class,
            ModeTravailMatchingStrategy::class,
        ], 'matching.strategies');

        $this->app->bind(MatchingEngine::class, function ($app) {
            return new MatchingEngine(
                $app->tagged('matching.strategies')
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Configure Eloquent Morph Map to avoid full namespaces in DB.
     */

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}

<?php

namespace App\Providers;

use App\Models\Taxonomy\DomaineExperience;
use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\TailleEntreprise;
use App\Models\Taxonomy\TypeOrganisation;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Ville;
use App\Services\Matching\MatchingEngine;
use App\Services\Matching\Strategies\CityMatchingStrategy;
use App\Services\Matching\Strategies\ExperienceMatchingStrategy;
use App\Services\Matching\Strategies\FormationMatchingStrategy;
use App\Services\Matching\Strategies\LanguageMatchingStrategy;
use App\Services\Matching\Strategies\ModeTravailMatchingStrategy;
use App\Services\Matching\Strategies\SpecialisationMatchingStrategy;
use App\Services\Matching\Strategies\TotalExperienceMatchingStrategy;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Relations\Relation;
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
            TotalExperienceMatchingStrategy::class,
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
            fn(): ?Password => app()->isProduction()
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

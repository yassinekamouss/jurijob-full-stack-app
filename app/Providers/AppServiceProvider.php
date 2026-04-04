<?php

namespace App\Providers;

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
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureMorphMap();
    }

    /**
     * Configure Eloquent Morph Map to avoid full namespaces in DB.
     */
    protected function configureMorphMap(): void
    {
        Relation::morphMap([
            'domaine_experience' => \App\Models\Taxonomy\DomaineExperience::class,
            'ecole' => \App\Models\Taxonomy\Ecole::class,
            'formation_juridique' => \App\Models\Taxonomy\FormationJuridique::class,
            'langue' => \App\Models\Taxonomy\Langue::class,
            'mode_travail' => \App\Models\Taxonomy\ModeTravail::class,
            'niveau_experience' => \App\Models\Taxonomy\NiveauExperience::class,
            'niveau_langue' => \App\Models\Taxonomy\NiveauLangue::class,
            'poste' => \App\Models\Taxonomy\Poste::class,
            'specialisation' => \App\Models\Taxonomy\Specialisation::class,
            'taille_entreprise' => \App\Models\Taxonomy\TailleEntreprise::class,
            'type_organisation' => \App\Models\Taxonomy\TypeOrganisation::class,
            'type_travail' => \App\Models\Taxonomy\TypeTravail::class,
            'ville' => \App\Models\Taxonomy\Ville::class,
        ]);

        // Optionnel mais recommandé pour la sécurité et la clarté
        // Relation::enforceMorphMap(); 
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
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

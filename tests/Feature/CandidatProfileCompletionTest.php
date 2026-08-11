<?php

use App\Models\Candidat\Candidat;
use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Pays;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Ville;
use App\Models\User;

function completeCandidateBase(): Candidat
{
    $user = User::factory()->create([
        'role' => 'candidat',
        'email_verified_at' => now(),
    ]);

    return Candidat::factory()->create([
        'user_id' => $user->id,
    ]);
}

test('profile is incomplete without preferences localisation modes and types', function () {
    $candidat = completeCandidateBase();

    $candidat->formations()->create([
        'annee_debut' => '2018-09',
        'annee_fin' => '2022-06',
        'formation_juridique_id' => $candidat->formation_juridique_id,
        'specialisation_id' => Specialisation::create([
            'nom_fr' => 'Droit fiscal',
            'nom_en' => 'Tax Law',
            'domaine_fr' => 'Entreprises',
            'domaine_en' => 'Business',
        ])->id,
        'ecole_id' => 1,
    ]);

    $completion = $candidat->fresh()->profileCompletion();

    expect($completion['localisation'])->toBeFalse()
        ->and($completion['mode_travails'])->toBeFalse()
        ->and($completion['type_travails'])->toBeFalse()
        ->and($completion['is_complete'])->toBeFalse();
});

test('profile is incomplete without experiences even when other sections are filled', function () {
    $candidat = completeCandidateBase();

    $specialisation = Specialisation::create([
        'nom_fr' => 'Droit fiscal',
        'nom_en' => 'Tax Law',
        'domaine_fr' => 'Entreprises',
        'domaine_en' => 'Business',
    ]);

    $candidat->formations()->create([
        'annee_debut' => '2018-09',
        'annee_fin' => '2022-06',
        'formation_juridique_id' => $candidat->formation_juridique_id,
        'specialisation_id' => $specialisation->id,
        'ecole_id' => Ecole::create([
            'nom_fr' => 'Faculté de droit',
            'nom_en' => 'Law Faculty',
        ])->id,
    ]);

    $candidat->specialisations()->create([
        'specialisation_id' => $specialisation->id,
    ]);

    $langue = Langue::create(['nom_fr' => 'Français', 'nom_en' => 'French']);
    $niveau = NiveauLangue::create(['nom_fr' => 'Courant', 'nom_en' => 'Fluent']);
    $candidat->langues()->create([
        'langue_id' => $langue->id,
        'niveau_langue_id' => $niveau->id,
    ]);

    $pays = Pays::create(['code' => 'MA', 'nom_fr' => 'Maroc', 'nom_en' => 'Morocco']);
    $ville = Ville::create(['pays_id' => $pays->id, 'nom_fr' => 'Casablanca', 'nom_en' => 'Casablanca']);
    $candidat->villeTravails()->create(['ville_id' => $ville->id]);

    $mode = ModeTravail::create(['nom_fr' => 'Hybride', 'nom_en' => 'Hybrid']);
    $candidat->modeTravails()->create(['mode_travail_id' => $mode->id]);

    $type = TypeTravail::create(['nom_fr' => 'CDI', 'nom_en' => 'CDI']);
    $candidat->typeTravails()->create(['type_travail_id' => $type->id]);

    $completion = $candidat->fresh()->load([
        'formations',
        'specialisations',
        'langues',
        'villeTravails',
        'modeTravails',
        'typeTravails',
        'experiences',
    ])->profileCompletion();

    expect($completion['experiences'])->toBeFalse()
        ->and($completion['localisation'])->toBeTrue()
        ->and($completion['mode_travails'])->toBeTrue()
        ->and($completion['type_travails'])->toBeTrue()
        ->and($completion['is_complete'])->toBeFalse();
});

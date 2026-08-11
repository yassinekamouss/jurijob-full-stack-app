<?php

use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatFormation;
use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Pays;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Salaire;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\TypeTravail;
use App\Models\Taxonomy\Urgence;
use App\Models\Taxonomy\Ville;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\CreatesNewUsers;

beforeEach(function () {
    $this->poste = Poste::create(['nom_fr' => 'Avocat', 'nom_en' => 'Lawyer']);
    $this->niveauExperience = NiveauExperience::create(['nom_fr' => 'Junior', 'nom_en' => 'Junior']);
    $this->formationJuridique = FormationJuridique::create(['nom_fr' => 'Master', 'nom_en' => 'Master']);
    $this->specialisation = Specialisation::create([
        'nom_fr' => 'Droit des affaires',
        'nom_en' => 'Business Law',
        'domaine_fr' => 'Droit privé',
        'domaine_en' => 'Private Law',
    ]);
    $this->typeTravail = TypeTravail::create(['nom_fr' => 'CDI', 'nom_en' => 'Permanent Contract (CDI)']);
    $this->modeTravail = ModeTravail::create(['nom_fr' => 'Hybride', 'nom_en' => 'Hybrid']);
    $this->pays = Pays::create(['code' => 'MA', 'nom_fr' => 'Maroc', 'nom_en' => 'Morocco']);
    $this->ville = Ville::create([
        'pays_id' => $this->pays->id,
        'nom_fr' => 'Casablanca',
        'nom_en' => 'Casablanca',
    ]);
    $this->langue = Langue::create(['nom_fr' => 'Français', 'nom_en' => 'French']);
    $this->niveauLangue = NiveauLangue::create(['nom_fr' => 'Courant', 'nom_en' => 'Fluent']);
    $this->ecole = Ecole::create(['nom_fr' => 'Université Mohammed V', 'nom_en' => 'Mohammed V University']);
    $this->salaire = Salaire::create(['nom_fr' => '10k - 15k MAD', 'nom_en' => '10k - 15k MAD']);
    $this->urgence = Urgence::create(['nom_fr' => 'Immédiate', 'nom_en' => 'Immediate', 'code' => 'immediate']);
});

function candidatRegistrationPayload(array $overrides = []): array
{
    $test = test();

    return array_replace_recursive([
        'role' => 'candidat',
        'email' => 'candidat@example.com',
        'password' => 'Password1!',
        'password_confirmation' => 'Password1!',
        'telephone' => '+212612345678',
        'nom' => 'Doe',
        'prenom' => 'Jane',
        'poste_id' => $test->poste->id,
        'niveau_experience_id' => $test->niveauExperience->id,
        'formation_juridique_id' => $test->formationJuridique->id,
        'salaire_id' => $test->salaire->id,
        'urgence_id' => $test->urgence->id,
        'specialisations' => [
            ['specialisation_id' => $test->specialisation->id],
        ],
        'langues' => [
            [
                'langue_id' => $test->langue->id,
                'niveau_langue_id' => $test->niveauLangue->id,
            ],
        ],
        'type_travails' => [
            ['type_travail_id' => $test->typeTravail->id],
        ],
        'mode_travails' => [
            ['mode_travail_id' => $test->modeTravail->id],
        ],
        'ville_travails' => [
            ['ville_id' => $test->ville->id],
        ],
        'experiences' => [
            [
                'debut' => '2023-01',
                'fin' => '2024-06',
                'type_travail_id' => $test->typeTravail->id,
                'entreprise' => 'Cabinet XYZ',
                'poste_id' => $test->poste->id,
            ],
        ],
        'formations' => [
            [
                'annee_debut' => '2018-09',
                'annee_fin' => '2022-06',
                'formation_juridique_id' => $test->formationJuridique->id,
                'specialisation_id' => $test->specialisation->id,
                'ecole_id' => $test->ecole->id,
            ],
        ],
    ], $overrides);
}

it('registers a candidat with formations and related profile data', function () {
    $user = app(CreatesNewUsers::class)->create(candidatRegistrationPayload());

    expect($user)->toBeInstanceOf(User::class)
        ->and($user->email)->toBe('candidat@example.com')
        ->and($user->role)->toBe('candidat');

    $candidat = Candidat::query()->where('user_id', $user->id)->first();

    expect($candidat)->not->toBeNull()
        ->and($candidat->specialisations)->toHaveCount(1)
        ->and($candidat->formations)->toHaveCount(1)
        ->and($candidat->experiences)->toHaveCount(1);

    $formation = CandidatFormation::query()->where('candidat_id', $candidat->id)->first();

    expect($formation->ecole_id)->toBe($this->ecole->id);
});

it('still requires core formation fields during registration', function () {
    $payload = candidatRegistrationPayload([
        'email' => 'incomplete@example.com',
    ]);

    $payload['formations'] = [
        [
            'annee_debut' => '2018-09',
            'annee_fin' => '2022-06',
            'formation_juridique_id' => $this->formationJuridique->id,
            'specialisation_id' => $this->specialisation->id,
        ],
    ];

    expect(fn () => app(CreatesNewUsers::class)->create($payload))
        ->toThrow(ValidationException::class);
});

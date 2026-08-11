<?php

use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatFormation;
use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\NiveauLangue;
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
    $this->poste = Poste::create(['nom' => 'Avocat']);
    $this->niveauExperience = NiveauExperience::create(['nom' => 'Junior']);
    $this->formationJuridique = FormationJuridique::create(['nom' => 'Master']);
    $this->specialisation = Specialisation::create([
        'nom' => 'Droit des affaires',
        'domaine' => 'Droit privé',
    ]);
    $this->typeTravail = TypeTravail::create(['nom' => 'CDI']);
    $this->modeTravail = ModeTravail::create(['nom' => 'Hybride']);
    $this->ville = Ville::create(['nom' => 'Casablanca']);
    $this->langue = Langue::create(['nom' => 'Français']);
    $this->niveauLangue = NiveauLangue::create(['nom' => 'Courant']);
    $this->ecole = Ecole::create(['nom' => 'Université Mohammed V']);
    $this->salaire = Salaire::create(['nom' => '10k - 15k MAD']);
    $this->urgence = Urgence::create(['nom' => 'Immédiate', 'code' => 'immediate']);
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

<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Laravel\Fortify\Contracts\CreatesNewUsers;

it('validates a successful request structure without hitting DB', function () {
    // 1. We mock the service because the local machine currently lacks PDO drivers for both MySQL and SQLite
    // To prove the endpoint is wired correctly, we mock the service injection.
    $mockAction = Mockery::mock(CreatesNewUsers::class);

    // Create a dummy user to return
    $fakeUser = new User([
        'email' => 'jane.doe@example.com',
        'role' => 'candidat',
    ]);
    $fakeUser->id = 1;

    $mockAction->shouldReceive('create')
        ->once()
        ->andReturn($fakeUser);

    app()->instance(CreatesNewUsers::class, $mockAction);

    $avatar = UploadedFile::fake()->image('avatar.jpg');
    $diploma = UploadedFile::fake()->create('diploma.pdf', 1000, 'application/pdf');

    $payload = [
        'email' => 'jane.doe@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'telephone' => '1234567890',
        'nom' => 'Doe',
        'prenom' => 'Jane',
        'poste_recherche' => 'Avocat',
        'niveau_experience' => 'Junior',
        'formation_juridique' => 'Master',
        'image_file' => $avatar,

        // HasMany relations
        'specialisations' => [
            ['specialisation' => 'Droit des affaires'],
        ],
        'domain_experiences' => [
            ['domain_experience' => 'Cabinet d\'avocats'],
        ],
        'langues' => [
            ['nom' => 'Anglais', 'niveau' => 'Courant'],
        ],
        'type_travails' => [
            ['type_travail' => 'CDI'],
        ],
        'mode_travails' => [
            ['mode_travail' => 'Hybride'],
        ],
        'ville_travails' => [
            ['ville' => 'Paris'],
        ],
        'experiences' => [
            [
                'type' => 'Stage',
                'entreprise' => 'Cabinet XYZ',
                'poste' => 'Stagiaire',
            ], // Omitted dates as they are nullable
        ],
        'formations' => [
            [
                'niveau' => 'Master 2',
                'domaine' => 'Droit',
                'ecole' => 'Sorbonne',
                'diploma_file' => $diploma,
            ],
        ],
    ];

    $response = $this->postJson('/register', $payload);

    // Assert the validation passed and endpoint returned 201
    $response->assertStatus(201);
});

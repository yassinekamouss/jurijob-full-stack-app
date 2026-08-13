<?php

use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatLangue;
use App\Models\Candidat\CandidatModeTravail;
use App\Models\Candidat\CandidatSpecialisation;
use App\Models\Candidat\CandidatTypeTravail;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereMultiple;
use App\Models\Offre\OffreMatch;
use App\Models\Recruteur\Recruteur;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\ModeTravail;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Specialisation;
use App\Models\Taxonomy\TypeTravail;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('recruiter can view unlocked profiles with capped score and offer criteria', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    $recruteur = Recruteur::factory()->create(['user_id' => $user->id]);

    $typeTravail = TypeTravail::query()->firstOrCreate(
        ['nom_fr' => 'CDI'],
        ['nom_en' => 'Permanent']
    );
    $modeTravail = ModeTravail::query()->firstOrCreate(
        ['nom_fr' => 'Présentiel'],
        ['nom_en' => 'On-site']
    );
    $specialisation = Specialisation::query()->firstOrCreate(
        ['nom_fr' => 'Droit des affaires'],
        ['nom_en' => 'Business law']
    );
    $langue = Langue::query()->firstOrCreate(
        ['nom_fr' => 'Français'],
        ['nom_en' => 'French']
    );
    $niveauLangue = NiveauLangue::query()->firstOrCreate(
        ['nom_fr' => 'C1 (Maîtrise)'],
        ['nom_en' => 'C1 (Proficiency)']
    );

    $offre = Offre::factory()->cvEnvoyes()->create([
        'recruteur_id' => $recruteur->id,
        'type_travail_id' => $typeTravail->id,
        'mode_travail_id' => $modeTravail->id,
    ]);

    OffreCritereMultiple::query()->create([
        'offre_id' => $offre->id,
        'type_critere' => 'SPECIALISATION',
        'critere_id' => $specialisation->id,
        'metadata' => ['importance' => 'required'],
    ]);

    OffreCritereMultiple::query()->create([
        'offre_id' => $offre->id,
        'type_critere' => 'LANGUE',
        'critere_id' => $langue->id,
        'metadata' => ['niveau_langue_id' => $niveauLangue->id],
    ]);

    $candidat = Candidat::factory()->accepte()->create([
        'poste_id' => $offre->poste_id,
        'niveau_experience_id' => $offre->niveau_experience_id,
        'user_id' => User::factory()->create([
            'role' => 'candidat',
            'is_active' => true,
        ])->id,
    ]);

    CandidatSpecialisation::query()->create([
        'candidat_id' => $candidat->id,
        'specialisation_id' => $specialisation->id,
    ]);

    CandidatLangue::query()->create([
        'candidat_id' => $candidat->id,
        'langue_id' => $langue->id,
        'niveau_langue_id' => $niveauLangue->id,
    ]);

    CandidatTypeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'type_travail_id' => $typeTravail->id,
    ]);

    CandidatModeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'mode_travail_id' => $modeTravail->id,
    ]);

    OffreMatch::factory()->create([
        'offre_id' => $offre->id,
        'candidat_id' => $candidat->id,
        'score' => 112,
    ]);

    $this->actingAs($user)
        ->get(route('offres.profiles', $offre))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Offres/Profiles')
            ->where('offre.id', $offre->id)
            ->where('offre.type_travail', $typeTravail->nom)
            ->where('offre.mode_travail', $modeTravail->nom)
            ->where('offre.specialisations.0', $specialisation->nom)
            ->where('offre.langues.0', $langue->nom)
            ->has('profiles', 1)
            ->where('profiles.0.match_score', 112)
            ->where('profiles.0.types_travail.0', $typeTravail->nom)
            ->where('profiles.0.modes_travail.0', $modeTravail->nom)
            ->where('profiles.0.specialisations.0', $specialisation->nom)
            ->where('profiles.0.langues.0.nom', $langue->nom)
        );
});

test('recruiter cannot view profiles before cvs are sent', function () {
    $user = User::factory()->create(['role' => 'recruteur']);
    $recruteur = Recruteur::factory()->create(['user_id' => $user->id]);
    $offre = Offre::factory()->attentePaiement()->create([
        'recruteur_id' => $recruteur->id,
    ]);

    $this->actingAs($user)
        ->get(route('offres.profiles', $offre))
        ->assertRedirect(route('offres.payment', $offre));
});

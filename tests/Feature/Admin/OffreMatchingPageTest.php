<?php

use App\Models\Admin;
use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatModeTravail;
use App\Models\Candidat\CandidatSpecialisation;
use App\Models\Candidat\CandidatTypeTravail;
use App\Models\Candidat\CandidatVilleTravail;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereMultiple;
use App\Models\Taxonomy\Specialisation;
use App\Models\User;

test('admin matching page includes offer requirements and candidate matches', function () {
    $admin = Admin::factory()->create();
    $specialisation = Specialisation::query()->firstOrCreate(
        ['nom_fr' => 'Droit des affaires'],
        ['nom_en' => 'Business law']
    );

    $offre = Offre::factory()->enTraitement()->create([
        'nombre_cv' => 1,
        'formation_juridique_id' => null,
        'salaire_id' => null,
        'titre' => 'Juriste corporate',
        'description' => 'Description complète de l\'offre',
    ]);

    OffreCritereMultiple::query()->create([
        'offre_id' => $offre->id,
        'type_critere' => 'SPECIALISATION',
        'critere_id' => $specialisation->id,
        'metadata' => [],
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

    CandidatTypeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'type_travail_id' => $offre->type_travail_id,
    ]);

    CandidatModeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'mode_travail_id' => $offre->mode_travail_id,
    ]);

    CandidatVilleTravail::query()->create([
        'candidat_id' => $candidat->id,
        'ville_id' => $offre->ville_id,
    ]);

    $this->actingAs($admin, 'admin')
        ->get(route('admin.offres.matching', $offre))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/OffreMatching')
            ->where('offre.id', $offre->id)
            ->where('offre.titre', 'Juriste corporate')
            ->where('offre.description', 'Description complète de l\'offre')
            ->where('offre.nombre_cv', 1)
            ->where('alreadySent', false)
            ->has('offre.requirements', 1)
            ->where('offre.requirements.0.taxonomy_type', 'SPECIALISATION')
            ->where('offre.requirements.0.taxonomy_id', $specialisation->id)
            ->has('candidates', 1)
            ->where('candidates.0.id', $candidat->id)
        );
});

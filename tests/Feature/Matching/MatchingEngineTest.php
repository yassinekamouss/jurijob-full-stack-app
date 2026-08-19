<?php

use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatLangue;
use App\Models\Candidat\CandidatModeTravail;
use App\Models\Candidat\CandidatPoste;
use App\Models\Candidat\CandidatSpecialisation;
use App\Models\Candidat\CandidatTypeTravail;
use App\Models\Candidat\CandidatVilleTravail;
use App\Models\Offre\Offre;
use App\Models\Offre\OffreCritereMultiple;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Langue;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\NiveauLangue;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Salaire;
use App\Models\Taxonomy\Specialisation;
use App\Models\User;
use App\Services\CandidateMatching\MatchingEngine;
use App\Services\CandidateMatching\MatchScorer;

beforeEach(function () {
    $this->poste = Poste::query()->firstOrCreate(
        ['nom_fr' => 'Avocat'],
        ['nom_en' => 'Lawyer']
    );

    $this->experience = NiveauExperience::query()->firstOrCreate(
        ['nom_fr' => 'Junior'],
        ['nom_en' => 'Junior']
    );

    $this->licence = FormationJuridique::query()->firstOrCreate(
        ['nom_fr' => 'Licence Matching Test'],
        ['nom_en' => 'Bachelor Matching Test']
    );

    $this->master = FormationJuridique::query()->create([
        'nom_fr' => 'Master Matching Test '.uniqid(),
        'nom_en' => 'Master Matching Test '.uniqid(),
    ]);

    // Master must have a higher id than Licence for the >= formation filter.
    if ($this->master->id <= $this->licence->id) {
        $this->master->delete();
        $this->master = FormationJuridique::query()->create([
            'nom_fr' => 'Master Matching Test '.uniqid(),
            'nom_en' => 'Master Matching Test '.uniqid(),
        ]);
    }

    $this->salaire = Salaire::query()->firstOrCreate(
        ['nom_fr' => '8 000 – 12 000 MAD/mois'],
        ['nom_en' => '8,000 – 12,000 MAD/month']
    );

    $this->francais = Langue::query()->firstOrCreate(
        ['nom_fr' => 'Français'],
        ['nom_en' => 'French']
    );

    $this->anglais = Langue::query()->firstOrCreate(
        ['nom_fr' => 'Anglais'],
        ['nom_en' => 'English']
    );

    $this->b2 = NiveauLangue::query()->firstOrCreate(
        ['nom_fr' => 'B2 (Avancé)'],
        ['nom_en' => 'B2 (Advanced)']
    );

    $this->c1 = NiveauLangue::query()->firstOrCreate(
        ['nom_fr' => 'C1 (Maîtrise)'],
        ['nom_en' => 'C1 (Proficiency)']
    );

    $this->droitAffaires = Specialisation::query()->firstOrCreate(
        ['nom_fr' => 'Droit des affaires'],
        ['nom_en' => 'Business law']
    );

    $this->droitSocial = Specialisation::query()->firstOrCreate(
        ['nom_fr' => 'Droit social'],
        ['nom_en' => 'Employment law']
    );

    $this->engine = app(MatchingEngine::class);
});

function makeAcceptedCandidate(Offre $offre, array $attributes = []): Candidat
{
    $candidat = Candidat::factory()->create(array_merge([
        'status' => 'accepte',
        'niveau_experience_id' => test()->experience->id,
        'formation_juridique_id' => test()->master->id,
        'salaire_id' => test()->salaire->id,
        'user_id' => User::factory()->create([
            'role' => 'candidat',
            'is_active' => true,
        ])->id,
    ], $attributes));

    CandidatPoste::query()->create([
        'candidat_id' => $candidat->id,
        'poste_id' => test()->poste->id,
    ]);

    CandidatTypeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'type_travail_id' => $offre->type_travail_id,
    ]);

    CandidatModeTravail::query()->create([
        'candidat_id' => $candidat->id,
        'mode_travail_id' => $offre->mode_travail_id,
    ]);

    if ($offre->ville_id !== null) {
        CandidatVilleTravail::query()->create([
            'candidat_id' => $candidat->id,
            'ville_id' => $offre->ville_id,
        ]);
    }

    return $candidat;
}

function attachLanguage(Candidat $candidat, int $langueId, int $niveauId): void
{
    CandidatLangue::query()->create([
        'candidat_id' => $candidat->id,
        'langue_id' => $langueId,
        'niveau_langue_id' => $niveauId,
    ]);
}

function attachSpecialisation(Candidat $candidat, int $specialisationId): void
{
    CandidatSpecialisation::query()->create([
        'candidat_id' => $candidat->id,
        'specialisation_id' => $specialisationId,
    ]);
}

function attachLanguageCriterion(Offre $offre, int $langueId, string $importance, int $niveauId): void
{
    OffreCritereMultiple::query()->create([
        'offre_id' => $offre->id,
        'type_critere' => 'LANGUE',
        'critere_id' => $langueId,
        'metadata' => [
            'importance' => $importance,
            'niveau_langue_id' => $niveauId,
        ],
    ]);
}

function attachSpecialisationCriterion(Offre $offre, int $specialisationId): void
{
    OffreCritereMultiple::query()->create([
        'offre_id' => $offre->id,
        'type_critere' => 'SPECIALISATION',
        'critere_id' => $specialisationId,
        'metadata' => [],
    ]);
}

test('only accepted and active candidates are matched', function () {
    $offre = Offre::factory()->create([
        'poste_id' => $this->poste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => $this->licence->id,
        'salaire_id' => null,
    ]);

    $eligible = makeAcceptedCandidate($offre);
    makeAcceptedCandidate($offre, ['status' => 'en_attente']);
    makeAcceptedCandidate($offre, [
        'user_id' => User::factory()->create([
            'role' => 'candidat',
            'is_active' => false,
        ])->id,
    ]);

    $matches = $this->engine->getMatches($offre);

    expect($matches)->toHaveCount(1)
        ->and($matches->first()->id)->toBe($eligible->id);
});

test('indispensable languages eliminate candidates missing any required language', function () {
    $offre = Offre::factory()->create([
        'poste_id' => $this->poste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => $this->licence->id,
        'salaire_id' => null,
    ]);

    attachLanguageCriterion($offre, $this->francais->id, 'indispensable', $this->b2->id);
    attachLanguageCriterion($offre, $this->anglais->id, 'indispensable', $this->b2->id);

    $complete = makeAcceptedCandidate($offre);
    attachLanguage($complete, $this->francais->id, $this->b2->id);
    attachLanguage($complete, $this->anglais->id, $this->b2->id);

    $partial = makeAcceptedCandidate($offre);
    attachLanguage($partial, $this->francais->id, $this->b2->id);

    $matches = $this->engine->getMatches($offre);

    expect($matches->pluck('id')->all())->toBe([$complete->id]);
});

test('formation filter keeps candidates with equal or higher formation id', function () {
    $offre = Offre::factory()->create([
        'poste_id' => $this->poste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => $this->master->id,
        'salaire_id' => null,
    ]);

    $masterCandidate = makeAcceptedCandidate($offre, ['formation_juridique_id' => $this->master->id]);
    makeAcceptedCandidate($offre, ['formation_juridique_id' => $this->licence->id]);

    // Guarantee licence id is lower than master for this assertion.
    expect($this->licence->id)->toBeLessThan($this->master->id);

    $matches = $this->engine->getMatches($offre);

    expect($matches->pluck('id')->all())->toBe([$masterCandidate->id]);
});

test('null offre salaire skips salaire comparison and urgence is ignored', function () {
    $offre = Offre::factory()->create([
        'poste_id' => $this->poste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => null,
        'salaire_id' => null,
        'urgence_id' => null,
    ]);

    $otherSalaire = Salaire::query()->firstOrCreate(
        ['nom_fr' => '12 000 – 16 000 MAD/mois'],
        ['nom_en' => '12,000 – 16,000 MAD/month']
    );

    $candidate = makeAcceptedCandidate($offre, ['salaire_id' => $otherSalaire->id]);

    $matches = $this->engine->getMatches($offre);

    expect($matches->pluck('id')->all())->toBe([$candidate->id]);
});

test('important language miss applies a soft penalty of 5', function () {
    $offre = Offre::factory()->create([
        'poste_id' => $this->poste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    attachLanguageCriterion($offre, $this->anglais->id, 'important', $this->b2->id);

    $withLanguage = makeAcceptedCandidate($offre);
    attachLanguage($withLanguage, $this->anglais->id, $this->b2->id);

    $withoutLanguage = makeAcceptedCandidate($offre);

    $matches = $this->engine->getMatches($offre);

    expect($matches)->toHaveCount(2)
        ->and($matches->first()->id)->toBe($withLanguage->id)
        ->and($matches->last()->id)->toBe($withoutLanguage->id)
        ->and($matches->last()->matching_breakdown['language_penalty'])->toBe(5)
        ->and($matches->first()->matching_score - $matches->last()->matching_score)
        ->toBeGreaterThanOrEqual(5);
});

test('specialisation misses apply a soft penalty of 5 each', function () {
    $offre = Offre::factory()->create([
        'poste_id' => $this->poste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    attachSpecialisationCriterion($offre, $this->droitAffaires->id);
    attachSpecialisationCriterion($offre, $this->droitSocial->id);

    $complete = makeAcceptedCandidate($offre);
    attachSpecialisation($complete, $this->droitAffaires->id);
    attachSpecialisation($complete, $this->droitSocial->id);

    $partial = makeAcceptedCandidate($offre);
    attachSpecialisation($partial, $this->droitAffaires->id);

    $matches = $this->engine->getMatches($offre);

    expect($matches->first()->id)->toBe($complete->id)
        ->and($matches->last()->id)->toBe($partial->id)
        ->and($matches->last()->matching_breakdown['specialisation_penalty'])->toBe(MatchScorer::SPECIALISATION_PENALTY)
        ->and($matches->first()->matching_score - $matches->last()->matching_score)
        ->toBe(MatchScorer::SPECIALISATION_PENALTY);
});

test('higher language level ranks above equal profiles', function () {
    $offre = Offre::factory()->create([
        'poste_id' => $this->poste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    attachLanguageCriterion($offre, $this->anglais->id, 'important', $this->b2->id);

    $advanced = makeAcceptedCandidate($offre);
    attachLanguage($advanced, $this->anglais->id, $this->c1->id);

    $minimum = makeAcceptedCandidate($offre);
    attachLanguage($minimum, $this->anglais->id, $this->b2->id);

    // Ensure C1 id is higher than B2 for level bonus ordering.
    expect($this->c1->id)->toBeGreaterThan($this->b2->id);

    $matches = $this->engine->getMatches($offre);

    expect($matches->first()->id)->toBe($advanced->id)
        ->and($matches->last()->id)->toBe($minimum->id)
        ->and($matches->first()->matching_score)->toBeGreaterThan($matches->last()->matching_score);
});

test('candidate with multiple postes matches an offre whose poste is among them', function () {
    $secondPoste = Poste::query()->firstOrCreate(
        ['nom_fr' => 'Notaire'],
        ['nom_en' => 'Notary']
    );

    $offre = Offre::factory()->create([
        'poste_id' => $secondPoste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    $candidate = makeAcceptedCandidate($offre);
    // Already has $this->poste attached via makeAcceptedCandidate.
    // Add the second poste that matches the offre.
    CandidatPoste::query()->create([
        'candidat_id' => $candidate->id,
        'poste_id' => $secondPoste->id,
    ]);

    $matches = $this->engine->getMatches($offre);

    expect($matches->pluck('id')->all())->toContain($candidate->id);
});

test('candidate whose postes do not include the offre poste is excluded', function () {
    $otherPoste = Poste::query()->firstOrCreate(
        ['nom_fr' => 'Huissier'],
        ['nom_en' => 'Bailiff']
    );

    $offre = Offre::factory()->create([
        'poste_id' => $otherPoste->id,
        'niveau_experience_id' => $this->experience->id,
        'formation_juridique_id' => null,
        'salaire_id' => null,
    ]);

    makeAcceptedCandidate($offre);

    $matches = $this->engine->getMatches($offre);

    expect($matches)->toHaveCount(0);
});

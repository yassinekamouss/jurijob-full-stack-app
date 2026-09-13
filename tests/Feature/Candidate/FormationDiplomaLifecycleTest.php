<?php

use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatFormation;
use App\Models\Taxonomy\Ecole;
use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\Specialisation;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

beforeEach(function () {
    Storage::fake('private');

    $this->user = User::factory()->create([
        'role' => 'candidat',
        'email_verified_at' => now(),
    ]);
    $this->candidat = Candidat::factory()->create(['user_id' => $this->user->id]);

    $this->ecole = Ecole::firstOrCreate(['nom_fr' => 'Sorbonne'], ['nom_en' => 'Sorbonne']);
    $this->formationJuridique = FormationJuridique::firstOrCreate(['nom_fr' => 'Master'], ['nom_en' => 'Master']);
    $this->specialisation = Specialisation::firstOrCreate(
        ['nom_fr' => 'Droit des Affaires'],
        ['nom_en' => 'Business Law', 'domaine_fr' => 'Droit privé', 'domaine_en' => 'Private Law']
    );

    $this->formationPayload = function (array $overrides = []): array {
        return array_merge([
            'formation_juridique_id' => $this->formationJuridique->id,
            'specialisation_id' => $this->specialisation->id,
            'ecole_id' => $this->ecole->id,
            'annee_debut' => '2018-09',
            'annee_fin' => '2022-06',
        ], $overrides);
    };
});

it('stores the diploma on the private disk when creating a formation', function () {
    $this->actingAs($this->user)
        ->post(route('candidate.formations.store'), ($this->formationPayload)([
            'diploma_file' => UploadedFile::fake()->create('diplome.pdf', 50, 'application/pdf'),
        ]))
        ->assertSessionHas('success');

    $formation = $this->candidat->formations()->first();

    expect($formation)->not->toBeNull()
        ->and(Str::startsWith($formation->diploma_file, 'candidat_diplomas/'))->toBeTrue()
        ->and(Storage::disk('private')->exists($formation->diploma_file))->toBeTrue();
});

it('rejects a non-PDF diploma file when creating a formation', function () {
    $this->actingAs($this->user)
        ->post(route('candidate.formations.store'), ($this->formationPayload)([
            'diploma_file' => UploadedFile::fake()->create('note.txt', 10, 'text/plain'),
        ]))
        ->assertSessionHasErrors('diploma_file');

    expect($this->candidat->formations()->count())->toBe(0);
});

it('replaces the previous diploma file when updating a formation', function () {
    $oldPath = 'candidat_diplomas/old.pdf';
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $this->candidat->id,
        'diploma_file' => $oldPath,
    ]);
    Storage::disk('private')->put($oldPath, 'old content');

    $this->actingAs($this->user)
        ->put(route('candidate.formations.update', $formation), ($this->formationPayload)([
            'diploma_file' => UploadedFile::fake()->create('new.pdf', 40, 'application/pdf'),
        ]))
        ->assertSessionHas('success');

    $formation->refresh();

    expect($formation->diploma_file)->not->toBe($oldPath)
        ->and(Storage::disk('private')->missing($oldPath))->toBeTrue()
        ->and(Storage::disk('private')->exists($formation->diploma_file))->toBeTrue();
});

it('uploads a diploma to an existing formation without one', function () {
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $this->candidat->id,
        'diploma_file' => null,
    ]);

    $this->actingAs($this->user)
        ->post(route('candidate.formations.diploma.upload', $formation), [
            'diploma_file' => UploadedFile::fake()->create('diplome.pdf', 50, 'application/pdf'),
        ])
        ->assertSessionHas('success');

    $formation->refresh();

    expect($formation->diploma_file)->not->toBeNull()
        ->and(Storage::disk('private')->exists($formation->diploma_file))->toBeTrue();
});

it('deletes the diploma file from an existing formation', function () {
    $path = 'candidat_diplomas/to-remove.pdf';
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $this->candidat->id,
        'diploma_file' => $path,
    ]);
    Storage::disk('private')->put($path, 'content');

    $this->actingAs($this->user)
        ->delete(route('candidate.formations.diploma.destroy', $formation))
        ->assertSessionHas('success');

    $formation->refresh();

    expect($formation->diploma_file)->toBeNull()
        ->and(Storage::disk('private')->missing($path))->toBeTrue();
});

it('deletes the diploma file when a formation is removed', function () {
    $path = 'candidat_diplomas/to-delete.pdf';
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $this->candidat->id,
        'diploma_file' => $path,
    ]);
    Storage::disk('private')->put($path, 'content');

    $this->actingAs($this->user)
        ->delete(route('candidate.formations.destroy', $formation))
        ->assertSessionHas('success');

    expect(Storage::disk('private')->missing($path))->toBeTrue()
        ->and(CandidatFormation::find($formation->id))->toBeNull();
});

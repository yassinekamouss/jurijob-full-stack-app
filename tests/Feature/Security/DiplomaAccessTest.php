<?php

use App\Models\Admin;
use App\Models\Candidat\Candidat;
use App\Models\Candidat\CandidatFormation;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

function diplomaFormationWithPdf(): array
{
    $candidat = Candidat::factory()->create();
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $candidat->id,
        'diploma_file' => 'candidat_diplomas/diploma.pdf',
    ]);

    Storage::disk('private')->put($formation->diploma_file, '%PDF-1.4 fake diploma content');

    return [$candidat, $formation];
}

beforeEach(function () {
    Storage::fake('private');
});

it('lets the owning candidate view their diploma inline', function () {
    [$candidat, $formation] = diplomaFormationWithPdf();

    $response = $this->actingAs($candidat->user)
        ->get(route('candidate.diploma', $formation));

    $response->assertOk()
        ->assertHeader('Content-Type', 'application/pdf')
        ->assertHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; sandbox")
        ->assertHeader('X-Content-Type-Options', 'nosniff');

    expect($response->headers->get('Cache-Control'))->toContain('no-store');
});

it('denies another candidate access to a diploma', function () {
    [, $formation] = diplomaFormationWithPdf();
    $otherCandidat = Candidat::factory()->create();

    $this->actingAs($otherCandidat->user)
        ->get(route('candidate.diploma', $formation))
        ->assertForbidden();
});

it('denies a recruiter access to a candidate diploma', function () {
    [, $formation] = diplomaFormationWithPdf();
    $recruiter = User::factory()->create(['role' => 'recruteur']);

    $this->actingAs($recruiter)
        ->get(route('candidate.diploma', $formation))
        ->assertForbidden();
});

it('lets an admin view any diploma via the admin route', function () {
    [, $formation] = diplomaFormationWithPdf();
    $admin = Admin::factory()->create();

    $response = $this->actingAs($admin, 'admin')
        ->get(route('admin.candidates.diploma', $formation));

    $response->assertOk()
        ->assertHeader('Content-Type', 'application/pdf')
        ->assertHeader('X-Content-Type-Options', 'nosniff');

    expect($response->headers->get('Cache-Control'))->toContain('no-store');
});

it('returns 404 when the formation has no diploma stored', function () {
    $candidat = Candidat::factory()->create();
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $candidat->id,
        'diploma_file' => null,
    ]);

    $this->actingAs($candidat->user)
        ->get(route('candidate.diploma', $formation))
        ->assertNotFound();
});

it('returns 404 when the diploma file no longer exists on disk', function () {
    [, $formation] = diplomaFormationWithPdf();
    Storage::disk('private')->delete($formation->diploma_file);

    $this->actingAs($formation->candidat->user)
        ->get(route('candidate.diploma', $formation))
        ->assertNotFound();
});

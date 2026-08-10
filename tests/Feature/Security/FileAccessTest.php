<?php

use App\Models\Candidat\CandidatFormation;
use App\Models\Candidat\Candidat;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('private');
});

test('candidate can download their own diploma', function () {
    $user = User::factory()->create(['role' => 'candidat']);
    $candidat = Candidat::factory()->create(['user_id' => $user->id]);
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $candidat->id,
        'diploma_file' => 'candidat_diplomas/diploma.pdf',
    ]);

    Storage::disk('private')->put('candidat_diplomas/diploma.pdf', 'fake content');

    $response = $this->actingAs($user)->get(route('candidate.diploma', $formation));

    $response->assertStatus(200);
    $response->assertHeader('Content-Disposition', 'attachment; filename=diploma.pdf');
});

test('candidate cannot download another candidate diploma', function () {
    $user1 = User::factory()->create(['role' => 'candidat']);
    $user2 = User::factory()->create(['role' => 'candidat']);

    $candidat2 = Candidat::factory()->create(['user_id' => $user2->id]);
    $formation2 = CandidatFormation::factory()->create([
        'candidat_id' => $candidat2->id,
        'diploma_file' => 'candidat_diplomas/diploma.pdf',
    ]);

    Storage::disk('private')->put('candidat_diplomas/diploma.pdf', 'fake content');

    $response = $this->actingAs($user1)->get(route('candidate.diploma', $formation2));

    $response->assertStatus(403);
});

test('unauthenticated user cannot access diploma', function () {
    $user = User::factory()->create(['role' => 'candidat']);
    $candidat = Candidat::factory()->create(['user_id' => $user->id]);
    $formation = CandidatFormation::factory()->create([
        'candidat_id' => $candidat->id,
        'diploma_file' => 'candidat_diplomas/diploma.pdf',
    ]);

    $response = $this->get(route('candidate.diploma', $formation));

    $response->assertRedirect(route('login'));
});

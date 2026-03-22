<?php

use App\Models\Candidat;
use App\Models\CandidatFormation;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('private');
});

test('candidate can view their own profile image', function () {
    $user = User::factory()->create(['role' => 'candidat']);
    $candidat = Candidat::factory()->create([
        'user_id' => $user->id,
        'image_url' => 'candidat_profiles/test.jpg',
    ]);

    Storage::disk('private')->put('candidat_profiles/test.jpg', 'fake content');

    $response = $this->actingAs($user)->get(route('candidate.profile-image', $candidat));

    $response->assertStatus(200);
});

test('candidate cannot view another candidate profile image', function () {
    $user1 = User::factory()->create(['role' => 'candidat']);
    $user2 = User::factory()->create(['role' => 'candidat']);

    $candidat2 = Candidat::factory()->create([
        'user_id' => $user2->id,
        'image_url' => 'candidat_profiles/test.jpg',
    ]);

    Storage::disk('private')->put('candidat_profiles/test.jpg', 'fake content');

    $response = $this->actingAs($user1)->get(route('candidate.profile-image', $candidat2));

    $response->assertStatus(403);
});

test('admin can view any profile image', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $user = User::factory()->create(['role' => 'candidat']);
    $candidat = Candidat::factory()->create([
        'user_id' => $user->id,
        'image_url' => 'candidat_profiles/test.jpg',
    ]);

    Storage::disk('private')->put('candidat_profiles/test.jpg', 'fake content');

    $response = $this->actingAs($admin)->get(route('candidate.profile-image', $candidat));

    $response->assertStatus(200);
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

test('unauthenticated user cannot access any private file', function () {
    $user = User::factory()->create(['role' => 'candidat']);
    $candidat = Candidat::factory()->create([
        'user_id' => $user->id,
        'image_url' => 'candidat_profiles/test.jpg',
    ]);

    $response = $this->get(route('candidate.profile-image', $candidat));

    $response->assertRedirect(route('login'));
});

<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\UpdateAccountRequest;
use App\Http\Requests\Candidate\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $candidat = $user->candidat()->first();

        return Inertia::render('candidate/Settings', [
            'candidat' => $candidat,
            'user' => $user->only(['id', 'email', 'telephone', 'role', 'is_active']),
            'experiences' => Inertia::defer(fn () => $candidat->experiences),
            'formations' => Inertia::defer(fn () => $candidat->formations),
            'specialisations' => Inertia::defer(fn () => $candidat->specialisations),
            'langues' => Inertia::defer(fn () => $candidat->langues),
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): RedirectResponse
    {
        $user = $request->user();
        $candidat = $user->candidat;

        $candidat->update($request->validated());

        // Update user is_active as well
        $user->update([
            'is_active' => $request->is_active,
        ]);

        return back()->with('success', 'Profil mis à jour avec succès.');
    }

    public function updateAccount(UpdateAccountRequest $request): RedirectResponse
    {
        $user = $request->user();
        $data = $request->validated();

        if (isset($data['password']) && ! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return back()->with('success', 'Informations de compte mises à jour.');
    }

    public function updateImage(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);

        $user = $request->user();
        $candidat = $user->candidat;

        $file = $request->file('image');
        $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs('candidat_profiles', $filename, 'private');

        $candidat->update([
            'image_url' => $path,
        ]);

        return back()->with('success', 'Photo de profil mise à jour.');
    }
}

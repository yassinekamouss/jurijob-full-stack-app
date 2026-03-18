<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $candidat = $user->candidat()->with([
            'specialisations',
            'domainExperiences',
            'langues',
            'typeTravails',
            'modeTravails',
            'villeTravails',
            'formations',
            'experiences',
        ])->first();

        return Inertia::render('candidate/Dashboard', [
            'candidat' => $candidat,
            'user' => $user->only(['id', 'email', 'telephone', 'role', 'is_active']),
        ]);
    }
}

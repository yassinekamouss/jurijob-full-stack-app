<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $recruteur = $user->recruteur()->first();

        return Inertia::render('recruiter/Dashboard', [
            'recruteur' => $recruteur,
            'user' => $user->only(['id', 'email', 'telephone', 'role', 'is_active']),
            'taxonomies' => \App\Repositories\TaxonomyRepository::getAll(),
        ]);
    }
}

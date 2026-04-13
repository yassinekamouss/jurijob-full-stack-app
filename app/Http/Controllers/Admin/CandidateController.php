<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidat\Candidat;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function index()
    {
        $candidates = Candidat::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/Candidats', [
            'candidates' => $candidates
        ]);
    }
}
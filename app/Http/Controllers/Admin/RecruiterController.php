<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Recruteur\Recruteur;
use Inertia\Inertia;

class RecruiterController extends Controller
{
    public function index()
    {
        $recruteurs = Recruteur::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/Recruteurs', [
            'recruteurs' => $recruteurs
        ]);
    }
}
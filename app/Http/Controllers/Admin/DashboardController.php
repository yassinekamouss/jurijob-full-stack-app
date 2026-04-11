<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidat;
use App\Models\Recruteur;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Totaux pour le Pie Chart
        $statsTotales = [
            'candidats' => Candidat::count(),
            'recruteurs' => Recruteur::count(),
        ];

        // 2. Croissance sur les 6 derniers mois (Compatible SQLite)
        // On récupère le compte groupé par mois
        $croissanceCandidats = Candidat::select(
            DB::raw("strftime('%m', created_at) as month"), 
            DB::raw("count(id) as total")
        )
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        $croissanceRecruteurs = Recruteur::select(
            DB::raw("strftime('%m', created_at) as month"), 
            DB::raw("count(user_id) as total")
        )
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        return Inertia::render('Admin/Dashboard', [
            'chartData' => [
                'totals' => $statsTotales,
                'growth' => [
                    'candidats' => $croissanceCandidats,
                    'recruteurs' => $croissanceRecruteurs,
                ]
            ]
        ]);
    }
}
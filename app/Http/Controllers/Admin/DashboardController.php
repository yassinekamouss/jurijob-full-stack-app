<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
public function index()
{
    $count = \App\Models\User::count();
    // dd($count);
    // 1. Totaux simples (Plus fiable que le groupBy pour débugger)
    $statsTotales = [
        'candidats' => \App\Models\User::where('role', 'candidat')->count(),
        'recruteurs' => \App\Models\User::where('role', 'recruteur')->count(),
    ];

    // 2. Croissance : on récupère tout et on groupe en PHP pour éviter les soucis SQLite strftime
    $allUsers = \App\Models\User::whereIn('role', ['candidat', 'recruteur'])->get();

    $growth = [
        'candidats' => $allUsers->where('role', 'candidat')
            ->groupBy(fn($u) => $u->created_at->format('m'))
            ->map(fn($group, $month) => ['month' => $month, 'total' => $group->count()])
            ->values(),
        'recruteurs' => $allUsers->where('role', 'recruteur')
            ->groupBy(fn($u) => $u->created_at->format('m'))
            ->map(fn($group, $month) => ['month' => $month, 'total' => $group->count()])
            ->values(),
    ];

    return \Inertia\Inertia::render('admin/Dashboard', [
        'chartData' => [
            'totals' => $statsTotales,
            'growth' => $growth
        ]
    ]);
}
}
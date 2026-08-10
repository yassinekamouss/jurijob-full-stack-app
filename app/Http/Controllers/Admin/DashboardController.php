<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $statsTotales = [
            'candidats' => User::where('role', 'candidat')->count(),
            'recruteurs' => User::where('role', 'recruteur')->count(),
        ];

        $allUsers = User::whereIn('role', ['candidat', 'recruteur'])->get();

        $growth = [
            'candidats' => $allUsers->where('role', 'candidat')
                ->groupBy(fn ($u) => $u->created_at->format('m'))
                ->map(fn ($group, $month) => ['month' => $month, 'total' => $group->count()])
                ->values(),
            'recruteurs' => $allUsers->where('role', 'recruteur')
                ->groupBy(fn ($u) => $u->created_at->format('m'))
                ->map(fn ($group, $month) => ['month' => $month, 'total' => $group->count()])
                ->values(),
        ];

        return Inertia::render('admin/Dashboard', [
            'chartData' => [
                'totals' => $statsTotales,
                'growth' => $growth,
            ],
        ]);
    }
}

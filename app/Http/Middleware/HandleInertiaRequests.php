<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
 public function share(Request $request): array
{
    $user = $request->user();
    $admin = $request->user('admin');

    return [
        ...parent::share($request),

        'name' => config('app.name'),

    'auth' => [
                'user' => $request->user() ? [
                // On ne charge les relations que si l'user est une instance du modèle User
                'data' => ($request->user() instanceof \App\Models\User) 
                            ? $request->user()->loadMissing(['candidat', 'recruteur']) 
                            : $request->user(),
                    ] : null,
                'admin' => $request->user('admin'), // Si vous utilisez un guard admin séparé
        ],

        'flash' => [
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
        ],

        'taxonomies' => \Inertia\Inertia::lazy(fn () => \App\Repositories\TaxonomyRepository::getAll()),

        'sidebarOpen' => ! $request->hasCookie('sidebar_state')
            || $request->cookie('sidebar_state') === 'true',
    ];
}
}

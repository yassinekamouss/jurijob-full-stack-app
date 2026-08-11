<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Repositories\TaxonomyRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
        $locale = app()->getLocale();

        $translationPath = lang_path("{$locale}.json");
        $translations = file_exists($translationPath)
            ? (json_decode(file_get_contents($translationPath), true) ?? [])
            : [];

        return [
            ...parent::share($request),

            'name' => config('app.name'),
            'locale' => $locale,
            'direction' => in_array($locale, ['ar'], true) ? 'rtl' : 'ltr',
            'translations' => $translations,

            'auth' => [
                'user' => $request->user() ? [
                    // On ne charge les relations que si l'user est une instance du modèle User
                    'data' => ($request->user() instanceof User)
                                ? $request->user()->loadMissing(['candidat', 'recruteur'])
                                : $request->user(),
                ] : null,
                'admin' => $request->user('admin'), // Si vous utilisez un guard admin séparé
            ],

            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],

            'taxonomies' => Inertia::lazy(fn () => TaxonomyRepository::getAll()),

            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
        ];
    }
}

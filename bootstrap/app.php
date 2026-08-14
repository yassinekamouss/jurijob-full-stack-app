<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\SetAppLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Spatie\ResponseCache\Middlewares\CacheResponse;
use Spatie\ResponseCache\Middlewares\DoNotCacheResponse;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => RoleMiddleware::class,
            'cacheResponse' => CacheResponse::class,
            'doNotCacheResponse' => DoNotCacheResponse::class,
        ]);

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state', 'locale']);

        $middleware->web(append: [
            SetAppLocale::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        // 1. Where to send GUESTS (Not logged in)
        $middleware->redirectTo(
            guests: function ($request) {
                if ($request->is('admin/*') || $request->is('admin')) {
                    return route('admin.login');
                }

                return route('login');
            }
        );

        // 2. Where to send AUTHENTICATED users (Already logged in)
        $middleware->redirectUsersTo(function () {
            if (Auth::guard('admin')->check()) {
                return route('admin.dashboard');
            }

            return route('dashboard');
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Gestion custom de l'erreur 405 (MethodNotAllowed)
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            if ($request->is('admin/offres/*/matching/custom')) {
                $offreId = $request->route('offre') ?? null;
                $url = $offreId ? route('admin.offres.matching', $offreId) : route('admin.offres.index');

                return redirect($url)->with('error', "La méthode utilisée n'est pas autorisée ici. Veuillez passer par le formulaire adapté.");
            }

            return response()->view('errors.405', [], 405);
        });
    })->create();

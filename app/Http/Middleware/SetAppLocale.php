<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

class SetAppLocale
{
    /**
     * Supported locales in the application.
     *
     * @var array<int, string>
     */
    public const SUPPORTED_LOCALES = ['fr', 'en'];

    /**
     * Default fallback locale.
     *
     * @var string
     */
    public const DEFAULT_LOCALE = 'fr';

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $this->determineLocale($request);

        app()->setLocale($locale);
        Carbon::setLocale($locale);

        $response = $next($request);

        return $response;
    }

    /**
     * Determine the appropriate locale for the request.
     */
    protected function determineLocale(Request $request): string
    {
        $locale = null;

        if ($request->has('lang') && in_array($request->query('lang'), self::SUPPORTED_LOCALES, true)) {
            $locale = (string) $request->query('lang');
            if ($request->hasSession()) {
                $request->session()->put('locale', $locale);
            }
        } elseif ($request->hasSession() && $request->session()->has('locale')) {
            $sessionLocale = (string) $request->session()->get('locale');
            if (in_array($sessionLocale, self::SUPPORTED_LOCALES, true)) {
                $locale = $sessionLocale;
            }
        } elseif ($request->hasCookie('locale')) {
            $cookieLocale = (string) $request->cookie('locale');
            if (in_array($cookieLocale, self::SUPPORTED_LOCALES, true)) {
                $locale = $cookieLocale;
            }
        }

        if (! $locale) {
            $locale = self::DEFAULT_LOCALE;
        }

        return $locale;
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Middleware\SetAppLocale;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LocaleController extends Controller
{
    /**
     * Update the application locale in session and cookie.
     */
    public function update(Request $request, string $locale): RedirectResponse
    {
        if (! in_array($locale, SetAppLocale::SUPPORTED_LOCALES, true)) {
            $locale = SetAppLocale::DEFAULT_LOCALE;
        }

        $request->session()->put('locale', $locale);
        app()->setLocale($locale);

        $cookie = cookie()->forever('locale', $locale);

        return back()->withCookie($cookie);
    }
}

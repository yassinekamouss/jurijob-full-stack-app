<?php

namespace App\Http\CacheProfiles;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\ResponseCache\CacheProfiles\CacheAllSuccessfulGetRequests;

class InertiaResponseCacheProfile extends CacheAllSuccessfulGetRequests
{
    public function shouldCacheRequest(Request $request): bool
    {
        if (Auth::check()) {
            return false;
        }

        if ($request->header('X-Inertia')) {
            return false;
        }

        return parent::shouldCacheRequest($request);
    }

    public function useCacheNameSuffix(Request $request): string
    {
        $suffix = parent::useCacheNameSuffix($request);
        $locale = app()->getLocale();
        $suffix .= "-{$locale}";

        if ($request->header('X-Inertia')) {
            $suffix .= '-inertia';
        }

        return $suffix;
    }
}

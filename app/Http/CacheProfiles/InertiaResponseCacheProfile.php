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
}

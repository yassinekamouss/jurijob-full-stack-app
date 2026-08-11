<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;
use Symfony\Component\HttpFoundation\Response;

class PasswordConfirmedResponse implements PasswordConfirmedResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  Request  $request
     */
    public function toResponse($request): Response
    {
        $user = Auth::user();
        $home = '/';

        if ($user) {
            if ($user->role === 'recruteur') {
                $home = route('recruteur.settings', ['tab' => 'security'], false);
            } elseif ($user->role === 'candidat') {
                $home = route('candidate.settings', ['tab' => 'security'], false);
            }
        }

        $intended = session('url.intended');
        if ($intended && Str::contains($intended, '/user/two-factor-authentication')) {
            session()->forget('url.intended');
        }

        return $request->wantsJson()
            ? new JsonResponse('', 201)
            : redirect()->intended($home);
    }
}

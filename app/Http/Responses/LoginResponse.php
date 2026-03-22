<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $role = Auth::user()->role;
        $home = '/';

        if ($role === 'recruteur') {
            $home = route('recruteur.dashboard', [], false);
        } elseif ($role === 'candidat') {
            $home = route('candidate.dashboard', [], false);
        }

        return $request->wantsJson()
            ? response()->json(['two_factor' => false])
            : redirect()->intended($home);
    }
}

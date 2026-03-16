<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CheckEmailController extends Controller
{
    /**
     * Check whether an email address is already registered.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required', 'string', 'email']]);

        $exists = User::where('email', $request->string('email'))->exists();

        if ($exists) {
            return response()->json(['message' => 'Cet email est déjà associé à un compte.'], 409);
        }

        return response()->json(['available' => true]);
    }
}

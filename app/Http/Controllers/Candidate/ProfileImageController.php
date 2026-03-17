<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProfileImageController extends Controller
{
    /**
     * Serve a candidate profile image from private storage with security checks.
     */
    public function __invoke(Request $request, string $filename): StreamedResponse
    {
        $path = "candidat_profiles/{$filename}";

        if (! Storage::disk('local')->exists($path)) {
            abort(404, 'Image not found.');
        }

        return Storage::disk('local')->response($path);
    }
}

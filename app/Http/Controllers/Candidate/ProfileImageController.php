<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidat;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProfileImageController extends Controller
{
    use AuthorizesRequests;

    /**
     * Serve a candidate profile image from private storage with security checks.
     */
    public function __invoke(Candidat $candidat): StreamedResponse
    {
        $this->authorize('view', $candidat);

        if (! $candidat->image_url || ! Storage::disk('private')->exists($candidat->image_url)) {
            abort(404, 'Image not found.');
        }

        return Storage::disk('private')->response($candidat->image_url);
    }
}

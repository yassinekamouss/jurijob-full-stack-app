<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\Candidat\CandidatFormation;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DiplomaController extends Controller
{
    use AuthorizesRequests;

    /**
     * Serve a candidate diploma/attestation PDF with authorization checks.
     *
     * Accessible only by the owning candidate (web guard) or by an admin
     * (admin guard). The file is streamed inline from the private disk with
     * hardened headers, so it is never exposed through a public URL.
     */
    public function __invoke(CandidatFormation $formation): StreamedResponse
    {
        $this->authorizeView($formation);

        $path = $formation->diploma_file;

        if ($path === null || ! Storage::disk('private')->exists($path)) {
            abort(404, 'Attestation/diplôme introuvable.');
        }

        return Storage::disk('private')->response(
            $path,
            basename($path),
            [
                'Content-Type' => 'application/pdf',
                'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
                'Content-Security-Policy' => "default-src 'none'; style-src 'unsafe-inline'; sandbox",
                'X-Content-Type-Options' => 'nosniff',
            ],
            'inline'
        );
    }

    private function authorizeView(CandidatFormation $formation): void
    {
        $admin = Auth::guard('admin')->user();
        $user = Auth::guard('web')->user();

        if ($admin instanceof Authenticatable) {
            return;
        }

        if ($user instanceof User) {
            $this->authorize('view', $formation);

            return;
        }

        abort(403);
    }
}

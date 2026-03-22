<?php

namespace App\Http\Controllers\Candidate;

use App\Http\Controllers\Controller;
use App\Models\CandidatFormation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DiplomaController extends Controller
{
    use AuthorizesRequests;

    /**
     * Download a diploma file from private storage with security checks.
     */
    public function __invoke(CandidatFormation $formation): StreamedResponse
    {
        $this->authorize('view', $formation);

        if (! $formation->diploma_file || ! Storage::disk('private')->exists($formation->diploma_file)) {
            abort(404, 'Diploma file not found.');
        }

        return Storage::disk('private')->download($formation->diploma_file);
    }
}

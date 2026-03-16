<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadPrivateFileController extends Controller
{
    /**
     * Download a file from private storage.
     * Accessible only to authorized users (you should add middleware to this route).
     */
    public function __invoke(Request $request): StreamedResponse|JsonResponse
    {
        $path = $request->query('path');

        if (! $path || ! Storage::disk('local')->exists($path)) {
            return response()->json(['message' => 'File not found.'], 404);
        }

        // Add additional authorization checks here if needed
        // e.g., Ensure the authenticated user owns this file's path.

        return Storage::disk('local')->download($path);
    }
}

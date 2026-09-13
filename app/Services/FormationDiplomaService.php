<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class FormationDiplomaService
{
    /**
     * Store a diploma/attestation PDF on the private disk.
     *
     * The filename is a UUID so the original name is never used, which prevents
     * path traversal and filename collisions.
     */
    public function store(UploadedFile $file): string
    {
        $filename = Str::uuid().'.pdf';

        return $file->storeAs('candidat_diplomas', $filename, ['disk' => 'private']);
    }
}

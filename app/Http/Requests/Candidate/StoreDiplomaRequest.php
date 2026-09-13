<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiplomaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'diploma_file' => ['required', 'file', 'mimes:pdf', 'mimetypes:application/pdf', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'diploma_file.required' => 'Veuillez sélectionner un fichier PDF.',
            'diploma_file.max' => 'L\'attestation/diplôme ne doit pas dépasser 5 Mo.',
            'diploma_file.mimes' => 'L\'attestation/diplôme doit être un fichier PDF.',
            'diploma_file.mimetypes' => 'L\'attestation/diplôme doit être un fichier PDF.',
            'diploma_file.file' => 'Le fichier n\'a pas pu être téléversé. Vérifiez qu\'il fait moins de 5 Mo et est au format PDF.',
        ];
    }
}

<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'formation_juridique_id' => ['required', 'integer', 'exists:formation_juridiques,id'],
            'specialisation_id' => ['required', 'integer', 'exists:specialisations,id'],
            'ecole_id' => ['nullable', 'integer', 'exists:ecoles,id'],
            'autre_ecole' => ['required_without:ecole_id', 'nullable', 'string', 'max:255'],
            'annee_debut' => ['required', 'date_format:Y-m'],
            'annee_fin' => ['nullable', 'date_format:Y-m', 'after_or_equal:annee_debut'],
            'diploma_file' => ['nullable', 'file', 'mimes:pdf', 'mimetypes:application/pdf', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'annee_fin.after_or_equal' => 'L\'année de fin doit être postérieure ou égale à l\'année de début.',
            'diploma_file.max' => 'L\'attestation/diplôme ne doit pas dépasser 5 Mo.',
            'diploma_file.mimes' => 'L\'attestation/diplôme doit être un fichier PDF.',
            'diploma_file.mimetypes' => 'L\'attestation/diplôme doit être un fichier PDF.',
            'diploma_file.file' => 'Le fichier du diplôme n\'a pas pu être téléversé. Vérifiez qu\'il fait moins de 5 Mo et est au format PDF.',
        ];
    }
}

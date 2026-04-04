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
            'ecole_id' => ['required', 'integer', 'exists:ecoles,id'],
            'annee_debut' => ['required', 'date_format:Y-m'],
            'annee_fin' => ['nullable', 'date_format:Y-m', 'after_or_equal:annee_debut'],
            'diploma_file' => ['nullable', 'file', 'mimes:pdf,jpg,png', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'annee_fin.gte' => 'L\'année de fin doit être postérieure ou égale à l\'année de début.',
            'diploma_file.max' => 'Le fichier du diplôme ne doit pas dépasser 5 Mo.',
            'diploma_file.mimes' => 'Le fichier du diplôme doit être au format PDF, JPG ou PNG.',
            'diploma_file.file' => 'Le fichier du diplôme n\'a pas pu être uploadé. Vérifiez qu\'il fait moins de 5 Mo et est au format PDF, JPG ou PNG.',
        ];
    }
}

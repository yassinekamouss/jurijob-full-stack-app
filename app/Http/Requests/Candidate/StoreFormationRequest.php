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
            'niveau' => ['required', 'integer', 'exists:formation_juridiques,id'],
            'domaine' => ['required', 'integer', 'exists:specialisations,id'],
            'ecole' => ['required', 'integer', 'exists:ecoles,id'],
            'annee_debut' => ['required', 'date_format:Y-m'],
            'annee_fin' => ['nullable', 'date_format:Y-m', 'after_or_equal:annee_debut'],
            'diploma_file' => ['nullable', 'file', 'mimes:pdf,jpg,png', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'annee_fin.gte' => 'L\'année de fin doit être postérieure ou égale à l\'année de début.',
        ];
    }
}

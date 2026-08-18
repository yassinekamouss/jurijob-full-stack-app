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
        ];
    }

    public function messages(): array
    {
        return [
            'annee_fin.after_or_equal' => 'L\'année de fin doit être postérieure ou égale à l\'année de début.',
        ];
    }
}

<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SyncSpecialisationsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === 'candidat' && $this->user()->candidat;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'specialisation_ids' => ['required', 'array', 'min:1'],
            'specialisation_ids.*' => ['integer', 'exists:specialisations,id'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'specialisation_ids.required' => 'Veuillez sélectionner au moins une spécialisation.',
            'specialisation_ids.min' => 'Veuillez sélectionner au moins une spécialisation.',
            'specialisation_ids.*.exists' => 'Une spécialisation sélectionnée est invalide.',
        ];
    }
}

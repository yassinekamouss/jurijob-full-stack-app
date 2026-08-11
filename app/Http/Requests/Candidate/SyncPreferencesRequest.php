<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SyncPreferencesRequest extends FormRequest
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
            'ville_ids' => ['required', 'array', 'min:1'],
            'ville_ids.*' => ['integer', 'exists:villes,id'],
            'mode_travail_ids' => ['required', 'array', 'min:1'],
            'mode_travail_ids.*' => ['integer', 'exists:mode_travails,id'],
            'type_travail_ids' => ['required', 'array', 'min:1'],
            'type_travail_ids.*' => ['integer', 'exists:type_travails,id'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'ville_ids.required' => 'Veuillez sélectionner au moins une ville.',
            'ville_ids.min' => 'Veuillez sélectionner au moins une ville.',
            'ville_ids.*.exists' => 'Une ville sélectionnée est invalide.',
            'mode_travail_ids.required' => 'Veuillez sélectionner au moins un mode de travail.',
            'mode_travail_ids.min' => 'Veuillez sélectionner au moins un mode de travail.',
            'mode_travail_ids.*.exists' => 'Un mode de travail sélectionné est invalide.',
            'type_travail_ids.required' => 'Veuillez sélectionner au moins un type de travail.',
            'type_travail_ids.min' => 'Veuillez sélectionner au moins un type de travail.',
            'type_travail_ids.*.exists' => 'Un type de travail sélectionné est invalide.',
        ];
    }
}

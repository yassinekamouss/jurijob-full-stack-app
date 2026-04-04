<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'poste_id' => ['required', 'integer', 'exists:postes,id'],
            'entreprise' => ['required', 'string', 'max:255'],
            'debut' => ['required', 'date_format:Y-m'],
            'fin' => ['nullable', 'date_format:Y-m', 'after_or_equal:debut'],
            'type_travail_id' => ['nullable', 'integer', 'exists:type_travails,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'fin.after_or_equal' => 'La date de fin doit être postérieure ou égale à la date de début.',
        ];
    }
}

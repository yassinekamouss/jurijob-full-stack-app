<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === 'candidat' && $this->user()->candidat;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'poste_id' => ['required', 'integer', 'exists:postes,id'],
            'niveau_experience_id' => ['required', 'integer', 'exists:niveau_experiences,id'],
            'formation_juridique_id' => ['required', 'integer', 'exists:formation_juridiques,id'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}

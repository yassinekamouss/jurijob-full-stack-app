<?php

namespace App\Http\Requests\Candidate;

use App\Rules\ValidPhoneNumber;
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
            'poste_id' => ['required', 'array', 'min:1'],
            'poste_id.*' => ['integer', 'exists:postes,id'],
            'niveau_experience_id' => ['required', 'integer', 'exists:niveau_experiences,id'],
            'formation_juridique_id' => ['required', 'integer', 'exists:formation_juridiques,id'],
            'salaire_id' => ['required', 'integer', 'exists:salaires,id'],
            'urgence_id' => ['required', 'integer', 'exists:urgences,id'],
            'telephone' => ['nullable', 'string', 'max:20', new ValidPhoneNumber],
            'is_active' => ['required', 'boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est requis.',
            'prenom.required' => 'Le prénom est requis.',
            'poste_id.required' => 'Veuillez sélectionner au moins un poste.',
            'poste_id.min' => 'Veuillez sélectionner au moins un poste.',
            'poste_id.*.exists' => 'Le poste sélectionné est invalide.',
            'niveau_experience_id.required' => 'Veuillez sélectionner un niveau d\'expérience.',
            'niveau_experience_id.exists' => 'Le niveau d\'expérience sélectionné est invalide.',
            'formation_juridique_id.required' => 'Veuillez sélectionner une formation.',
            'formation_juridique_id.exists' => 'La formation sélectionnée est invalide.',
            'salaire_id.required' => 'Veuillez sélectionner un salaire souhaité.',
            'salaire_id.exists' => 'La fourchette salariale sélectionnée est invalide.',
            'urgence_id.required' => 'Veuillez indiquer votre disponibilité.',
            'urgence_id.exists' => 'La disponibilité sélectionnée est invalide.',
        ];
    }
}

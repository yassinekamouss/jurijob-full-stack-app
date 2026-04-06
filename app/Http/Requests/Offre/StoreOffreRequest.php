<?php

namespace App\Http\Requests\Offre;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOffreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->recruteur()->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'poste_id' => 'required|exists:postes,id',
            'type_travail_id' => 'required|exists:type_travails,id',
            'niveau_experience_id' => 'required|exists:niveau_experiences,id',
            'statut' => 'nullable|string|in:ouvert,fermé',
            'requirements' => 'nullable|array',
            'requirements.*.taxonomy_id' => 'required|integer',
            'requirements.*.taxonomy_type' => 'required|string',
            'requirements.*.importance' => [
                'required',
                Rule::in(['indispensable', 'important', 'souhaitable', 'facultatif']),
            ],
            'requirements.*.requirements_data' => 'nullable|array',
        ];
    }
}

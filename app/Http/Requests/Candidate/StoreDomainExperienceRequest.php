<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class StoreDomainExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'domaine_experience_id' => ['required', 'integer', 'exists:domaine_experiences,id'],
        ];
    }
}

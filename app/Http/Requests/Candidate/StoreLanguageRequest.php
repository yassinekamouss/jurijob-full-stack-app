<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class StoreLanguageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'langue_id' => ['required', 'integer', 'exists:langues,id'],
            'niveau_langue_id' => ['required', 'integer', 'exists:niveau_langues,id'],
        ];
    }
}

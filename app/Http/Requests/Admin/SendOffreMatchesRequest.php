<?php

namespace App\Http\Requests\Admin;

use App\Enums\OffreStatut;
use App\Models\Offre\Offre;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class SendOffreMatchesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user('admin') !== null;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Offre $offre */
        $offre = $this->route('offre');

        return [
            'candidat_ids' => [
                'required',
                'array',
                'min:1',
                'max:'.$offre->nombre_cv,
            ],
            'candidat_ids.*' => [
                'required',
                'integer',
                'distinct',
                'exists:candidats,id',
            ],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        /** @var Offre $offre */
        $offre = $this->route('offre');

        return [
            'candidat_ids.required' => 'Sélectionnez les candidats à envoyer.',
            'candidat_ids.min' => 'Sélectionnez au moins un candidat.',
            'candidat_ids.max' => 'Vous ne pouvez pas sélectionner plus de '.$offre->nombre_cv.' candidat(s).',
            'candidat_ids.*.distinct' => 'Chaque candidat ne peut être sélectionné qu\'une seule fois.',
            'candidat_ids.*.exists' => 'Un des candidats sélectionnés est invalide.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            /** @var Offre $offre */
            $offre = $this->route('offre');

            if ($offre->statut !== OffreStatut::EnTraitement->value) {
                $validator->errors()->add(
                    'offre',
                    'Seules les offres en traitement peuvent recevoir un matching.'
                );
            }
        });
    }
}

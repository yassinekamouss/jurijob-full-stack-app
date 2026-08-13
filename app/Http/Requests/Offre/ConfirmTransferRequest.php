<?php

namespace App\Http\Requests\Offre;

use App\Enums\OffreStatut;
use App\Models\Offre\Offre;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ConfirmTransferRequest extends FormRequest
{
    public function authorize(): bool
    {
        /** @var Offre $offre */
        $offre = $this->route('offre');

        return $offre !== null && $this->user()?->can('view', $offre) === true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'offre' => 'Seules les offres en attente de paiement peuvent être confirmées.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            /** @var Offre $offre */
            $offre = $this->route('offre');

            if ($offre->statut !== OffreStatut::AttentePaiement->value) {
                $validator->errors()->add(
                    'offre',
                    'Seules les offres en attente de paiement peuvent être confirmées.'
                );
            }
        });
    }
}

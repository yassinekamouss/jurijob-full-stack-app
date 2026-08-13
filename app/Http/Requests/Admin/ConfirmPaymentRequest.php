<?php

namespace App\Http\Requests\Admin;

use App\Models\Offre\Offre;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ConfirmPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user('admin') !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            /** @var Offre $offre */
            $offre = $this->route('offre');

            if ($offre->statut !== 'VERIFICATION_PAIEMENT') {
                $validator->errors()->add(
                    'offre',
                    'Seules les offres en vérification de paiement peuvent être confirmées.'
                );
            }
        });
    }
}

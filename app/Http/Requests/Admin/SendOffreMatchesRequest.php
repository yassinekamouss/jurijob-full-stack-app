<?php

namespace App\Http\Requests\Admin;

use App\Enums\OffreStatut;
use App\Models\Candidat\Candidat;
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
            'candidates' => [
                'required',
                'array',
                'min:1',
                'max:'.$offre->nombre_cv,
            ],
            'candidates.*.id' => [
                'required',
                'integer',
                'distinct',
                'exists:candidats,id',
            ],
            'candidates.*.score' => [
                'required',
                'integer',
                'min:0',
                'max:100',
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
            'candidates.required' => 'Sélectionnez les candidats à envoyer.',
            'candidates.min' => 'Sélectionnez au moins un candidat.',
            'candidates.max' => 'Vous ne pouvez pas sélectionner plus de '.$offre->nombre_cv.' candidat(s).',
            'candidates.*.id.required' => 'Chaque candidat sélectionné est invalide.',
            'candidates.*.id.integer' => 'Chaque candidat sélectionné est invalide.',
            'candidates.*.id.distinct' => 'Chaque candidat ne peut être sélectionné qu\'une seule fois.',
            'candidates.*.id.exists' => 'Un des candidats sélectionnés est invalide.',
            'candidates.*.score.required' => 'Le score de chaque candidat est obligatoire.',
            'candidates.*.score.integer' => 'Le score doit être un nombre entier.',
            'candidates.*.score.min' => 'Le score doit être supérieur ou égal à 0.',
            'candidates.*.score.max' => 'Le score doit être inférieur ou égal à 100.',
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

            $this->validateCandidateEligibility($validator);
        });
    }

    /**
     * Ensure every selected candidate is accepted and its account active.
     */
    private function validateCandidateEligibility(Validator $validator): void
    {
        $candidateIds = collect($this->input('candidates', []))
            ->pluck('id')
            ->unique()
            ->values();

        if ($candidateIds->isEmpty()) {
            return;
        }

        $eligibleIds = Candidat::query()
            ->whereIn('id', $candidateIds)
            ->where('status', 'accepte')
            ->whereHas('user', fn ($query) => $query->where('is_active', true))
            ->pluck('id')
            ->all();

        $invalidIds = $candidateIds->reject(fn ($id) => in_array((int) $id, $eligibleIds, true));

        if ($invalidIds->isNotEmpty()) {
            $validator->errors()->add(
                'candidates',
                'Certains candidats sélectionnés ne sont plus éligibles.'
            );
        }
    }
}

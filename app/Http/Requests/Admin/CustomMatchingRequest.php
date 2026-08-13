<?php

namespace App\Http\Requests\Admin;

use App\Enums\OffreStatut;
use App\Models\Offre\Offre;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Validator;

class CustomMatchingRequest extends FormRequest
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
        return [
            'poste_id' => ['nullable', 'integer', 'exists:postes,id'],
            'niveau_experience_id' => ['nullable', 'integer', 'exists:niveau_experiences,id'],
            'formation_juridique_id' => ['nullable', 'integer', 'exists:formation_juridiques,id'],
            'salaire_id' => ['nullable', 'integer', 'exists:salaires,id'],
            'ville_id' => ['nullable', 'integer', 'exists:villes,id'],
            'type_travail_id' => ['nullable', 'integer', 'exists:type_travails,id'],
            'mode_travail_id' => ['nullable', 'integer', 'exists:mode_travails,id'],
            'requirements' => ['nullable', 'array'],
            'requirements.*.taxonomy_type' => ['required', 'string', 'in:LANGUE,SPECIALISATION'],
            'requirements.*.taxonomy_id' => ['required', 'integer'],
            'requirements.*.metadata' => ['nullable', 'array'],
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
                    'Seules les offres en traitement peuvent être matchées.'
                );
            }

            $this->validateRequirementReferences($validator);
        });
    }

    /**
     * Ensure every language / specialisation id actually exists in the taxonomy tables.
     */
    private function validateRequirementReferences(Validator $validator): void
    {
        $requirements = $this->input('requirements', []);

        if (! is_array($requirements)) {
            return;
        }

        $langueIds = collect($requirements)
            ->where('taxonomy_type', 'LANGUE')
            ->pluck('taxonomy_id')
            ->unique();

        $specialisationIds = collect($requirements)
            ->where('taxonomy_type', 'SPECIALISATION')
            ->pluck('taxonomy_id')
            ->unique();

        $validLangueIds = DB::table('langues')->whereIn('id', $langueIds)->pluck('id')->all();
        $validSpecialisationIds = DB::table('specialisations')->whereIn('id', $specialisationIds)->pluck('id')->all();

        foreach ($requirements as $index => $requirement) {
            $exists = $requirement['taxonomy_type'] === 'LANGUE'
                ? in_array($requirement['taxonomy_id'], $validLangueIds, true)
                : in_array($requirement['taxonomy_id'], $validSpecialisationIds, true);

            if (! $exists) {
                $validator->errors()->add(
                    "requirements.{$index}.taxonomy_id",
                    'Le critère sélectionné est invalide.'
                );
            }
        }
    }
}

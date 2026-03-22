<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use App\Services\RegistrationService;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Create a new instance of the action.
     */
    public function __construct(
        protected RegistrationService $registrationService
    ) {}

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): User
    {
        // Require role first to determine registration flow
        Validator::make($input, [
            'role' => ['required', 'string', 'in:candidat,recruteur'],
        ])->validate();

        if ($input['role'] === 'candidat') {
            return $this->createCandidat($input);
        }

        return $this->createRecruteur($input);
    }

    /**
     * Validate and create a new candidat.
     */
    protected function createCandidat(array $input): User
    {
        Validator::make($input, [
            // User rules
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => $this->passwordRules(),
            'telephone' => ['nullable', 'string', 'max:20', 'regex:/^\+?[0-9]*$/'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],

            // Candidat rules
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'poste_recherche' => ['required', 'string', 'max:255'],
            'niveau_experience' => ['required', 'string', 'max:255'],
            'formation_juridique' => ['required', 'string', 'max:255'],

            // Relationships
            'specialisations' => ['nullable', 'array'],
            'specialisations.*.specialisation' => ['required_with:specialisations', 'string', 'max:255'],

            'domain_experiences' => ['nullable', 'array'],
            'domain_experiences.*.domain_experience' => ['required_with:domain_experiences', 'string', 'max:255'],

            'langues' => ['nullable', 'array'],
            'langues.*.nom' => ['required_with:langues', 'string', 'max:255'],
            'langues.*.niveau' => ['required_with:langues', 'string', 'max:255'],

            'type_travails' => ['nullable', 'array'],
            'type_travails.*.type_travail' => ['required_with:type_travails', 'string', 'max:255'],

            'mode_travails' => ['nullable', 'array'],
            'mode_travails.*.mode_travail' => ['required_with:mode_travails', 'string', 'max:255'],

            'ville_travails' => ['nullable', 'array'],
            'ville_travails.*.ville' => ['required_with:ville_travails', 'string', 'max:255'],

            'experiences' => ['nullable', 'array'],
            'experiences.*.debut' => ['required_with:experiences', 'date_format:Y-m'],
            'experiences.*.fin' => ['nullable', 'date_format:Y-m', 'after_or_equal:experiences.*.debut'],
            'experiences.*.type' => ['required_with:experiences', 'string', 'max:255'],
            'experiences.*.entreprise' => ['required_with:experiences', 'string', 'max:255'],
            'experiences.*.poste' => ['required_with:experiences', 'string', 'max:255'],

            'formations' => ['nullable', 'array'],
            'formations.*.annee_debut' => ['required_with:formations', 'date_format:Y-m'],
            'formations.*.annee_fin' => ['nullable', 'date_format:Y-m', 'after_or_equal:formations.*.annee_debut'],
            'formations.*.niveau' => ['required_with:formations', 'string', 'max:255'],
            'formations.*.domaine' => ['required_with:formations', 'string', 'max:255'],
            'formations.*.ecole' => ['required_with:formations', 'string', 'max:255'],
            'formations.*.diploma_file' => ['required_with:formations', 'file', 'mimes:pdf,jpg,png,jpeg', 'max:5120'],
        ], [
            'telephone.regex' => 'Le numéro de téléphone doit contenir uniquement des chiffres et éventuellement un + au début.',
            'experiences.*.fin.after_or_equal' => 'La date de fin de l\'expérience doit être postérieure ou égale à la date de début.',
            'formations.*.annee_fin.gte' => 'L\'année de fin de la formation doit être postérieure ou égale à l\'année de début.',
        ])->validate();

        return $this->registrationService->registerCandidat($input);
    }

    /**
     * Validate and create a new recruteur.
     */
    protected function createRecruteur(array $input): User
    {
        Validator::make($input, [
            // User rules
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => $this->passwordRules(),
            'telephone' => ['nullable', 'string', 'max:20', 'regex:/^\+?[0-9]*$/'],

            // Recruteur rules
            'nom_entreprise' => ['required', 'string', 'max:255'],
            'type_organisation' => ['required', 'string', 'max:255'],
            'taille_entreprise' => ['required', 'string', 'max:255'],
            'ville' => ['required', 'string', 'max:255'],
            'site_web' => ['nullable', 'string', 'max:255', 'url'],
            'poste' => ['nullable', 'string', 'max:255'],
        ], [
            'telephone.regex' => 'Le numéro de téléphone doit contenir uniquement des chiffres et éventuellement un + au début.',
        ])->validate();

        return $this->registrationService->registerRecruteur($input);
    }
}

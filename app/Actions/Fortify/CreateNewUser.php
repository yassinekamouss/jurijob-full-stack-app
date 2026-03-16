<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

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

        if ($input['role'] === 'recruteur') {
            return $this->createRecruteur($input);
        }

        abort(400, 'Invalid module');
    }

    protected function createCandidat(array $input): User
    {
        Validator::make($input, [
            // User rules
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => $this->passwordRules(),
            'telephone' => ['nullable', 'string', 'max:20'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],

            // Candidat rules
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'poste_recherche' => ['required', 'string', 'max:255'],
            'niveau_experience' => ['required', 'string', 'max:255'],
            'formation_juridique' => ['required', 'string', 'max:255'],

            // HasMany relationships mapping
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
            'experiences.*.debut' => ['nullable', 'string', 'max:255'],
            'experiences.*.fin' => ['nullable', 'string', 'max:255'],
            'experiences.*.type' => ['required_with:experiences', 'string', 'max:255'],
            'experiences.*.entreprise' => ['required_with:experiences', 'string', 'max:255'],
            'experiences.*.poste' => ['required_with:experiences', 'string', 'max:255'],

            'formations' => ['nullable', 'array'],
            'formations.*.annee_debut' => ['nullable', 'string', 'max:255'],
            'formations.*.annee_fin' => ['nullable', 'string', 'max:255'],
            'formations.*.niveau' => ['required_with:formations', 'string', 'max:255'],
            'formations.*.domaine' => ['required_with:formations', 'string', 'max:255'],
            'formations.*.ecole' => ['required_with:formations', 'string', 'max:255'],
            'formations.*.diploma_file' => ['required_with:formations', 'file', 'mimes:pdf,jpg,png,jpeg', 'max:5120'],
        ])->validate();

        return DB::transaction(function () use ($input) {
            $imageUrl = null;
            if (isset($input['image_file']) && $input['image_file'] instanceof UploadedFile) {
                $imageUrl = $input['image_file']->store('candidat_profiles', 'local');
            }

            $user = User::create([
                'telephone' => $input['telephone'] ?? null,
                'email' => $input['email'],
                'password' => Hash::make($input['password']),
                'image_url' => $imageUrl,
                'role' => 'candidat',
                'is_active' => true,
                'is_archived' => false,
            ]);

            $candidat = $user->candidat()->create([
                'nom' => $input['nom'],
                'prenom' => $input['prenom'],
                'poste_recherche' => $input['poste_recherche'],
                'niveau_experience' => $input['niveau_experience'],
                'formation_juridique' => $input['formation_juridique'],
            ]);

            if (! empty($input['specialisations'])) {
                $candidat->specialisations()->createMany($input['specialisations']);
            }

            if (! empty($input['domain_experiences'])) {
                $candidat->domainExperiences()->createMany($input['domain_experiences']);
            }

            if (! empty($input['langues'])) {
                $candidat->langues()->createMany($input['langues']);
            }

            if (! empty($input['type_travails'])) {
                $candidat->typeTravails()->createMany($input['type_travails']);
            }

            if (! empty($input['mode_travails'])) {
                $candidat->modeTravails()->createMany($input['mode_travails']);
            }

            if (! empty($input['ville_travails'])) {
                $candidat->villeTravails()->createMany($input['ville_travails']);
            }

            if (! empty($input['experiences'])) {
                $candidat->experiences()->createMany($input['experiences']);
            }

            if (! empty($input['formations'])) {
                $formationsData = [];
                foreach ($input['formations'] as $formation) {
                    $diplomaPath = null;
                    if (isset($formation['diploma_file']) && $formation['diploma_file'] instanceof UploadedFile) {
                        $diplomaPath = $formation['diploma_file']->store('candidat_diplomas', 'local');
                    }

                    $formationsData[] = [
                        'annee_debut' => $formation['annee_debut'] ?? null,
                        'annee_fin' => $formation['annee_fin'] ?? null,
                        'niveau' => $formation['niveau'],
                        'domaine' => $formation['domaine'],
                        'ecole' => $formation['ecole'],
                        'diploma_file' => $diplomaPath ?? $formation['diploma_file'] ?? null,
                    ];
                }
                $candidat->formations()->createMany($formationsData);
            }

            return $user;
        });
    }

    protected function createRecruteur(array $input): User
    {
        Validator::make($input, [
            // User rules
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => $this->passwordRules(),
            'telephone' => ['nullable', 'string', 'max:20'],

            // Recruteur rules
            'nom_entreprise' => ['required', 'string', 'max:255'],
            'type_organisation' => ['required', 'string', 'max:255'],
            'taille_entreprise' => ['required', 'string', 'max:255'],
            'ville' => ['required', 'string', 'max:255'],
            'site_web' => ['nullable', 'string', 'max:255', 'url'],
            'poste' => ['nullable', 'string', 'max:255'],
        ])->validate();

        return DB::transaction(function () use ($input) {
            $user = User::create([
                'telephone' => $input['telephone'] ?? null,
                'email' => $input['email'],
                'password' => Hash::make($input['password']),
                'role' => 'recruteur',
                'is_active' => true,
                'is_archived' => false,
            ]);

            $user->recruteur()->create([
                'nom_entreprise' => $input['nom_entreprise'],
                'type_organisation' => $input['type_organisation'],
                'taille_entreprise' => $input['taille_entreprise'],
                'ville' => $input['ville'],
                'site_web' => $input['site_web'] ?? null,
                'poste' => $input['poste'] ?? null,
            ]);

            return $user;
        });
    }
}

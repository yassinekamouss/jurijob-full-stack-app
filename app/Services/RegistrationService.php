<?php

namespace App\Services;

use App\Models\Candidat\Candidat;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RegistrationService
{
    /**
     * Register a new candidat and their profile.
     *
     * @param  array<string, mixed>  $data
     */
    public function registerCandidat(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $imageUrl = $this->handleFileUpload(
                $data['image_file'] ?? null,
                'candidat_profiles'
            );

            $user = User::create([
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'telephone' => $data['telephone'] ?? null,
                'role' => 'candidat',
                'is_active' => true,
                'is_archived' => false,
            ]);

            $candidat = $user->candidat()->create([
                'nom' => $data['nom'],
                'prenom' => $data['prenom'],
                'poste_id' => $data['poste_recherche'],
                'niveau_experience_id' => $data['niveau_experience'],
                'formation_juridique_id' => $data['formation_juridique'],
                'image_url' => $imageUrl,
            ]);

            $this->syncCandidatRelations($candidat, $data);

            return $user;
        });
    }

    /**
     * Register a new recruteur and their profile.
     *
     * @param  array<string, mixed>  $data
     */
    public function registerRecruteur(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'telephone' => $data['telephone'] ?? null,
                'role' => 'recruteur',
                'is_active' => true,
                'is_archived' => false,
            ]);

            $user->recruteur()->create([
                'nom_entreprise' => $data['nom_entreprise'],
                'type_organisation_id' => $data['type_organisation'],
                'taille_entreprise_id' => $data['taille_entreprise'],
                'ville_id' => $data['ville'],
                'site_web' => $data['site_web'] ?? null,
                'poste' => $data['poste'] ?? null,
            ]);

            return $user;
        });
    }

    /**
     * Handle file uploads to private storage.
     */
    protected function handleFileUpload(?UploadedFile $file, string $directory): ?string
    {
        if (! $file instanceof UploadedFile) {
            return null;
        }

        $filename = Str::uuid().'.'.$file->getClientOriginalExtension();

        return $file->storeAs($directory, $filename, 'private');
    }

    /**
     * Sync additional candidat relations.
     *
     * @param  array<string, mixed>  $data
     */
    protected function syncCandidatRelations(Candidat $candidat, array $data): void
    {
        if (! empty($data['specialisations'])) {
            $specialisations = array_map(fn ($item) => ['specialisation_id' => $item['specialisation']], $data['specialisations']);
            $candidat->specialisations()->createMany($specialisations);
        }

        if (! empty($data['domain_experiences'])) {
            $domainExperiences = array_map(fn ($item) => ['domaine_experience_id' => $item['domain_experience']], $data['domain_experiences']);
            $candidat->domainExperiences()->createMany($domainExperiences);
        }

        if (! empty($data['langues'])) {
            $langues = array_map(fn ($item) => ['langue_id' => $item['nom'], 'niveau_langue_id' => $item['niveau']], $data['langues']);
            $candidat->langues()->createMany($langues);
        }

        if (! empty($data['type_travails'])) {
            $typeTravails = array_map(fn ($item) => ['type_travail_id' => $item['type_travail']], $data['type_travails']);
            $candidat->typeTravails()->createMany($typeTravails);
        }

        if (! empty($data['mode_travails'])) {
            $modeTravails = array_map(fn ($item) => ['mode_travail_id' => $item['mode_travail']], $data['mode_travails']);
            $candidat->modeTravails()->createMany($modeTravails);
        }

        if (! empty($data['ville_travails'])) {
            $villeTravails = array_map(fn ($item) => ['ville_id' => $item['ville']], $data['ville_travails']);
            $candidat->villeTravails()->createMany($villeTravails);
        }

        if (! empty($data['experiences'])) {
            $experiences = array_map(fn ($item) => [
                'type_experience_id' => $item['type'],
                'poste_id' => $item['poste'],
                'entreprise' => $item['entreprise'],
                'debut' => $item['debut'],
                'fin' => $item['fin'] ?? null,
            ], $data['experiences']);
            $candidat->experiences()->createMany($experiences);
        }

        if (! empty($data['formations'])) {
            $formationsData = [];
            foreach ($data['formations'] as $formation) {
                $diplomaPath = $this->handleFileUpload(
                    $formation['diploma_file'] ?? null,
                    'candidat_diplomas'
                );

                $formationsData[] = [
                    'annee_debut' => $formation['annee_debut'] ?? null,
                    'annee_fin' => $formation['annee_fin'] ?? null,
                    'specialisation_id' => $formation['domaine'],
                    'formation_juridique_id' => $formation['niveau'],
                    'ecole_id' => $formation['ecole'],
                    'diploma_file' => $diplomaPath,
                ];
            }
            $candidat->formations()->createMany($formationsData);
        }
    }
}

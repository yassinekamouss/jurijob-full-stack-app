<?php

namespace App\Services;

use App\Models\Candidat;
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
                'poste_recherche' => $data['poste_recherche'],
                'niveau_experience' => $data['niveau_experience'],
                'formation_juridique' => $data['formation_juridique'],
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
                'type_organisation' => $data['type_organisation'],
                'taille_entreprise' => $data['taille_entreprise'],
                'ville' => $data['ville'],
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
            $candidat->specialisations()->createMany($data['specialisations']);
        }

        if (! empty($data['domain_experiences'])) {
            $candidat->domainExperiences()->createMany($data['domain_experiences']);
        }

        if (! empty($data['langues'])) {
            $candidat->langues()->createMany($data['langues']);
        }

        if (! empty($data['type_travails'])) {
            $candidat->typeTravails()->createMany($data['type_travails']);
        }

        if (! empty($data['mode_travails'])) {
            $candidat->modeTravails()->createMany($data['mode_travails']);
        }

        if (! empty($data['ville_travails'])) {
            $candidat->villeTravails()->createMany($data['ville_travails']);
        }

        if (! empty($data['experiences'])) {
            $candidat->experiences()->createMany($data['experiences']);
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
                    'niveau' => $formation['niveau'],
                    'domaine' => $formation['domaine'],
                    'ecole' => $formation['ecole'],
                    'diploma_file' => $diplomaPath,
                ];
            }
            $candidat->formations()->createMany($formationsData);
        }
    }
}

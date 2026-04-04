<?php

namespace App\Services;

use App\DTOs\Candidate\ExperienceData;
use App\DTOs\Candidate\FormationData;
use App\DTOs\Candidate\LanguageData;
use App\DTOs\Candidate\ProfileData as CandidateProfile;
use App\DTOs\Candidate\SpecialisationData;
use App\DTOs\Recruteur\ProfileData as RecruteurProfile;
use App\Models\Candidat\Candidat;
use App\Models\User;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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
            try {
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

                $profile = CandidateProfile::fromArray($data);

                $candidat = $user->candidat()->create(array_merge(
                    $profile->toArray(),
                    ['image_url' => $imageUrl]
                ));

                $this->syncCandidatRelations($candidat, $data);

                return $user;
            } catch (Exception $e) {
                Log::error('Registration error (Candidate): '.$e->getMessage());
                throw $e;
            }
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
            try {
                $user = User::create([
                    'email' => $data['email'],
                    'password' => Hash::make($data['password']),
                    'telephone' => $data['telephone'] ?? null,
                    'role' => 'recruteur',
                    'is_active' => true,
                    'is_archived' => false,
                ]);

                $profile = RecruteurProfile::fromArray($data);

                $user->recruteur()->create($profile->toArray());

                return $user;
            } catch (Exception $e) {
                Log::error('Registration error (Recruiter): '.$e->getMessage());
                throw $e;
            }
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
            $specialisations = array_map(function ($item) {
                return SpecialisationData::fromArray($item)->toArray();
            }, $data['specialisations']);
            $candidat->specialisations()->createMany($specialisations);
        }

        if (! empty($data['domain_experiences'])) {
            $domainExperiences = array_map(fn ($item) => ['domaine_experience_id' => $item['domain_experience_id']], $data['domain_experiences']);
            $candidat->domainExperiences()->createMany($domainExperiences);
        }

        if (! empty($data['langues'])) {
            $langues = array_map(function ($item) {
                return LanguageData::fromArray($item)->toArray();
            }, $data['langues']);
            $candidat->langues()->createMany($langues);
        }

        if (! empty($data['type_travails'])) {
            $typeTravails = array_map(fn ($item) => ['type_travail_id' => $item['type_travail_id']], $data['type_travails']);
            $candidat->typeTravails()->createMany($typeTravails);
        }

        if (! empty($data['mode_travails'])) {
            $modeTravails = array_map(fn ($item) => ['mode_travail_id' => $item['mode_travail_id']], $data['mode_travails']);
            $candidat->modeTravails()->createMany($modeTravails);
        }

        if (! empty($data['ville_travails'])) {
            $villeTravails = array_map(fn ($item) => ['ville_id' => $item['ville_id']], $data['ville_travails']);
            $candidat->villeTravails()->createMany($villeTravails);
        }

        if (! empty($data['experiences'])) {
            $experiences = array_map(function ($item) {
                return ExperienceData::fromArray($item)->toArray();
            }, $data['experiences']);
            $candidat->experiences()->createMany($experiences);
        }

        if (! empty($data['formations'])) {
            $formationsData = [];
            foreach ($data['formations'] as $formation) {
                $diplomaPath = $this->handleFileUpload(
                    $formation['diploma_file'] ?? null,
                    'candidat_diplomas'
                );

                $dto = FormationData::fromArray(array_merge($formation, ['diploma_file' => $diplomaPath]));
                $formationsData[] = $dto->toArray();
            }
            $candidat->formations()->createMany($formationsData);
        }
    }
}

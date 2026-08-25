<?php

namespace App\Console\Commands;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateSupabaseCandidates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-supabase {file : Chemin vers le fichier CSV (ex: "Supabase Snippet Untitled query.csv")}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migre les candidats depuis un export CSV Supabase vers la base de données MySQL';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePath = $this->argument('file');

        if (! file_exists($filePath) || ! is_readable($filePath)) {
            $this->error("Le fichier CSV est introuvable ou illisible : {$filePath}");

            return 1;
        }

        $this->info("Démarrage de la migration depuis {$filePath}...");

        $handle = fopen($filePath, 'r');
        if ($handle === false) {
            $this->error("Impossible d'ouvrir le fichier CSV.");

            return 1;
        }

        // Ignorer l'en-tête
        $header = fgetcsv($handle, 10000, ',');

        $successCount = 0;
        $skippedCount = 0;
        $errorCount = 0;

        $this->output->progressStart(filesize($filePath)); // Bar de progression basée approximative (ou on avance par ligne)

        DB::beginTransaction();

        try {
            while (($data = fgetcsv($handle, 10000, ',')) !== false) {
                // Avancer la barre de progression (très approximatif par ligne, mais visuel)
                $this->output->progressAdvance();

                // 0: email, 1: telephone, 2: prenom, 3: nom, 4: created_at, 5: password
                if (count($data) < 6) {
                    continue; // Ligne invalide
                }

                $email = trim($data[0]);
                $telephone = trim($data[1]);
                $prenom = trim($data[2]);
                $nom = trim($data[3]);
                $createdAt = trim($data[4]);
                $password = trim($data[5]);

                // Si l'email est vide, on ignore
                if (empty($email)) {
                    continue;
                }

                // Vérifier si l'utilisateur existe déjà
                if (User::where('email', $email)->exists()) {
                    $skippedCount++;

                    continue;
                }

                // Nettoyage du mot de passe
                if (strtolower($password) === 'null' || empty($password)) {
                    $password = null;
                } elseif (str_starts_with($password, '$2a$')) {
                    $password = str_replace('$2a$', '$2y$', $password);
                }

                // Formater la date (PostgreSQL datetime format)
                try {
                    $parsedDate = Carbon::parse($createdAt)->format('Y-m-d H:i:s');
                } catch (\Exception $e) {
                    $parsedDate = now(); // Fallback
                }

                // Nettoyage du téléphone (si vide, on met null)
                $telephone = empty($telephone) ? null : $telephone;

                // 1. Créer l'utilisateur
                $user = User::create([
                    'email' => $email,
                    'password' => $password,
                    'telephone' => $telephone,
                    'role' => 'candidat',
                    'is_active' => true,
                    'is_archived' => false,
                    'email_verified_at' => $parsedDate, // Considéré vérifié depuis sa création
                    'created_at' => $parsedDate,
                    'updated_at' => $parsedDate,
                ]);

                // 2. Créer le profil candidat
                $user->candidat()->create([
                    'nom' => $nom,
                    'prenom' => $prenom,
                    'status' => 'en_attente',
                    'niveau_experience_id' => null,
                    'formation_juridique_id' => null,
                    'salaire_id' => 1,
                    'urgence_id' => 1,
                    'created_at' => $parsedDate,
                    'updated_at' => $parsedDate,
                ]);

                $successCount++;
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $this->output->progressFinish();
            $this->error('Une erreur critique est survenue : '.$e->getMessage());
            fclose($handle);

            return 1;
        }

        fclose($handle);

        $this->output->progressFinish();

        $this->newLine();
        $this->info('Migration terminée !');
        $this->line("<fg=green>Succès (Insérés) : {$successCount}</>");
        $this->line("<fg=yellow>Ignorés (Déjà existants) : {$skippedCount}</>");

        return 0;
    }
}

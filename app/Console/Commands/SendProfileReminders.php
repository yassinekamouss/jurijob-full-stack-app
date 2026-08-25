<?php

namespace App\Console\Commands;

use App\Mail\ProfileIncompleteReminder;
use App\Models\Candidat\Candidat;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendProfileReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-profile-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envoie un email de rappel aux 210 premiers candidats ayant un profil incomplet';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Recherche de candidats avec profil incomplet...');

        // Récupérer les 210 premiers candidats actifs avec profil incomplet (selon la demande)
        $candidats = Candidat::with('user')
            ->whereHas('user', function ($query) {
                $query->where('is_active', true)->where('role', 'candidat');
            })
            ->where(function ($query) {
                // Un profil est considéré incomplet s'il manque l'une de ces informations clés
                $query->whereNull('niveau_experience_id')
                    ->orWhereNull('formation_juridique_id')
                    ->orWhereDoesntHave('postes')
                    ->orWhereDoesntHave('specialisations');
            })
            ->take(210)
            ->get();

        if ($candidats->isEmpty()) {
            $this->info('Aucun candidat avec profil incomplet trouvé.');

            return 0;
        }

        $this->info("{$candidats->count()} candidats trouvés. Début de l'envoi des emails...");

        $bar = $this->output->createProgressBar($candidats->count());
        $bar->start();

        foreach ($candidats as $candidat) {
            if ($candidat?->user?->email) {
                Mail::to($candidat->user->email)->queue(
                    new ProfileIncompleteReminder($candidat)
                );
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('Emails de rappel envoyés avec succès !');

        return 0;
    }
}

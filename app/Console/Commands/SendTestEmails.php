<?php

namespace App\Console\Commands;

use App\Mail\Candidate\CandidateMatchedMail;
use App\Mail\Candidate\CandidateShortlistedMail;
use App\Mail\Recruiter\RecruiterPaymentReceivedMail;
use App\Mail\Recruiter\RecruiterRequestConfirmedMail;
use App\Mail\Recruiter\RecruiterShortlistReadyMail;
use App\Mail\Recruiter\RecruiterShortlistUnlockedMail;
use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendTestEmails extends Command
{
    protected $signature = 'mail:test {email : Adresse de réception des emails de test}';

    protected $description = 'Envoie tous les emails transactionnels JuriJob à une adresse de test';

    public function handle(): int
    {
        $to = $this->argument('email');

        $this->info("Envoi de 6 emails transactionnels vers : {$to}");
        $this->newLine();

        $offre = Offre::with(['recruteur.user', 'poste', 'ville', 'typeTravail'])->first();
        $recruteur = Recruteur::with('user')->first();
        $candidat = Candidat::with('user')->first();

        if (! $offre || ! $recruteur) {
            $this->error('Aucune offre ou recruteur trouvé en base. Lancez php artisan db:seed d\'abord.');

            return self::FAILURE;
        }

        if (! $candidat) {
            $this->error('Aucun candidat trouvé en base. Lancez php artisan db:seed d\'abord.');

            return self::FAILURE;
        }

        $emails = [
            'A1 — Candidate Matched' => fn () => Mail::to($to)->send(
                new CandidateMatchedMail(
                    candidat: $candidat,
                    offre: $offre,
                    dashboardUrl: route('offres.index'),
                )
            ),
            'A2 — Candidate Shortlisted' => fn () => Mail::to($to)->send(
                new CandidateShortlistedMail(
                    candidat: $candidat,
                    offre: $offre,
                    dashboardUrl: route('offres.index'),
                )
            ),
            'B1 — Recruiter Request Confirmed' => fn () => Mail::to($to)->send(
                new RecruiterRequestConfirmedMail(
                    recruteur: $recruteur,
                    offre: $offre,
                    dashboardUrl: route('offres.index'),
                )
            ),
            'B2 — Recruiter Shortlist Ready (+ payment)' => fn () => Mail::to($to)->send(
                new RecruiterShortlistReadyMail(
                    recruteur: $recruteur,
                    offre: $offre,
                    shortlistCount: 3,
                    paymentUrl: route('offres.payment', $offre),
                )
            ),
            'B3 — Recruiter Payment Received' => fn () => Mail::to($to)->send(
                new RecruiterPaymentReceivedMail(
                    recruteur: $recruteur,
                    offre: $offre,
                    paymentAmount: '4 470,00 MAD',
                    paymentDate: now()->format('d/m/Y à H\hi'),
                    paymentReference: 'JJ-'.now()->format('Y').'-00001A',
                    dashboardUrl: route('offres.index'),
                )
            ),
            'B4 — Recruiter Shortlist Unlocked' => fn () => Mail::to($to)->send(
                new RecruiterShortlistUnlockedMail(
                    recruteur: $recruteur,
                    offre: $offre,
                    shortlistCount: 3,
                    shortlistUrl: route('offres.profiles', $offre),
                    accessExpiryDate: now()->addDays(30)->format('d/m/Y'),
                )
            ),
        ];

        $success = 0;
        $failure = 0;

        foreach ($emails as $label => $send) {
            $this->output->write("  → {$label} … ");

            try {
                $send();
                $this->info('✓ envoyé');
                $success++;
            } catch (\Throwable $e) {
                $this->error('✗ ERREUR : '.$e->getMessage());
                $failure++;
            }
        }

        $this->newLine();
        $this->info("Résultat : {$success} envoyé(s), {$failure} échec(s).");

        return $failure === 0 ? self::SUCCESS : self::FAILURE;
    }
}
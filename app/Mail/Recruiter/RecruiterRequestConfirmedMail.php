<?php

namespace App\Mail\Recruiter;

use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RecruiterRequestConfirmedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Recruteur $recruteur,
        public Offre $offre,
        public string $dashboardUrl,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre demande a bien été reçue — shortlist sous 48h – JuriJob',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.recruiter-request-confirmed',
            with: [
                'recruteur' => $this->recruteur,
                'offre' => $this->offre,
                'dashboardUrl' => $this->dashboardUrl,
            ],
        );
    }
}
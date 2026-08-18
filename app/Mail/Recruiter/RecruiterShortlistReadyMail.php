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

class RecruiterShortlistReadyMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Recruteur $recruteur,
        public Offre $offre,
        public int $shortlistCount,
        public string $paymentUrl,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre shortlist est prête — finalisez votre accès – JuriJob',
            replyTo: [config('jurijob.support_email')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.recruiter-shortlist-ready',
            with: [
                'recruteur' => $this->recruteur,
                'offre' => $this->offre,
                'shortlistCount' => $this->shortlistCount,
                'paymentUrl' => $this->paymentUrl,
            ],
        );
    }
}
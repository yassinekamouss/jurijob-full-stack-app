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

class RecruiterShortlistUnlockedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Recruteur $recruteur,
        public Offre $offre,
        public int $shortlistCount,
        public string $shortlistUrl,
        public string $accessExpiryDate,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre shortlist complète est disponible — consultez-la maintenant – JuriJob',
            replyTo: [config('jurijob.support_email')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.recruiter-shortlist-unlocked',
            with: [
                'recruteur' => $this->recruteur,
                'offre' => $this->offre,
                'shortlistCount' => $this->shortlistCount,
                'shortlistUrl' => $this->shortlistUrl,
                'accessExpiryDate' => $this->accessExpiryDate,
            ],
        );
    }
}

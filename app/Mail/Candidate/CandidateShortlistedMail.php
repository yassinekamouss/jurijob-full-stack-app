<?php

namespace App\Mail\Candidate;

use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CandidateShortlistedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Candidat $candidat,
        public Offre $offre,
        public string $dashboardUrl,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Félicitations — vous figurez dans la shortlist finale – JuriJob',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.candidate-shortlisted',
            with: [
                'candidat' => $this->candidat,
                'offre' => $this->offre,
                'dashboardUrl' => $this->dashboardUrl,
            ],
        );
    }
}

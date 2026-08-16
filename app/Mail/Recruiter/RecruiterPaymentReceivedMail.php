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

class RecruiterPaymentReceivedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Recruteur $recruteur,
        public Offre $offre,
        public string $paymentAmount,
        public string $paymentDate,
        public string $paymentReference,
        public string $dashboardUrl,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Paiement reçu — accès à la shortlist en cours de finalisation – JuriJob',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.recruiter-payment-received',
            with: [
                'recruteur' => $this->recruteur,
                'offre' => $this->offre,
                'paymentAmount' => $this->paymentAmount,
                'paymentDate' => $this->paymentDate,
                'paymentReference' => $this->paymentReference,
                'dashboardUrl' => $this->dashboardUrl,
            ],
        );
    }
}

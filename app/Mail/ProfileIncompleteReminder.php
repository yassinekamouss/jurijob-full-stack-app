<?php

namespace App\Mail;

use App\Models\Candidat\Candidat;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProfileIncompleteReminder extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public Candidat $candidat;

    /**
     * Create a new message instance.
     */
    public function __construct(Candidat $candidat)
    {
        $this->candidat = $candidat;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Complétez votre profil Jurijob pour maximiser vos chances !',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.candidat.profile_incomplete_reminder',
            with: [
                'candidat' => $this->candidat,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

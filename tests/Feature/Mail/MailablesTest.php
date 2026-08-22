<?php

use App\Mail\Candidate\CandidateMatchedMail;
use App\Mail\Candidate\CandidateShortlistedMail;
use App\Mail\Recruiter\RecruiterPaymentReceivedMail;
use App\Mail\Recruiter\RecruiterRequestConfirmedMail;
use App\Mail\Recruiter\RecruiterShortlistReadyMail;
use App\Mail\Recruiter\RecruiterShortlistUnlockedMail;
use App\Models\Candidat\Candidat;
use App\Models\Offre\Offre;
use App\Models\Recruteur\Recruteur;

describe('CandidateMatchedMail', function () {
    it('has the correct subject', function () {
        $candidat = Candidat::factory()->create();
        $offre = Offre::factory()->create();
        $mailable = new CandidateMatchedMail($candidat, $offre, 'https://jurijob.ma/dashboard');

        $mailable->assertHasSubject('Votre profil a été sélectionné pour une opportunité – JuriJob');
    });

    it('renders the correct view', function () {
        $candidat = Candidat::factory()->create();
        $offre = Offre::factory()->create();
        $mailable = new CandidateMatchedMail($candidat, $offre, 'https://jurijob.ma/dashboard');

        $mailable->assertSeeInHtml('Nouvelle opportunité');
        $mailable->assertSeeInHtml('Mettre à jour mon profil');
        $mailable->assertSeeInHtml('https://jurijob.ma/dashboard');
    });

});

describe('CandidateShortlistedMail', function () {
    it('has the correct subject', function () {
        $candidat = Candidat::factory()->create();
        $offre = Offre::factory()->create();
        $mailable = new CandidateShortlistedMail($candidat, $offre, 'https://jurijob.ma/dashboard');

        $mailable->assertHasSubject('Félicitations — vous figurez dans la shortlist finale – JuriJob');
    });

    it('renders the correct view', function () {
        $candidat = Candidat::factory()->create();
        $offre = Offre::factory()->create();
        $mailable = new CandidateShortlistedMail($candidat, $offre, 'https://jurijob.ma/dashboard');

        $mailable->assertSeeInHtml('Sélection confirmée');
        $mailable->assertSeeInHtml('shortlist finale');
        $mailable->assertSeeInHtml('Accéder à mon espace candidat');
    });
});

describe('RecruiterRequestConfirmedMail', function () {
    it('has the correct subject', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterRequestConfirmedMail($recruteur, $offre, 'https://jurijob.ma/dashboard');

        $mailable->assertHasSubject('Votre demande a bien été reçue — shortlist sous 48h – JuriJob');
    });

    it('renders the 48h commitment', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterRequestConfirmedMail($recruteur, $offre, 'https://jurijob.ma/dashboard');

        $mailable->assertSeeInHtml('48 heures maximum');
        $mailable->assertSeeInHtml('Suivre ma demande');
    });
});

describe('RecruiterShortlistReadyMail', function () {
    it('has the correct subject and reply-to', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterShortlistReadyMail($recruteur, $offre, 3, 'https://jurijob.ma/payment');

        $mailable->assertHasSubject('Votre shortlist est prête — finalisez votre accès – JuriJob');
        $mailable->assertHasReplyTo(config('jurijob.support_email'));
    });

    it('renders the payment CTA and lock notice', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterShortlistReadyMail($recruteur, $offre, 3, 'https://jurijob.ma/payment');

        $mailable->assertSeeInHtml('mode aperçu uniquement');
        $mailable->assertSeeInHtml('24 heures maximum');
        $mailable->assertSeeInHtml('https://jurijob.ma/payment');
    });
});

describe('RecruiterPaymentReceivedMail', function () {
    it('has the correct subject', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterPaymentReceivedMail(
            $recruteur, $offre,
            '1 500,00 MAD', '16/08/2026', 'REF-20260816-001',
            'https://jurijob.ma/dashboard'
        );

        $mailable->assertHasSubject('Paiement reçu — accès à la shortlist en cours de finalisation – JuriJob');
    });

    it('renders transaction details', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterPaymentReceivedMail(
            $recruteur, $offre,
            '1 500,00 MAD', '16/08/2026', 'REF-20260816-001',
            'https://jurijob.ma/dashboard'
        );

        $mailable->assertSeeInHtml('REF-20260816-001');
        $mailable->assertSeeInHtml('1 500,00 MAD');
        $mailable->assertSeeInHtml('24 heures maximum');
    });
});

describe('RecruiterShortlistUnlockedMail', function () {
    it('has the correct subject and reply-to', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterShortlistUnlockedMail(
            $recruteur, $offre, 3,
            'https://jurijob.ma/shortlist', '31/08/2026'
        );

        $mailable->assertHasSubject('Votre shortlist complète est disponible — consultez-la maintenant – JuriJob');
        $mailable->assertHasReplyTo(config('jurijob.support_email'));
    });

    it('renders access details and CTA', function () {
        $recruteur = Recruteur::factory()->create();
        $offre = Offre::factory()->create(['recruteur_id' => $recruteur->id]);
        $mailable = new RecruiterShortlistUnlockedMail(
            $recruteur, $offre, 3,
            'https://jurijob.ma/shortlist', '31/08/2026'
        );

        $mailable->assertSeeInHtml('entièrement disponible');
        $mailable->assertSeeInHtml('Consulter ma shortlist maintenant');
        $mailable->assertSeeInHtml('https://jurijob.ma/shortlist');
        $mailable->assertSeeInHtml('31/08/2026');
    });

});
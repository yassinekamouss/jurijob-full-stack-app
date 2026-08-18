<<<<<<< HEAD
=======
{{-- resources/views/emails/candidate-matched.blade.php --}}
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Votre profil a été sélectionné pour une opportunité – JuriJob</title>
  <style type="text/css">
    @media only screen and (max-width: 600px) {
      .container   { width: 100% !important; max-width: 100% !important; }
      .body-cell   { padding: 28px 20px 20px !important; }
      .btn-cell    { padding: 13px 28px !important; }
      .footer-cell { padding: 20px 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F8F9FA;-webkit-font-smoothing:antialiased;mso-line-height-rule:exactly;">

<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F8F9FA;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" width="580" class="container"
             style="width:580px;max-width:580px;background-color:#FFFFFF;border-radius:8px;border:1px solid #E2E8F0;overflow:hidden;">

        {{-- HEADER --}}
        <tr>
          <td align="center" style="background-color:#1A1F1E;padding:38px 40px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td align="center" style="padding-bottom:18px;">
                  <img src="{{ config('app.email_asset_url') }}/images/logo_jurijob.png"
                       width="52" height="52" alt="JuriJob"
                       style="display:block;border-radius:8px;border:0;-ms-interpolation-mode:bicubic;" />
                </td>
              </tr>
              <tr>
                <td align="center"
                    style="font-family:'Plus Jakarta Sans','Instrument Sans',Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#FFFFFF;">
                  JURIJOB
                </td>
              </tr>
            </table>
            <table role="presentation" cellpadding="0" cellspacing="0" width="48" align="center" style="margin-top:22px;">
              <tr>
                <td style="border-top:2px solid #C06041;line-height:2px;font-size:2px;">&nbsp;</td>
              </tr>
            </table>
            <div style="margin-top:14px;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;
                        letter-spacing:2.5px;text-transform:uppercase;color:#C06041;">
              Nouvelle opportunité
            </div>
          </td>
        </tr>

        {{-- BODY --}}
        <tr>
          <td class="body-cell" style="padding:40px 48px 32px;color:#1A1F1E;font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;">

            <p style="margin:0 0 10px;font-size:18px;font-weight:700;color:#1A1F1E;font-family:'Plus Jakarta Sans',Georgia,serif;">
              Bonjour {{ $candidat->user?->name ?? 'cher candidat' }},
            </p>

            <p style="margin:0 0 24px;color:#475569;font-size:15px;">
              Bonne nouvelle : votre profil <strong style="color:#1A1F1E;">JuriJob</strong> vient d'être pré-identifié comme le plus pertinent pour une nouvelle opportunité juridique.
            </p>

            {{-- Mission summary card --}}
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                   style="margin-bottom:28px;border:1px solid #E2E8F0;border-radius:6px;background:#FDFCF8;">
              <tr>
                <td style="padding:14px 18px 6px;">
                  <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C06041;">
                    La mission
                  </div>
                </td>
              </tr>
              @foreach ([
                ['Intitulé', $offre->titre ?? $offre->poste?->label ?? '—'],
                ['Type de contrat', $offre->typeTravail?->label ?? '—'],
                ['Localisation', $offre->ville?->label ?? '—'],
              ] as [$label, $value])
              <tr>
                <td style="padding:8px 18px;border-top:1px solid #F1F5F9;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;color:#64748B;width:40%;">{{ $label }}</td>
                      <td style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:700;color:#1A1F1E;">{{ $value }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              @endforeach
              <tr><td style="padding:6px 0;"></td></tr>
            </table>

            {{-- Advisory block --}}
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
              <tr>
                <td style="border-left:3px solid #C06041;padding:12px 18px;background-color:#FDF7F5;border-radius:0 6px 6px 0;">
                  <span style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;color:#475569;line-height:1.6;">
                    Un profil <strong style="color:#C06041;">complet et à jour</strong> maximise vos chances d'être retenu dans la shortlist finale transmise au recruteur.
                  </span>
                </td>
              </tr>
            </table>

            {{-- CTA --}}
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 28px;">
              <tr>
                <td align="center">
                  <!--[if mso]>
                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
                    href="{{ route('login') }}"
                    style="height:50px;v-text-anchor:middle;width:280px;"
                    arcsize="8%" strokecolor="#C06041" fillcolor="#C06041">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:1.5px;">
                      SE CONNECTER
                    </center>
                  </v:roundrect>
                  <![endif]-->
                  <!--[if !mso]><!-- -->
                  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                    <tr>
                      <td align="center" bgcolor="#C06041" class="btn-cell"
                          style="border-radius:6px;padding:15px 36px;background-color:#C06041;">
                        <a href="{{ route('login') }}" target="_blank"
                           style="display:inline-block;color:#FFFFFF;text-decoration:none;font-weight:700;
                                  font-size:13px;letter-spacing:1.5px;text-transform:uppercase;
                                  font-family:'Plus Jakarta Sans',Arial,sans-serif;">
                          Se connecter
                        </a>
                      </td>
                    </tr>
                  </table>
                  <!--<![endif]-->
                </td>
              </tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
              <tr>
                <td style="border-top:1px solid #E2E8F0;line-height:1px;font-size:1px;">&nbsp;</td>
              </tr>
            </table>

            <p style="margin:0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;color:#64748B;line-height:1.6;">
              Vous recevez cet email car vous êtes inscrit(e) sur JuriJob.ma. Si vous avez des questions, contactez-nous à <a href="mailto:{{ config('jurijob.support_email') }}" style="color:#C06041;text-decoration:none;">{{ config('jurijob.support_email') }}</a>.
            </p>

          </td>
        </tr>

        {{-- FOOTER --}}
        <tr>
          <td class="footer-cell" align="center"
              style="background-color:#1A1F1E;padding:28px 40px;border-top:1px solid #2A302F;">
            <div style="font-family:'Plus Jakarta Sans',Georgia,serif;font-size:15px;font-weight:700;
                        letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;margin-bottom:12px;">
              JURIJOB
            </div>
            <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;color:#94A3B8;
                        line-height:1.6;margin-bottom:14px;">
              Plateforme RH &amp; Recrutement Spécialisé Droit &amp; Juridique au Maroc.
            </div>
            <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:11px;color:#64748B;">
              &copy; {{ date('Y') }} JuriJob. Tous droits réservés.
            </div>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
>>>>>>> ce3f8cdbfe8335df70bf5921f1ca6f7d2c3e11c5

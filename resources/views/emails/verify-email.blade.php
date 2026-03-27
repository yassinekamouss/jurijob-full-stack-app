{{-- resources/views/emails/verify-email.blade.php --}}
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Confirmez votre adresse e-mail – Jurijob</title>
  <style type="text/css">
    @media only screen and (max-width: 600px) {
      .container   { width: 100% !important; max-width: 100% !important; }
      .body-cell   { padding: 28px 20px 20px !important; }
      .btn-cell    { padding: 13px 28px !important; }
      .footer-cell { padding: 20px 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F5;-webkit-font-smoothing:antialiased;mso-line-height-rule:exactly;">

<!-- Outer wrapper -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F5F5F5;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="580" class="container"
             style="width:580px;max-width:580px;background-color:#FFFFFF;border-radius:2px;border:1px solid #E0E0E0;">

        <!-- ═══════════════ HEADER ═══════════════ -->
        <tr>
          <td align="center" style="background-color:#0A0A0A;padding:38px 40px 32px;">

            <!-- Logo -->
            <table role="presentation" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td align="center" style="padding-bottom:18px;">
                  <img src="{{ config('app.email_asset_url') }}/images/logo_jurijob.jpg"
                       width="52" height="52" alt="Jurijob"
                       style="display:block;border-radius:6px;border:0;-ms-interpolation-mode:bicubic;" />
                </td>
              </tr>
              <tr>
                <td align="center"
                    style="font-family:Georgia,'Times New Roman',Times,serif;font-size:22px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#FFFFFF;">
                  JURIJOB
                </td>
              </tr>
            </table>

            <!-- Thin rule -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="48" align="center" style="margin-top:22px;">
              <tr>
                <td style="border-top:2px solid #FFFFFF;line-height:2px;font-size:2px;">&nbsp;</td>
              </tr>
            </table>

            <!-- Sub-label -->
            <div style="margin-top:14px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:600;
                        letter-spacing:2.5px;text-transform:uppercase;color:#9E9E9E;">
              Vérification du compte
            </div>
          </td>
        </tr>

        <!-- ═══════════════ BODY ═══════════════ -->
        <tr>
          <td class="body-cell" style="padding:40px 48px 32px;color:#1A1A1A;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;">

            <!-- Greeting -->
            <p style="margin:0 0 10px;font-size:17px;font-weight:700;color:#0A0A0A;font-family:Georgia,'Times New Roman',Times,serif;">
              Bonjour {{ $user->name ?? 'cher utilisateur' }},
            </p>

            <p style="margin:0 0 22px;color:#444444;font-size:15px;">
              Bienvenue sur <strong style="color:#0A0A0A;">Jurijob</strong>. Pour activer votre compte et accéder à l'ensemble de nos services juridiques, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.
            </p>

            <!-- Expiry notice — plain table, no emoji -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
              <tr>
                <td style="border-left:3px solid #0A0A0A;padding:10px 16px;background-color:#F9F9F9;">
                  <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#555555;line-height:1.6;">
                    Ce lien de vérification est <strong style="color:#0A0A0A;">personnel et confidentiel</strong>.
                    Il expire dans <strong style="color:#0A0A0A;">60 minutes</strong> après réception de cet e-mail.
                  </span>
                </td>
              </tr>
            </table>

            <!-- CTA Button (bulletproof) -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 28px;">
              <tr>
                <td align="center">
                  <!--[if mso]>
                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
                    href="{{ $verificationUrl }}"
                    style="height:50px;v-text-anchor:middle;width:280px;"
                    arcsize="4%" strokecolor="#0A0A0A" fillcolor="#0A0A0A">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;letter-spacing:1.5px;">
                      CONFIRMER MON ADRESSE
                    </center>
                  </v:roundrect>
                  <![endif]-->
                  <!--[if !mso]><!-- -->
                  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                    <tr>
                      <td align="center" bgcolor="#0A0A0A" class="btn-cell"
                          style="border-radius:3px;padding:15px 40px;">
                        <a href="{{ $verificationUrl }}" target="_blank"
                           style="display:inline-block;color:#FFFFFF;text-decoration:none;font-weight:700;
                                  font-size:13px;letter-spacing:1.8px;text-transform:uppercase;
                                  font-family:Arial,Helvetica,sans-serif;">
                          Confirmer mon adresse
                        </a>
                      </td>
                    </tr>
                  </table>
                  <!--<![endif]-->
                </td>
              </tr>
            </table>

            <!-- Horizontal rule -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
              <tr>
                <td style="border-top:1px solid #E8E8E8;line-height:1px;font-size:1px;">&nbsp;</td>
              </tr>
            </table>

            <!-- Safety notice — no emoji, no exclamation, plain text -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                   style="background:#FAFAFA;border:1px solid #E8E8E8;border-radius:2px;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#0A0A0A;">
                    Vous n'avez pas créé de compte sur Jurijob ?
                  </p>
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#666666;line-height:1.6;">
                    Ignorez simplement cet e-mail. Aucune action n'est requise et votre adresse ne sera pas utilisée.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Fallback link -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                   style="margin-top:20px;border:1px dashed #CCCCCC;border-radius:2px;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;
                             letter-spacing:1.5px;text-transform:uppercase;color:#999999;">
                    Lien alternatif
                  </p>
                  <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#555555;">
                    Si le bouton ne fonctionne pas, copiez-collez cette adresse dans votre navigateur :
                  </p>
                  <a href="{{ $verificationUrl }}"
                     style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#0A0A0A;
                            word-break:break-all;text-decoration:underline;">
                    {{ $verificationUrl }}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ═══════════════ FOOTER ═══════════════ -->
        <tr>
          <td class="footer-cell" align="center"
              style="background-color:#0A0A0A;padding:24px 40px;border-top:1px solid #0A0A0A;">

            <div style="font-family:Georgia,'Times New Roman',Times,serif;font-size:15px;font-weight:700;
                        letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;margin-bottom:12px;">
              JURIJOB
            </div>

            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#888888;
                        line-height:1.6;margin-bottom:14px;">
              Cet e-mail a été envoyé automatiquement. Merci de ne pas y répondre directement.
            </div>

            <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin-bottom:14px;">
              <tr>
                <td style="padding:0 8px;">
                  <a href="#" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#777777;text-decoration:none;">
                    Politique de confidentialité
                  </a>
                </td>
                <td style="color:#555555;font-size:11px;">|</td>
                <td style="padding:0 8px;">
                  <a href="#" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#777777;text-decoration:none;">
                    Conditions d'utilisation
                  </a>
                </td>
                <td style="color:#555555;font-size:11px;">|</td>
                <td style="padding:0 8px;">
                  <a href="#" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#777777;text-decoration:none;">
                    Aide &amp; Support
                  </a>
                </td>
              </tr>
            </table>

            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#555555;">
              &copy; {{ date('Y') }} Jurijob. Tous droits réservés.
            </div>
          </td>
        </tr>

      </table>
      <!-- /Card -->

    </td>
  </tr>
</table>

</body>
</html>
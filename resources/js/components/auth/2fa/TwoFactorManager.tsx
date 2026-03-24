// resources/js/components/auth/2fa/TwoFactorManager.tsx
import { router, usePage } from '@inertiajs/react';
import { ShieldCheck, ShieldAlert, Loader2, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ConfirmPassword from './ConfirmPassword';
import RecoveryCodes from './RecoveryCodes';
import Setup2FA from './Setup2FA';

export default function TwoFactorManager() {
    const { auth } = usePage().props as any;
    const [enabling, setEnabling] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<any[]>([]);

    // Détermine si le 2FA est déjà actif
    const isEnabled = !!auth.user.two_factor_confirmed_at;

    const enableTwoFactor = () => {
        setEnabling(true);
        router.post(
            '/user/two-factor-authentication',
            {},
            {
                preserveScroll: true,
                onSuccess: () =>
                    Promise.all([
                        showQrCode(),
                        showRecoveryCodes(),
                        setConfirming(true),
                    ]),
                onFinish: () => setEnabling(false),
            },
        );
    };

    const disableTwoFactor = () => {
        router.delete('/user/two-factor-authentication', {
            preserveScroll: true,
            onSuccess: () => {
                setConfirming(false);
                setQrCode(null);
                setRecoveryCodes([]);
            },
        });
    };

    const fetchOptions = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
        },
    };

    const showQrCode = async () => {
        try {
            const res = await fetch('/user/two-factor-qr-code', fetchOptions);
            const data = await res.json();
            setQrCode(data.svg);
        } catch (error) {
            console.error('Erreur lors de la récupération du QR code', error);
        }
    };

    const showRecoveryCodes = async () => {
        try {
            const res = await fetch(
                '/user/two-factor-recovery-codes',
                fetchOptions,
            );
            const data = await res.json();
            setRecoveryCodes(data);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des codes de secours',
                error,
            );
        }
    };

    const regenerateRecoveryCodes = () => {
        router.post(
            '/user/two-factor-recovery-codes',
            {},
            {
                preserveScroll: true,
                onSuccess: () => showRecoveryCodes(),
            },
        );
    };

    return (
        <div className="space-y-6">
            {!isEnabled && !confirming ? (
                // ÉTAT : DÉSACTIVÉ
                <div className="flex flex-col items-center rounded-[32px] border-2 border-dashed border-[#1a1f1e]/10 p-8 text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gray-50 text-gray-400">
                        <ShieldAlert className="h-8 w-8" />
                    </div>
                    <h4 className="mb-2 font-serif text-xl font-bold italic">
                        Sécurité standard
                    </h4>
                    <p className="mb-8 max-w-xs text-sm text-[#1a1f1e]/40">
                        Votre compte est uniquement protégé par votre mot de
                        passe.
                    </p>

                    <ConfirmPassword onConfirmed={enableTwoFactor}>
                        <button className="rounded-xl bg-[#1a1f1e] px-8 py-3 text-sm font-black tracking-widest text-white uppercase transition-all hover:scale-105">
                            Activer le 2FA
                        </button>
                    </ConfirmPassword>
                </div>
            ) : confirming ? (
                // ÉTAT : EN COURS DE CONFIGURATION (QR CODE)
                <Setup2FA
                    qrCode={qrCode}
                    onConfirmed={() => setConfirming(false)}
                    onCancel={disableTwoFactor}
                />
            ) : (
                // ÉTAT : ACTIVÉ
                <div className="space-y-8">
                    <div className="flex items-center gap-6 rounded-[32px] border border-emerald-100 bg-emerald-50 p-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                            <ShieldCheck className="h-7 w-7" />
                        </div>
                        <div>
                            <div className="font-bold text-emerald-900">
                                2FA Activé
                            </div>
                            <div className="text-sm text-emerald-700/70">
                                Votre compte est hautement sécurisé.
                            </div>
                        </div>
                        <ConfirmPassword onConfirmed={disableTwoFactor}>
                            <button className="ml-auto text-xs font-black tracking-widest text-red-500 uppercase transition-colors hover:text-red-700">
                                Désactiver
                            </button>
                        </ConfirmPassword>
                    </div>

                    {recoveryCodes.length > 0 ? (
                        <RecoveryCodes
                            codes={recoveryCodes}
                            onRegenerate={regenerateRecoveryCodes}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-[32px] border border-[#1a1f1e]/5 bg-white p-8 text-center shadow-sm">
                            <h4 className="mb-2 font-serif text-lg font-bold italic">
                                Codes de secours
                            </h4>
                            <p className="mb-6 text-xs font-medium text-[#1a1f1e]/60">
                                Vous pouvez afficher vos codes de secours pour
                                les conserver dans un endroit sûr.
                            </p>
                            <ConfirmPassword onConfirmed={showRecoveryCodes}>
                                <button className="rounded-xl bg-gray-100 px-6 py-3 text-xs font-black tracking-widest text-[#1a1f1e] uppercase transition-all hover:bg-gray-200">
                                    Afficher les codes de secours
                                </button>
                            </ConfirmPassword>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

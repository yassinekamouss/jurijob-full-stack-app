// resources/js/components/auth/2fa/Setup2FA.tsx
import { useForm } from '@inertiajs/react';
import { CheckCircle2, XCircle, Loader2, Smartphone } from 'lucide-react';
import React from 'react';

interface Props {
    qrCode: string | null;
    onConfirmed: () => void;
    onCancel: () => void;
}

export default function Setup2FA({ qrCode, onConfirmed, onCancel }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/user/confirmed-two-factor-authentication', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onConfirmed();
            },
        });
    };

    return (
        <div className="animate-in rounded-[32px] border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 shadow-inner duration-300 fade-in zoom-in">
            <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Smartphone className="h-7 w-7" />
                </div>

                <h4 className="mb-2 font-serif text-xl font-bold italic">
                    Configuration finale
                </h4>
                <p className="mb-8 max-w-sm text-sm text-[#1a1f1e]/50">
                    Scannez ce QR Code avec votre application d'authentification
                    (Authy, Google Authenticator) puis saisissez le code à 6
                    chiffres.
                </p>

                {/* QR Code SVG */}
                <div
                    className="mb-8 rounded-3xl border-4 border-white bg-white p-4 shadow-xl"
                    dangerouslySetInnerHTML={{ __html: qrCode || '' }}
                />

                <form onSubmit={submit} className="w-full max-w-xs space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                            Code de vérification
                        </label>
                        <input
                            type="text"
                            placeholder="000 000"
                            maxLength={6}
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className="w-full rounded-2xl border-[#1a1f1e]/10 bg-white px-5 py-4 text-center text-2xl font-black tracking-[0.5em] transition-all outline-none focus:border-[#C06041] focus:ring-0"
                        />
                        {errors.code && (
                            <p className="text-xs font-bold text-red-500">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 rounded-xl px-6 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={processing || data.code.length < 6}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1a1f1e] px-6 py-3 text-sm font-black tracking-widest text-white uppercase disabled:opacity-30"
                        >
                            {processing && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            Confirmer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

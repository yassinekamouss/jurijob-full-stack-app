// resources/js/components/auth/2fa/ConfirmPassword.tsx
import { useForm } from '@inertiajs/react';
import { Lock, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';

interface Props {
    title?: string;
    description?: string;
    children: React.ReactNode;
    onConfirmed?: () => void;
}

export default function ConfirmPassword({ 
    title = "Confirmez votre mot de passe", 
    description = "Pour votre sécurité, veuillez confirmer votre mot de passe pour continuer.",
    children, 
    onConfirmed 
}: Props) {
    const [confirming, setConfirming] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const confirmPassword = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onSuccess: () => {
                setConfirming(false);
                reset();

                if (onConfirmed) {
                    onConfirmed();
                }
            },
        });
    };

    if (confirming) {
        return (
            <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#1a1f1e]/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl border border-[#1a1f1e]/10">
                    <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-serif italic mb-2">{title}</h3>
                    <p className="text-sm text-[#1a1f1e]/50 mb-6">{description}</p>

                    <form onSubmit={confirmPassword} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            autoFocus
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 outline-none"
                        />
                        {errors.password && <p className="text-xs text-red-500 font-bold">{errors.password}</p>}
                        
                        <div className="flex gap-3 pt-2">
                            <button 
                                type="button"
                                onClick={() => setConfirming(false)}
                                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-[#1a1f1e]/40 hover:bg-gray-50 transition-all"
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#1a1f1e] text-white px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Confirmer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return <span onClick={() => setConfirming(true)}>{children}</span>;
}
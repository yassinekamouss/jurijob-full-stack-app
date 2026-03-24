// resources/js/components/auth/2fa/RecoveryCodes.tsx
import { Eye, EyeOff, Copy, RefreshCw, Check, Download } from 'lucide-react';
import React, { useState } from 'react';
import ConfirmPassword from './ConfirmPassword';

interface Props {
    codes: string[];
    onRegenerate: () => void;
}

export default function RecoveryCodes({ codes, onRegenerate }: Props) {
    const [showCodes, setShowCodes] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(codes.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-[32px] border border-[#1a1f1e]/5 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h4 className="mb-1 font-serif text-lg font-bold italic">
                        Codes de secours
                    </h4>
                    <p className="text-xs font-medium text-[#1a1f1e]/40">
                        Conservez-les précieusement dans un endroit sûr.
                    </p>
                </div>
                <button
                    onClick={() => setShowCodes(!showCodes)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#1a1f1e]/40 transition-all hover:bg-[#1a1f1e]/10"
                >
                    {showCodes ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>

            {showCodes ? (
                <div className="animate-in space-y-6 duration-300 slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-3 rounded-[24px] border border-[#1a1f1e]/5 bg-[#FDFCF8] p-6 font-mono text-sm tracking-wider text-[#1a1f1e]/70">
                        {codes.map((code, idx) => (
                            <div
                                key={idx}
                                className="border-b border-[#1a1f1e]/5 p-2"
                            >
                                {code}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-xs font-black tracking-widest text-blue-600 uppercase transition-all hover:bg-blue-100"
                        >
                            {copied ? (
                                <Check className="h-3 w-3" />
                            ) : (
                                <Copy className="h-3 w-3" />
                            )}
                            {copied ? 'Copié !' : 'Copier tout'}
                        </button>

                        <ConfirmPassword onConfirmed={onRegenerate}>
                            <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black tracking-widest text-[#1a1f1e]/30 uppercase transition-all hover:text-[#1a1f1e]">
                                <RefreshCw className="h-3 w-3" />
                                Régénérer
                            </button>
                        </ConfirmPassword>
                    </div>
                </div>
            ) : (
                <div className="flex h-24 items-center justify-center rounded-[24px] border border-dashed border-[#1a1f1e]/10 bg-[#FDFCF8]/50">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#1a1f1e]/20 uppercase">
                        Masqués pour votre sécurité
                    </span>
                </div>
            )}
        </div>
    );
}

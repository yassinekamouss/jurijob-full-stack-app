import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, Check } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

export type LegalDeclarationVariant = 'alert' | 'checkbox';

interface LegalHonorDeclarationProps {
    variant?: LegalDeclarationVariant;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    error?: string;
    className?: string;
}

export const LegalHonorDeclaration: React.FC<LegalHonorDeclarationProps> = ({
    variant = 'alert',
    checked = false,
    onCheckedChange,
    error,
    className = '',
}) => {
    const { t } = useTranslation();

    if (variant === 'alert') {
        return (
            <div className={`relative border border-[#1a1f1e]/15 bg-[#FDFCF8] p-4 text-[#1a1f1e] ${className}`}>
                <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#C06041]/30 bg-[#C06041]/10 text-[#C06041]">
                        <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                            <h5 className="font-semibold tracking-wider text-[#1a1f1e] uppercase">
                                {t('auth.forms.declaration.title')}
                            </h5>
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-widest text-[#C06041] uppercase">
                                <Scale className="h-3 w-3" /> {t('auth.forms.declaration.legal_requirement')}
                            </span>
                        </div>
                        <p className="leading-relaxed font-normal text-[#1a1f1e]/80">
                            <Trans
                                i18nKey="auth.forms.declaration.alert_text"
                                components={{
                                    bold: <strong className="font-semibold text-[#1a1f1e]" />,
                                }}
                            />
                        </p>
                        <p className="leading-relaxed text-[11px] text-[#1a1f1e]/65 italic">
                            {t('auth.forms.declaration.alert_subtext')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 2: Mandatory Checkbox
    return (
        <div className={`space-y-2 ${className}`}>
            <label
                className={`group relative flex items-start gap-3.5 border p-4 transition-colors cursor-pointer ${
                    error
                        ? 'border-red-400 bg-red-50/30'
                        : checked
                            ? 'border-[#1a1f1e] bg-white'
                            : 'border-[#1a1f1e]/15 bg-[#FDFCF8] hover:border-[#1a1f1e]/40'
                }`}
            >
                <div className="relative mt-0.5 flex items-center">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onCheckedChange?.(e.target.checked)}
                        className="peer sr-only"
                    />
                    <div
                        className={`flex h-4 w-4 items-center justify-center border transition-all ${
                            checked
                                ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                : 'border-[#1a1f1e]/30 bg-white group-hover:border-[#1a1f1e]'
                        }`}
                    >
                        {checked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                </div>
                <div className="space-y-1 text-xs leading-relaxed text-[#1a1f1e]">
                    <p className="font-normal text-[#1a1f1e]/90">
                        <Trans
                            i18nKey="auth.forms.declaration.checkbox_text"
                            components={{
                                bold: <strong className="font-semibold text-[#1a1f1e]" />,
                            }}
                        />
                    </p>
                    <p className="text-[11px] text-[#1a1f1e]/65">
                        {t('auth.forms.declaration.checkbox_subtext')}
                    </p>
                </div>
            </label>
            {error && (
                <p className="text-xs font-medium text-red-600 flex items-center gap-1.5 pl-1">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {error}
                </p>
            )}
        </div>
    );
};

export default LegalHonorDeclaration;

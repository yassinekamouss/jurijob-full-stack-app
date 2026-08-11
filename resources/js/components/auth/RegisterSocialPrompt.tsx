import { useTranslation } from 'react-i18next';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

type Props = {
    role: 'candidat' | 'recruteur';
    className?: string;
};

export default function RegisterSocialPrompt({ role, className = '' }: Props) {
    const { t } = useTranslation();

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-[#1a1f1e]/10" />
                <span className="shrink-0 text-[10px] font-bold tracking-[0.18em] text-[#1a1f1e]/40 uppercase">
                    {t('auth.social.quick_signup')}
                </span>
                <div className="h-px flex-1 bg-[#1a1f1e]/10" />
            </div>

            <p className="text-center text-xs leading-relaxed font-medium text-[#1a1f1e]/55">
                {t('auth.social.quick_signup_desc')}
            </p>

            <SocialAuthButtons role={role} label="S'inscrire" />
        </div>
    );
}

import { useTranslation } from 'react-i18next';
import {
    ArrowRight,
    FileText,
    Globe,
    Mail,
    ShieldCheck,
    Sparkles,
    UserCheck,
} from 'lucide-react';

export default function AdvisorySidebar() {
    const { t } = useTranslation();

    return (
        <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="relative overflow-hidden border border-[#1a1f1e]/10 bg-[#FDFCF8] p-6 shadow-sm sm:p-8">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#C06041] via-[#1a1f1e] to-[#C06041]" />

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 border border-[#C06041]/20 bg-[#C06041]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C06041]">
                            <Sparkles className="h-3 w-3" />
                            {t('recruiter.profiles.advisory.badge')}
                        </div>
                        <h2 className="font-serif text-2xl font-bold italic tracking-tight text-[#1a1f1e] sm:text-3xl">
                            {t('recruiter.profiles.advisory.title')}
                        </h2>
                        <p className="text-xs font-normal leading-relaxed text-[#1a1f1e]/70 sm:text-sm">
                            {t('recruiter.profiles.advisory.subtitle')}
                        </p>
                    </div>

                    <div className="space-y-4 border-t border-[#1a1f1e]/8 pt-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C06041]/10 text-[#C06041]">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1f1e]">
                                    {t('recruiter.profiles.advisory.services.interviews.title')}
                                </h4>
                                <p className="text-xs leading-relaxed text-[#1a1f1e]/65">
                                    {t('recruiter.profiles.advisory.services.interviews.desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C06041]/10 text-[#C06041]">
                                <FileText className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1f1e]">
                                    {t('recruiter.profiles.advisory.services.contracts.title')}
                                </h4>
                                <p className="text-xs leading-relaxed text-[#1a1f1e]/65">
                                    {t('recruiter.profiles.advisory.services.contracts.desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C06041]/10 text-[#C06041]">
                                <Globe className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1f1e]">
                                    {t('recruiter.profiles.advisory.services.international.title')}
                                </h4>
                                <p className="text-xs leading-relaxed text-[#1a1f1e]/65">
                                    {t('recruiter.profiles.advisory.services.international.desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C06041]/10 text-[#C06041]">
                                <UserCheck className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1f1e]">
                                    {t('recruiter.profiles.advisory.services.job_desc.title')}
                                </h4>
                                <p className="text-xs leading-relaxed text-[#1a1f1e]/65">
                                    {t('recruiter.profiles.advisory.services.job_desc.desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 rounded-none border border-[#1a1f1e]/10 bg-[#1a1f1e] p-5 text-white">
                        <div className="flex items-center gap-2 text-xs font-medium text-[#C06041]">
                            <Mail className="h-4 w-4" />
                            <span>{t('recruiter.profiles.advisory.cta.email')}</span>
                        </div>
                        <a
                            href="mailto:recrutement@sentissilegal.com?subject=Demande%20d%27accompagnement%20recrutement%20sur-mesure"
                            className="group flex w-full items-center justify-center gap-2 bg-[#C06041] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#a84f33]"
                        >
                            <span>{t('recruiter.profiles.advisory.cta.button')}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <p className="text-center text-[10px] uppercase tracking-widest text-white/50">
                            {t('recruiter.profiles.advisory.cta.response_time')}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

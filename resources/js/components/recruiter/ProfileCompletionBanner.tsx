import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    Briefcase,
    Building2,
    CheckCircle2,
    Globe,
    MapPin,
    Phone,
    User,
    Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type RecruiterProfileCompletion = {
    company_name: boolean;
    position: boolean;
    org_type: boolean;
    company_size: boolean;
    country: boolean;
    city: boolean;
    phone: boolean;
    is_complete: boolean;
};

interface Props {
    profileCompletion?: RecruiterProfileCompletion;
    showSettingsLink?: boolean;
}

const sections = [
    {
        key: 'company_name' as const,
        i18nKey: 'recruiter_pending_banner.sections.company_name',
        icon: Building2,
    },
    {
        key: 'position' as const,
        i18nKey: 'recruiter_pending_banner.sections.position',
        icon: Briefcase,
    },
    {
        key: 'org_type' as const,
        i18nKey: 'recruiter_pending_banner.sections.org_type',
        icon: Building2,
    },
    {
        key: 'company_size' as const,
        i18nKey: 'recruiter_pending_banner.sections.company_size',
        icon: Users,
    },
    {
        key: 'country' as const,
        i18nKey: 'recruiter_pending_banner.sections.country',
        icon: Globe,
    },
    {
        key: 'city' as const,
        i18nKey: 'recruiter_pending_banner.sections.city',
        icon: MapPin,
    },
    {
        key: 'phone' as const,
        i18nKey: 'recruiter_pending_banner.sections.phone',
        icon: Phone,
    },
];

export default function ProfileCompletionBanner({
    profileCompletion,
    showSettingsLink = false,
}: Props) {
    const { t } = useTranslation();
    const isComplete = profileCompletion?.is_complete ?? false;
    const missingCount = profileCompletion
        ? sections.filter(({ key }) => !profileCompletion[key]).length
        : 0;

    if (!profileCompletion || isComplete) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[24px] border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-[#FDFCF8] p-5 shadow-sm sm:rounded-[32px] sm:p-8"
        >
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />

            <div className="relative z-10 space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                            <User className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-1 text-[10px] font-black tracking-widest text-amber-800 uppercase">
                                {t(
                                    'recruiter_pending_banner.status_incomplete',
                                )}
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-[#1a1f1e] italic">
                                {t('recruiter_pending_banner.title')}
                            </h2>
                            <p className="max-w-2xl text-sm leading-relaxed font-medium text-[#1a1f1e]/60">
                                {t('recruiter_pending_banner.description')}
                            </p>
                        </div>
                    </div>

                    {showSettingsLink && (
                        <Link
                            href="/recruteur/settings"
                            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#1a1f1e] px-7 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#1a1f1e]/90 active:scale-95"
                        >
                            {t('recruiter_pending_banner.complete_profile')}
                        </Link>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        {t(
                            missingCount === 1
                                ? 'recruiter_pending_banner.sections_to_fill_one'
                                : 'recruiter_pending_banner.sections_to_fill_other',
                            { count: missingCount },
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {sections.map(({ key, i18nKey, icon: Icon }) => {
                            const done = profileCompletion[key];

                            return (
                                <div
                                    key={key}
                                    className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-sm font-bold ${
                                        done
                                            ? 'border-emerald-100 bg-emerald-50/80 text-emerald-800'
                                            : 'border-amber-100 bg-white/70 text-[#1a1f1e]/55'
                                    }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span className="truncate">
                                        {t(i18nKey)}
                                    </span>
                                    {done ? (
                                        <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600" />
                                    ) : (
                                        <AlertCircle className="ml-auto h-4 w-4 shrink-0 text-amber-500" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

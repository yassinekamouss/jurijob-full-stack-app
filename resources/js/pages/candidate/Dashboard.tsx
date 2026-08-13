import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/candidate/DashboardHeader';
import PendingVerificationBanner, {
    type ProfileCompletion,
} from '@/components/candidate/PendingVerificationBanner';
import StatusCard from '@/components/candidate/StatusCard';
import ProfileGrid from '@/components/candidate/ProfileGrid';
import {
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    BookOpen,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    candidat: any;
    user: any;
    profileCompletion?: ProfileCompletion;
}

export default function Dashboard({ candidat, user, profileCompletion }: Props) {
    const { t } = useTranslation('translation');
    const isPending = candidat?.status === 'en_attente';
    return (
        <div className="relative min-h-screen bg-[#FDFCF8] text-[#1a1f1e] overflow-x-hidden">
            <Head title={t('candidate_dashboard.page_title')} />

            <DashboardHeader />

            <main className="mx-auto max-w-7xl px-4 pt-20 sm:pt-28 pb-12 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12">

                    {/* Left Column: Core Dashboard Content */}
                    <div className="lg:col-span-8 space-y-8 sm:space-y-12">
                        {/* HERO SECTION */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-3 sm:space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 backdrop-blur-sm px-3.5 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1a1f1e] shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPending ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                                    <span className={`relative inline-flex h-2 w-2 rounded-full ${isPending ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                                </span>
                                {isPending ? t('candidate_dashboard.validation_pending') : t('candidate_dashboard.professional_dashboard')}
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-serif italic">
                                {t('candidate_dashboard.hello', { name: candidat?.prenom || t('candidate_dashboard.candidate_default_name') })}
                            </h1>

                            <p className="max-w-xl text-base sm:text-lg font-medium text-[#1a1f1e]/50 leading-relaxed">
                                {isPending
                                    ? t('candidate_dashboard.pending_description')
                                    : t('candidate_dashboard.active_description')}
                            </p>
                        </motion.div>

                        {isPending && (
                            <PendingVerificationBanner
                                profileCompletion={profileCompletion}
                                showSettingsLink
                            />
                        )}

                        {/* STATUS CARD */}
                        {!isPending && <StatusCard isActive={user.is_active} />}

                        {/* PROFILE GRID */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-center justify-between px-1 sm:px-2">
                                <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-[#1a1f1e]/30">
                                    {t('candidate_dashboard.expertise_overview')}
                                </h3>

                                <a
                                    href="/candidate/settings"
                                    className="flex items-center gap-1.5 text-xs font-bold hover:underline"
                                >
                                    {t('candidate_dashboard.edit_profile')}
                                    <Search className="h-3 w-3" />
                                </a>
                            </div>

                            <ProfileGrid candidat={candidat} />
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-6 sm:space-y-8">
                            {/* PROFESSIONAL MINI CARD */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="rounded-[28px] sm:rounded-[40px] border border-[#1a1f1e]/10 bg-[#1a1f1e] p-6 sm:p-10 text-[#FDFCF8] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-[#FDFCF8]/5 blur-3xl transition-all group-hover:bg-[#FDFCF8]/10" />

                                    <div className="relative flex flex-col items-center text-center">
                                        <div className="mb-5 sm:mb-6 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-[20px] sm:rounded-[24px] border-4 border-[#FDFCF8]/10 bg-[#FDFCF8] shadow-inner p-1">
                                            <img
                                                src="/images/default_profile_image.avif"
                                                alt="Profile"
                                                className="h-full w-full rounded-[14px] sm:rounded-[18px] object-cover"
                                            />
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold font-serif italic mb-1">
                                            {candidat?.prenom} {candidat?.nom}
                                        </h3>

                                        <p className="text-[#FDFCF8]/50 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 sm:mb-8">
                                            {candidat?.poste_recherche || t('candidate_dashboard.juriste')}
                                        </p>

                                        <div className="w-full space-y-3.5 sm:space-y-4 text-left border-t border-[#FDFCF8]/10 pt-6 sm:pt-8">
                                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
                                                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5 shrink-0">
                                                    <Mail className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="truncate opacity-80">{user.email}</span>
                                            </div>

                                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
                                                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5 shrink-0">
                                                    <Phone className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="opacity-80">
                                                    {user.telephone || '+212 -- -- -- --'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
                                                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5 shrink-0">
                                                    <MapPin className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="opacity-80">
                                                    {t('candidate_dashboard.region', { region: candidat?.ville_travails?.[0]?.ville || t('candidate_dashboard.morocco') })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* HELP CARD */}
                            <div className="rounded-[24px] sm:rounded-[32px] bg-emerald-50 p-6 sm:p-8 border border-emerald-100 group cursor-pointer transition-all hover:bg-emerald-100/50">
                                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm mb-4 sm:mb-6">
                                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <h4 className="font-bold text-base sm:text-lg">
                                                    {t('candidate_dashboard.how_to_be_selected')}
                                                </h4>

                                <p className="mt-2 text-xs sm:text-sm text-[#1a1f1e]/60 leading-relaxed">
                                    {t('candidate_dashboard.how_to_be_selected_desc')}
                                </p>

                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}
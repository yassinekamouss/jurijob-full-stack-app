import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Search,
    Briefcase,
} from 'lucide-react';
import { useTaxonomies, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/recruiter/DashboardHeader';

interface Props {
    recruteur: any;
    user: any;
}

export default function Dashboard({ recruteur, user }: Props) {
    const { t } = useTranslation();
    const { typeOrganisations, tailleEntreprises } = useTaxonomies();

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title={t('recruiter_dashboard.page_title')} />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12">
                    {/* Left Column: Core Dashboard Content */}
                    <div className="space-y-8 sm:space-y-12 lg:col-span-8">
                        {/* HERO SECTION */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                </span>
                                {t('recruiter_dashboard.interface_label')}
                            </div>

                            <h1 className="font-serif text-3xl font-bold tracking-tight italic sm:text-5xl lg:text-6xl">
                                {t('recruiter_dashboard.welcome', { name: recruteur?.nom_entreprise || t('recruiter_dashboard.default_name') })}
                            </h1>

                            <p className="max-w-xl text-base sm:text-lg leading-relaxed font-medium text-[#1a1f1e]/50">
                                {t('recruiter_dashboard.description')}
                            </p>
                        </motion.div>

                        {/* STATUS CARD */}
                        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#1a1f1e]/10 bg-white p-5 sm:p-8 shadow-sm">
                            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-3 w-3 rounded-full shrink-0 ${user.is_active ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]' : 'bg-amber-500'}`}
                                        />
                                        <h3 className="text-base sm:text-lg font-bold">
                                            {user.is_active
                                                ? t('recruiter_dashboard.account_active')
                                                : t('recruiter_dashboard.account_pending')}
                                        </h3>
                                    </div>
                                    <p className="max-w-md text-xs sm:text-sm font-medium text-[#1a1f1e]/50">
                                        {user.is_active
                                            ? t('recruiter_dashboard.active_desc')
                                            : t('recruiter_dashboard.pending_desc')}
                                    </p>
                                </div>

                                <Link
                                    href="/recruteur/settings"
                                    className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[#1a1f1e] px-8 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#1a1f1e]/90 active:scale-95 shrink-0"
                                >
                                    {t('recruiter_dashboard.update_profile')}
                                </Link>
                            </div>
                        </div>

                        {/* COMPANY INFO GRID */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-center justify-between px-1 sm:px-2">
                                <h3 className="text-xs sm:text-sm font-black tracking-[0.2em] text-[#1a1f1e]/30 uppercase">
                                    {t('recruiter_dashboard.company_info')}
                                </h3>

                                <Link
                                    href="/recruteur/settings"
                                    className="flex items-center gap-1.5 text-xs font-bold hover:underline"
                                >
                                    {t('recruiter_dashboard.edit')}
                                    <Search className="h-3 w-3" />
                                </Link>
                            </div>

                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                <div className="rounded-2xl sm:rounded-3xl border border-[#1a1f1e]/10 bg-white p-5 sm:p-6 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                            <Building2 className="h-6 w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="mb-1 text-xs font-bold tracking-wider text-[#1a1f1e]/50 uppercase">
                                                {t('recruiter_dashboard.org_type')}
                                            </p>
                                            <p className="font-semibold truncate">
                                                {recruteur?.type_organisation_id
                                                    ? getTaxonomyLabel(recruteur.type_organisation_id, typeOrganisations)
                                                    : t('recruiter_dashboard.not_defined')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl sm:rounded-3xl border border-[#1a1f1e]/10 bg-white p-5 sm:p-6 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                                            <Briefcase className="h-6 w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="mb-1 text-xs font-bold tracking-wider text-[#1a1f1e]/50 uppercase">
                                                {t('recruiter_dashboard.company_size')}
                                            </p>
                                            <p className="font-semibold truncate">
                                                {recruteur?.taille_entreprise_id
                                                    ? getTaxonomyLabel(recruteur.taille_entreprise_id, tailleEntreprises)
                                                    : t('recruiter_dashboard.not_defined')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-24">
                            {/* PROFESSIONAL MINI CARD */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="group relative overflow-hidden rounded-[28px] sm:rounded-[40px] border border-[#1a1f1e]/10 bg-[#1a1f1e] p-6 sm:p-10 text-[#FDFCF8] shadow-2xl">
                                    <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-[#FDFCF8]/5 blur-3xl transition-all group-hover:bg-[#FDFCF8]/10" />

                                    <div className="relative flex flex-col items-center text-center">
                                        <div className="mb-6 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-[20px] sm:rounded-[24px] border-4 border-[#FDFCF8]/10 bg-[#FDFCF8] p-1 shadow-inner shrink-0">
                                            <div className="flex h-full w-full items-center justify-center rounded-[14px] sm:rounded-[18px] bg-white text-[#1a1f1e]">
                                                <Building2 className="h-8 w-8 sm:h-10 sm:w-10 opacity-50" />
                                            </div>
                                        </div>

                                        <h3 className="mb-1 font-serif text-xl sm:text-2xl font-bold italic">
                                            {recruteur?.nom_entreprise ||
                                                t('recruiter_dashboard.company_default')}
                                        </h3>

                                        <p className="mb-6 sm:mb-8 text-xs sm:text-sm font-bold tracking-widest text-[#FDFCF8]/50 uppercase">
                                            {recruteur?.poste || t('recruiter_dashboard.default_name')}
                                        </p>

                                        <div className="w-full space-y-4 border-t border-[#FDFCF8]/10 pt-6 sm:pt-8 text-left">
                                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium min-w-0">
                                                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <Mail className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="truncate opacity-80 min-w-0">
                                                    {user.email}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium min-w-0">
                                                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <Phone className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="truncate opacity-80 min-w-0">
                                                    {user.telephone ||
                                                        t('recruiter_dashboard.phone_default')}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium min-w-0">
                                                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <MapPin className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="truncate opacity-80 min-w-0">
                                                    {recruteur?.ville ||
                                                        t('recruiter_dashboard.city_not_defined')}
                                                </span>
                                            </div>

                                            {recruteur?.site_web && (
                                                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium min-w-0">
                                                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                        <ExternalLink className="h-4 w-4 opacity-70" />
                                                    </div>
                                                    <a
                                                        href={
                                                            recruteur.site_web
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="truncate opacity-80 hover:underline min-w-0"
                                                    >
                                                        {recruteur.site_web.replace(
                                                            /^https?:\/\//,
                                                            '',
                                                        )}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* HELP CARD */}
                            <div className="group cursor-pointer rounded-[24px] sm:rounded-[32px] border border-blue-100 bg-blue-50 p-6 sm:p-8 transition-all hover:bg-blue-100/50">
                                <div className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <h4 className="text-base sm:text-lg font-bold">
                                    {t('recruiter_dashboard.attract_talents')}
                                </h4>

                                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#1a1f1e]/60">
                                    {t('recruiter_dashboard.attract_desc')}
                                </p>

                                <Link 
                                    href="/recruteur/settings"
                                    className="group mt-4 sm:mt-6 flex items-center gap-2 text-xs font-black tracking-widest text-blue-700 uppercase"
                                >
                                    {t('recruiter_dashboard.update')}
                                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

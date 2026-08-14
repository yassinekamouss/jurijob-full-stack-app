import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Search, CheckCircle2, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import ProfileCompletionBanner from '@/components/recruiter/ProfileCompletionBanner';
import type { RecruiterProfileCompletion } from '@/components/recruiter/ProfileCompletionBanner';
import {
    create as offresCreate,
    payment as offresPayment,
    profiles as offresProfiles,
    show as offresShow,
} from '@/routes/offres';
import type { Offre } from '@/types/offre';

interface Props {
    offres: Offre[];
    recruteur?: any;
    user?: any;
    profileCompletion?: RecruiterProfileCompletion;
}

export default function Index({ offres, profileCompletion }: Props) {
    const { flash } = usePage<{
        flash?: { success?: string; error?: string };
    }>().props;
    const { t } = useTranslation();

    useEffect(() => {
        if (flash?.success) {
            toast.custom(
                (t) => (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`${
                            t.visible ? 'animate-enter' : 'animate-leave'
                        } pointer-events-auto flex w-full max-w-md flex-col rounded-2xl border border-white/10 bg-[#1a1f1e] p-5 shadow-2xl`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 pt-0.5">
                                <CheckCircle2 className="h-6 w-6 text-[#4ade80]" />
                            </div>
                            <div className="w-0 flex-1">
                                <p className="text-sm leading-relaxed font-medium whitespace-pre-line text-white">
                                    {flash.success}
                                </p>
                            </div>
                            <div className="ml-4 flex flex-shrink-0">
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="inline-flex rounded-md bg-[#1a1f1e] text-white/50 transition-colors hover:text-white focus:ring-2 focus:ring-white/20 focus:outline-none"
                                >
                                    <span className="sr-only">Fermer</span>
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ),
                { duration: 10000, id: 'flash-success' },
            );
        }

        if (flash?.error) {
            toast.error(flash.error, {
                duration: 7000,
            });
        }
    }, [flash]);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title={t('recruiter_offers.index.page_title')} />
            <Toaster position="top-right" />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between"
                >
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                            <Sparkles className="h-3 w-3 text-[#1a1f1e]/60" />
                            {t('recruiter_offers.index.badge')}
                        </div>
                        <h1 className="font-serif text-3xl font-bold tracking-tight italic sm:text-5xl">
                            {t('recruiter_offers.index.title')}
                        </h1>
                        <p className="max-w-xl text-base font-medium text-[#1a1f1e]/50 sm:text-lg">
                            {t('recruiter_offers.index.description')}
                        </p>
                    </div>

                    <Link
                        href={offresCreate().url}
                        className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full bg-[#1a1f1e] px-8 text-sm font-bold text-white shadow-xl shadow-[#1a1f1e]/10 transition-all hover:scale-105 hover:bg-[#1a1f1e]/90 active:scale-95 sm:h-14 sm:w-auto sm:px-10 sm:text-base"
                    >
                        <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        {t('recruiter_offers.index.publish_btn')}
                    </Link>
                </motion.div>

                <div className="mb-10">
                    <ProfileCompletionBanner
                        profileCompletion={profileCompletion}
                        showSettingsLink
                    />
                </div>

                {offres.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center rounded-[28px] border border-[#1a1f1e]/5 bg-white p-6 py-16 shadow-sm sm:rounded-[40px] sm:py-24"
                    >
                        <div className="mb-6 rounded-3xl bg-[#1a1f1e]/5 p-6 sm:mb-8 sm:p-8">
                            <Briefcase className="h-10 w-10 text-[#1a1f1e]/20 sm:h-14 sm:w-14" />
                        </div>
                        <h3 className="mb-3 text-center text-xl font-bold text-[#1a1f1e] sm:text-2xl">
                            {t('recruiter_offers.index.empty_title')}
                        </h3>
                        <p className="mb-8 max-w-sm text-center text-sm font-medium text-[#1a1f1e]/40 sm:mb-10 sm:text-lg">
                            {t('recruiter_offers.index.empty_desc')}
                        </p>
                        <Link
                            href={offresCreate().url}
                            className="border-b-2 border-[#1a1f1e] pb-1 text-xs font-black tracking-widest text-[#1a1f1e] uppercase transition-opacity hover:opacity-70 sm:text-sm"
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'recruiter_offers.index.create_first',
                                ),
                            }}
                        />
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {offres.map((offre, idx) => {
                            return (
                                <motion.div
                                    key={offre.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative overflow-hidden rounded-[24px] border border-[#1a1f1e]/5 bg-white p-5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#1a1f1e]/5 sm:rounded-[32px] sm:p-8"
                                >
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#1a1f1e]/[0.02] transition-transform group-hover:scale-150" />

                                    <div className="mb-5 flex items-center justify-between gap-2 sm:mb-6">
                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                            <Badge className="border-none bg-[#1a1f1e]/5 text-[10px] font-black tracking-wider text-[#1a1f1e] uppercase">
                                                {offre.poste?.nom ||
                                                    t(
                                                        'recruiter_offers.index.position_fallback',
                                                    )}
                                            </Badge>
                                            <Badge
                                                className={`border-none text-[9px] font-black tracking-wider uppercase ${
                                                    offre.statut ===
                                                    'EN_TRAITEMENT'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : offre.statut ===
                                                            'ATTENTE_PAIEMENT'
                                                          ? 'bg-orange-100 text-orange-700'
                                                          : offre.statut ===
                                                              'VERIFICATION_PAIEMENT'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : offre.statut ===
                                                                'CV_ENVOYES'
                                                              ? 'bg-emerald-100 text-emerald-700'
                                                              : 'bg-slate-100 text-slate-700'
                                                }`}
                                            >
                                                {offre.statut ===
                                                'EN_TRAITEMENT'
                                                    ? t(
                                                          'recruiter_offers.index.status.processing',
                                                      )
                                                    : offre.statut ===
                                                        'ATTENTE_PAIEMENT'
                                                      ? t(
                                                            'recruiter_offers.index.status.payment',
                                                        )
                                                      : offre.statut ===
                                                          'VERIFICATION_PAIEMENT'
                                                        ? t(
                                                              'recruiter_offers.index.status.verification',
                                                          )
                                                        : offre.statut ===
                                                            'CV_ENVOYES'
                                                          ? t(
                                                                'recruiter_offers.index.status.sent',
                                                            )
                                                          : t(
                                                                'recruiter_offers.index.status.archived',
                                                            )}
                                            </Badge>
                                        </div>
                                        <span className="shrink-0 text-xs font-bold text-[#1a1f1e]/30">
                                            {new Date(
                                                offre.created_at,
                                            ).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                            })}
                                        </span>
                                    </div>

                                    <h3 className="mb-4 line-clamp-2 font-serif text-xl font-bold text-[#1a1f1e] transition-all group-hover:italic sm:text-2xl">
                                        {offre.titre}
                                    </h3>

                                    <div className="mb-8 flex items-center gap-4 text-sm font-bold text-[#1a1f1e]/40">
                                        <span className="flex items-center gap-1.5">
                                            <Search className="h-3.5 w-3.5" />
                                            {t(
                                                'recruiter_offers.index.criteria',
                                                {
                                                    count:
                                                        offre.criteria_count ||
                                                        0,
                                                },
                                            )}
                                        </span>
                                        <span className="h-1 w-1 rounded-full bg-[#1a1f1e]/10" />
                                        <span>{offre.type_travail?.nom}</span>
                                        <span className="h-1 w-1 rounded-full bg-[#1a1f1e]/10" />
                                        <span>
                                            {offre.niveau_experience?.nom}
                                        </span>
                                    </div>

                                    <div className="border-t border-[#1a1f1e]/5 pt-6">
                                        <Link
                                            href={
                                                offre.statut ===
                                                'ATTENTE_PAIEMENT'
                                                    ? offresPayment(offre.id)
                                                          .url
                                                    : offre.statut ===
                                                        'CV_ENVOYES'
                                                      ? offresProfiles(offre.id)
                                                            .url
                                                      : offresShow({
                                                            offre: offre.id,
                                                        }).url
                                            }
                                            className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-xs font-black tracking-widest text-[#1a1f1e] uppercase transition-all hover:bg-[#1a1f1e] hover:text-white"
                                        >
                                            {offre.statut === 'ATTENTE_PAIEMENT'
                                                ? t(
                                                      'recruiter_offers.index.paiment',
                                                  )
                                                : offre.statut === 'CV_ENVOYES'
                                                  ? t(
                                                        'recruiter_offers.index.view_profiles',
                                                    )
                                                  : t(
                                                        'recruiter_offers.index.view_details',
                                                    )}
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

function Badge({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}
        >
            {children}
        </span>
    );
}

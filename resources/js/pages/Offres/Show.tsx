import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ChevronDown,
    MapPin,
    Briefcase,
    GraduationCap,
    Globe,
    ShieldCheck,
    CheckCircle2,
    Clock,
    Layers,
    LayoutDashboard,
    Info,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { index as offresIndex } from '@/routes/offres';
import type { Offre } from '@/types/offre';

interface Props {
    offre: Offre;
}

const CATEGORIES = [
    {
        type: 'SPECIALISATION',
        label: 'Spécialisations',
        icon: ShieldCheck,
        color: 'text-indigo-600 bg-indigo-50',
    },
    {
        type: 'LANGUE',
        label: 'Langues souhaitées',
        icon: Globe,
        color: 'text-sky-600 bg-sky-50',
    },
];

const IMPORTANCE_LEVELS = {
    indispensable: { color: 'bg-rose-50 text-rose-700 border-rose-200' },
    important: { color: 'bg-amber-50 text-amber-700 border-amber-200' },
    souhaitable: { color: 'bg-sky-50 text-sky-700 border-sky-200' },
    facultatif: { color: 'bg-slate-50 text-slate-600 border-slate-200' },
};

const BASE_CRITERIA = [
    {
        key: 'position',
        icon: Briefcase,
        value: (offre: Offre) => offre.poste?.nom,
    },
    {
        key: 'contract_type',
        icon: ShieldCheck,
        value: (offre: Offre) => offre.type_travail?.nom,
    },
    {
        key: 'work_mode',
        icon: MapPin,
        value: (offre: Offre) => offre.mode_travail?.nom,
    },
    { key: 'city', icon: Globe, value: (offre: Offre) => offre.ville?.nom },
    {
        key: 'experience',
        icon: GraduationCap,
        value: (offre: Offre) => offre.niveau_experience?.nom,
    },
    {
        key: 'education',
        icon: LayoutDashboard,
        value: (offre: Offre) => offre.formation_juridique?.nom,
    },
    {
        key: 'salary',
        icon: Layers,
        value: (offre: Offre) => offre.salaire?.nom,
    },
    {
        key: 'urgency',
        icon: Clock,
        value: (offre: Offre) => offre.urgence?.nom,
    },
] as const;

export default function Show({ offre }: Props) {
    const { t, i18n } = useTranslation();
    const [expandedGroups, setExpandedGroups] = useState<
        Record<string, boolean>
    >({});

    const groupedRequirements = useMemo(() => {
        if (!offre.requirements) {
            return [];
        }

        return CATEGORIES.map((cat) => ({
            ...cat,
            items: (offre.requirements || []).filter(
                (r) => r.taxonomy_type === cat.type,
            ),
        })).filter((g) => g.items.length > 0);
    }, [offre.requirements]);

    const totalCriteres = useMemo(() => {
        const baseCriteria = BASE_CRITERIA.reduce((count, criterion) => {
            return criterion.value(offre) ? count + 1 : count;
        }, 0);

        return baseCriteria + (offre.requirements?.length ?? 0);
    }, [offre]);

    const baseCriteriaCards = useMemo(() => {
        return BASE_CRITERIA.map((criterion) => ({
            ...criterion,
            value: criterion.value(offre),
        }));
    }, [offre]);

    const toggleGroup = (groupType: string) => {
        setExpandedGroups((current) => ({
            ...current,
            [groupType]: !current[groupType],
        }));
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head
                title={`${offre.titre} - ${t('recruiter_offers.show.page_title_suffix')}`}
            />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
                {/* Navigation & Header */}
                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <Link
                            href={offresIndex().url}
                            className="group inline-flex items-center text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase transition-all hover:text-[#1a1f1e]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transform transition-transform group-hover:-translate-x-1" />
                            {t('recruiter_offers.show.back_to_dashboard')}
                        </Link>
                        <h1 className="font-serif text-4xl leading-tight font-black tracking-tight italic md:text-5xl lg:text-6xl">
                            {offre.titre}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge
                                className={cn(
                                    'h-7 rounded-full border-none px-4 text-[9px] font-black tracking-widest uppercase shadow-sm',
                                    offre.statut === 'EN_TRAITEMENT'
                                        ? 'bg-amber-500 text-white'
                                        : offre.statut === 'ATTENTE_PAIEMENT'
                                          ? 'bg-orange-500 text-white'
                                          : offre.statut ===
                                              'VERIFICATION_PAIEMENT'
                                            ? 'bg-blue-500 text-white'
                                            : offre.statut === 'CV_ENVOYES'
                                              ? 'bg-emerald-500 text-white'
                                              : 'bg-slate-500 text-white',
                                )}
                            >
                                {offre.statut === 'EN_TRAITEMENT'
                                    ? t(
                                          'recruiter_offers.show.status_badge.processing',
                                      )
                                    : offre.statut === 'ATTENTE_PAIEMENT'
                                      ? t(
                                            'recruiter_offers.show.status_badge.payment',
                                        )
                                      : offre.statut === 'VERIFICATION_PAIEMENT'
                                        ? t(
                                              'recruiter_offers.show.status_badge.verification',
                                          )
                                        : offre.statut === 'CV_ENVOYES'
                                          ? t(
                                                'recruiter_offers.show.status_badge.sent',
                                            )
                                          : t(
                                                'recruiter_offers.show.status_badge.archived',
                                            )}
                            </Badge>
                            <span className="mx-1 h-1 w-1 rounded-full bg-slate-300" />
                            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                <Clock className="h-3 w-3" />
                                {t('recruiter_offers.show.posted_on', {
                                    date: new Date(
                                        offre.created_at,
                                    ).toLocaleDateString(
                                        i18n.language?.startsWith('en')
                                            ? 'en-US'
                                            : 'fr-FR',
                                        {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        },
                                    ),
                                })}
                            </span>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Main Content Area */}
                    <div className="space-y-12 lg:col-span-8">
                        {/* Description Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                                    <LayoutDashboard className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 italic">
                                    {t('recruiter_offers.show.about_role')}
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <div className="border border-slate-100 bg-white p-8 font-sans text-lg leading-relaxed font-medium whitespace-pre-line text-slate-600 shadow-sm shadow-slate-200/50">
                                    {offre.description}
                                </div>
                            </div>
                        </section>

                        {/* Criteria Section */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                                        <Layers className="h-4 w-4 text-white" />
                                    </div>
                                    <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 italic">
                                        {t(
                                            'recruiter_offers.show.offer_criteria',
                                        )}
                                    </h2>
                                </div>
                                <div className="hidden items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase sm:flex">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />{' '}
                                    {t('recruiter_offers.show.unified_view')}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4 border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-50 pb-5">
                                        <div>
                                            <h3 className="text-sm font-black tracking-widest text-slate-900 uppercase">
                                                {t(
                                                    'recruiter_offers.show.structuring_criteria',
                                                )}
                                            </h3>
                                            <p className="text-[11px] font-medium text-slate-400 italic">
                                                {t(
                                                    'recruiter_offers.show.structuring_desc',
                                                )}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="h-8 rounded-full border-slate-900 bg-slate-900 px-4 text-[10px] font-black tracking-widest text-white uppercase shadow-sm"
                                        >
                                            {t(
                                                'recruiter_offers.show.criteria_count',
                                                {
                                                    count: baseCriteriaCards.filter(
                                                        (criterion) =>
                                                            criterion.value,
                                                    ).length,
                                                },
                                            )}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {baseCriteriaCards.map((item, i) => (
                                            <motion.div
                                                key={item.key}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex flex-col gap-4 rounded-[24px] border border-slate-100 bg-[#FCFCFB] p-5 shadow-sm"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                                                    <item.icon className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                                        {t(
                                                            `recruiter_offers.show.base_criteria.${item.key}`,
                                                        )}
                                                    </p>
                                                    <p className="leading-snug font-bold break-words whitespace-normal text-slate-900">
                                                        {item.value ||
                                                            t(
                                                                'recruiter_offers.show.not_provided',
                                                            )}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <aside className="space-y-8 lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="sticky top-32 overflow-hidden rounded-[32px] border border-white/5 bg-slate-900 p-8 text-white shadow-2xl">
                                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/[0.03]" />
                                <div className="relative space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                                                <Info className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                                                    {t(
                                                        'recruiter_offers.show.information',
                                                    )}
                                                </p>
                                                <h3 className="text-xl font-bold tracking-tight">
                                                    {t(
                                                        'recruiter_offers.show.criteria_summary',
                                                    )}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="font-sans text-sm leading-relaxed font-medium text-white/60">
                                            {t(
                                                'recruiter_offers.show.summary_desc',
                                            )}
                                        </p>
                                    </div>

                                    <div className="space-y-5 border-t border-white/10 pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={cn(
                                                        'h-3 w-3 rounded-full',
                                                        offre.statut ===
                                                            'CV_ENVOYES'
                                                            ? 'bg-emerald-400'
                                                            : 'animate-pulse bg-amber-400',
                                                    )}
                                                />
                                                <span className="text-[11px] font-black tracking-[0.2em] text-white/80 uppercase">
                                                    {offre.statut ===
                                                    'EN_TRAITEMENT'
                                                        ? t(
                                                              'recruiter_offers.show.status_badge.processing',
                                                          )
                                                        : offre.statut ===
                                                            'ATTENTE_PAIEMENT'
                                                          ? t(
                                                                'recruiter_offers.show.status_badge.payment',
                                                            )
                                                          : offre.statut ===
                                                              'VERIFICATION_PAIEMENT'
                                                            ? t(
                                                                  'recruiter_offers.show.status_badge.verification',
                                                              )
                                                            : offre.statut ===
                                                                'CV_ENVOYES'
                                                              ? t(
                                                                    'recruiter_offers.show.status_badge.sent',
                                                                )
                                                              : t(
                                                                    'recruiter_offers.show.status_badge.archived',
                                                                )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1 rounded-2xl bg-white/5 p-4">
                                                <p className="text-[10px] font-black tracking-widest text-white/30 uppercase">
                                                    {t(
                                                        'recruiter_offers.index.position_fallback',
                                                    )}{' '}
                                                    /{' '}
                                                    {t(
                                                        'recruiter_offers.show.offer_criteria',
                                                    )}
                                                </p>
                                                <p className="text-2xl font-black text-white">
                                                    {totalCriteres}
                                                </p>
                                            </div>
                                            <div className="space-y-1 rounded-2xl bg-white/5 p-4">
                                                <p className="text-[10px] font-black tracking-widest text-white/30 uppercase">
                                                    {t(
                                                        'recruiter_offers.show.published_on',
                                                    )}
                                                </p>
                                                <p className="text-sm leading-tight font-black text-white">
                                                    {new Date(
                                                        offre.created_at,
                                                    ).toLocaleDateString(
                                                        i18n.language?.startsWith(
                                                            'en',
                                                        )
                                                            ? 'en-US'
                                                            : 'fr-FR',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Card className="mt-8 overflow-hidden border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <AnimatePresence mode="popLayout">
                                                {groupedRequirements.map(
                                                    (group, groupIdx) => (
                                                        <motion.div
                                                            key={group.type}
                                                            initial={{
                                                                opacity: 0,
                                                                y: 12,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    0.15 +
                                                                    groupIdx *
                                                                        0.08,
                                                            }}
                                                            className="relative rounded-2xl border border-slate-100 bg-slate-50/60 p-4 shadow-sm"
                                                        >
                                                            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                                                                <div className="flex min-w-0 items-center gap-3">
                                                                    <div
                                                                        className={cn(
                                                                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                                                                            group.color,
                                                                        )}
                                                                    >
                                                                        <group.icon className="h-5 w-5" />
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <h4 className="text-sm font-black tracking-widest break-words text-slate-900 uppercase">
                                                                            {group.label ===
                                                                            'Spécialisations'
                                                                                ? t(
                                                                                      'recruiter_offers.show.categories.specializations',
                                                                                  )
                                                                                : group.label ===
                                                                                    'Langues souhaitées'
                                                                                  ? t(
                                                                                        'recruiter_offers.show.categories.languages',
                                                                                    )
                                                                                  : group.label}
                                                                        </h4>
                                                                        <p className="text-[11px] font-medium text-slate-500 italic">
                                                                            {t(
                                                                                'recruiter_offers.show.additional_criteria',
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex shrink-0 items-center gap-2">
                                                                    {group.items
                                                                        .length >
                                                                        1 && (
                                                                        <Badge
                                                                            variant="outline"
                                                                            className="h-7 rounded-full border-slate-900 bg-slate-900 px-3 text-[10px] font-black tracking-widest text-white uppercase"
                                                                        >
                                                                            {
                                                                                group
                                                                                    .items
                                                                                    .length
                                                                            }
                                                                        </Badge>
                                                                    )}

                                                                    {group.items
                                                                        .length >
                                                                        2 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                toggleGroup(
                                                                                    group.type,
                                                                                )
                                                                            }
                                                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-transform hover:scale-105"
                                                                            aria-label={
                                                                                expandedGroups[
                                                                                    group
                                                                                        .type
                                                                                ]
                                                                                    ? t(
                                                                                          'recruiter_offers.show.collapse_list',
                                                                                      )
                                                                                    : `${t('recruiter_offers.show.view_other', { count: group.items.length - 2 })}`
                                                                            }
                                                                        >
                                                                            <ChevronDown
                                                                                className={cn(
                                                                                    'h-4 w-4 transition-transform',
                                                                                    expandedGroups[
                                                                                        group
                                                                                            .type
                                                                                    ]
                                                                                        ? 'rotate-180'
                                                                                        : 'rotate-0',
                                                                                )}
                                                                            />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="mt-3 space-y-2">
                                                                {(expandedGroups[
                                                                    group.type
                                                                ]
                                                                    ? group.items
                                                                    : group.items.slice(
                                                                          0,
                                                                          2,
                                                                      )
                                                                ).map(
                                                                    (
                                                                        req,
                                                                        reqIdx,
                                                                    ) => {
                                                                        const importanceValue =
                                                                            (req
                                                                                .metadata
                                                                                ?.importance ||
                                                                                'important') as keyof typeof IMPORTANCE_LEVELS;
                                                                        const importance =
                                                                            IMPORTANCE_LEVELS[
                                                                                importanceValue
                                                                            ] ??
                                                                            IMPORTANCE_LEVELS.important;
                                                                        const niveauNom =
                                                                            req
                                                                                .metadata
                                                                                ?.niveau_nom;

                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    reqIdx
                                                                                }
                                                                                className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3"
                                                                            >
                                                                                <div className="min-w-0 flex-1 pr-2">
                                                                                    <p className="text-sm leading-snug font-semibold break-words whitespace-normal text-slate-900">
                                                                                        {
                                                                                            req.label
                                                                                        }
                                                                                    </p>
                                                                                    {niveauNom && (
                                                                                        <p className="mt-1 text-[10px] font-bold tracking-widest break-words text-slate-500 uppercase">
                                                                                            {t(
                                                                                                'recruiter_offers.show.level',
                                                                                                {
                                                                                                    level: niveauNom,
                                                                                                },
                                                                                            )}
                                                                                        </p>
                                                                                    )}
                                                                                </div>

                                                                                {req.taxonomy_type ===
                                                                                    'LANGUE' && (
                                                                                    <Badge
                                                                                        className={cn(
                                                                                            'h-6 flex-shrink-0 rounded-full border px-3 text-[9px] font-black tracking-[0.1em] uppercase shadow-sm',
                                                                                            importance.color,
                                                                                        )}
                                                                                    >
                                                                                        {importanceValue ===
                                                                                        'indispensable'
                                                                                            ? t(
                                                                                                  'recruiter_offers.show.importance.indispensable',
                                                                                              )
                                                                                            : importanceValue ===
                                                                                                'important'
                                                                                              ? t(
                                                                                                    'recruiter_offers.show.importance.important',
                                                                                                )
                                                                                              : importanceValue ===
                                                                                                  'souhaitable'
                                                                                                ? t(
                                                                                                      'recruiter_offers.show.importance.souhaitable',
                                                                                                  )
                                                                                                : t(
                                                                                                      'recruiter_offers.show.importance.facultatif',
                                                                                                  )}
                                                                                    </Badge>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}

                                                                {group.items
                                                                    .length >
                                                                    2 &&
                                                                    !expandedGroups[
                                                                        group
                                                                            .type
                                                                    ] && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                toggleGroup(
                                                                                    group.type,
                                                                                )
                                                                            }
                                                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-black tracking-[0.2em] text-slate-500 uppercase transition-colors hover:bg-slate-50"
                                                                        >
                                                                            <ChevronDown className="h-4 w-4" />
                                                                            {group
                                                                                .items
                                                                                .length -
                                                                                2 >
                                                                            1
                                                                                ? t(
                                                                                      'recruiter_offers.show.view_other_plural',
                                                                                      {
                                                                                          count:
                                                                                              group
                                                                                                  .items
                                                                                                  .length -
                                                                                              2,
                                                                                      },
                                                                                  )
                                                                                : t(
                                                                                      'recruiter_offers.show.view_other',
                                                                                      {
                                                                                          count:
                                                                                              group
                                                                                                  .items
                                                                                                  .length -
                                                                                              2,
                                                                                      },
                                                                                  )}
                                                                        </button>
                                                                    )}

                                                                {group.items
                                                                    .length >
                                                                    2 &&
                                                                    expandedGroups[
                                                                        group
                                                                            .type
                                                                    ] && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                toggleGroup(
                                                                                    group.type,
                                                                                )
                                                                            }
                                                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-black tracking-[0.2em] text-slate-500 uppercase transition-colors hover:bg-slate-50"
                                                                        >
                                                                            <ChevronDown className="h-4 w-4 rotate-180" />
                                                                            {t(
                                                                                'recruiter_offers.show.collapse_list',
                                                                            )}
                                                                        </button>
                                                                    )}
                                                            </div>
                                                        </motion.div>
                                                    ),
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Check,
    X,
    GraduationCap,
    Briefcase,
    Globe,
    Clock,
    MapPin,
    Phone,
    Mail,
    Archive,
    Search,
    FileText,
    ExternalLink,
    ChevronDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { diploma as adminDiploma } from '@/routes/admin/candidates';

const breadcrumbs = (t: any) => [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: t('admin_candidates.breadcrumb'), href: '/admin/candidats' },
];

const statusTabs = (t: any) => [
    { value: 'en_attente', label: t('admin_candidates.tabs.pending') },
    { value: 'accepte', label: t('admin_candidates.tabs.accepted') },
    { value: 'refuse', label: t('admin_candidates.tabs.rejected') },
    { value: 'archive', label: t('admin_candidates.tabs.archived') },
];

import CandidateDiplomaAction from '@/components/admin/CandidateDiplomaAction';
import { formatCandidateExperienceLabel } from '@/lib/format-experience';

export default function Candidats({ candidates, currentStatus, filters }: any) {
    const { t } = useTranslation();
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/candidats',
            { status: currentStatus, search },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleApprove = (id: number) => {
        router.post(
            `/admin/candidats/${id}/approve`,
            {},
            { preserveScroll: true },
        );
    };

    const handleReject = (id: number) => {
        router.post(
            `/admin/candidats/${id}/reject`,
            {},
            { preserveScroll: true },
        );
    };

    const handleArchive = (id: number) => {
        router.post(
            `/admin/candidats/${id}/archive`,
            {},
            { preserveScroll: true },
        );
    };

    const getInitials = (nom: string, prenom: string) =>
        `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();

    return (
        <AdminLayout breadcrumbs={breadcrumbs(t)}>
            <Head title={t('admin_candidates.page_title')} />

            <div
                className="flex flex-col gap-8"
                style={{ fontFamily: 'Outfit, sans-serif' }}
            >
                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-[#1a1f1e]/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-xs font-medium tracking-[0.2em] text-[#C06041] uppercase">
                            {t('admin_candidates.admin_label')}
                        </p>
                        <h1
                            className="text-4xl leading-tight font-light text-[#1a1f1e] md:text-5xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('admin_candidates.title_part1')}{' '}
                            <span className="italic">
                                {t('admin_candidates.title_part2')}
                            </span>
                        </h1>
                        <p className="mt-2 text-sm text-[#1a1f1e]/40">
                            {candidates.total > 1
                                ? t('admin_candidates.total_count_plural', {
                                      count: candidates.total,
                                  })
                                : t('admin_candidates.total_count', {
                                      count: candidates.total,
                                  })}
                        </p>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="flex w-full items-center gap-2 sm:max-w-xs"
                    >
                        <div className="relative w-full">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                            <input
                                type="text"
                                placeholder={t(
                                    'admin_candidates.search_placeholder',
                                )}
                                className="h-10 w-full border border-[#1a1f1e]/20 bg-white px-3 pl-9 text-sm transition-colors outline-none focus:border-[#C06041]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="h-10 shrink-0 bg-[#1a1f1e] px-4 text-xs tracking-wider text-white uppercase transition-colors hover:bg-[#1a1f1e]/80"
                        >
                            {t('admin_candidates.search_btn')}
                        </button>
                    </form>
                </div>

                {/* Status tabs */}
                <div className="-mt-4 flex overflow-x-auto border-b border-[#1a1f1e]/10">
                    {statusTabs(t).map((tab) => (
                        <Link
                            key={tab.value}
                            href={`/admin/candidats?status=${tab.value}${search ? `&search=${search}` : ''}`}
                            className={`border-b-2 px-4 py-3 text-xs font-medium tracking-wider whitespace-nowrap uppercase transition-all ${
                                currentStatus === tab.value ||
                                (!currentStatus && tab.value === 'accepte')
                                    ? 'border-[#C06041] text-[#C06041]'
                                    : 'border-transparent text-[#1a1f1e]/40 hover:text-[#1a1f1e]'
                            }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>

                {/* Candidats list */}
                <div className="flex flex-col gap-4">
                    {candidates.data.length === 0 && (
                        <div className="border border-[#1a1f1e]/8 bg-white py-16 text-center">
                            <p className="text-sm tracking-wider text-[#1a1f1e]/30 uppercase">
                                {t('admin_candidates.empty_state')}
                            </p>
                        </div>
                    )}

                    {candidates.data.map((candidat: any) => (
                        <div
                            key={candidat.id}
                            className="group relative border border-[#1a1f1e]/8 bg-white p-6 transition-colors hover:border-[#1a1f1e]/20"
                        >
                            <div className="absolute top-0 left-0 h-full w-[2px] bg-[#C06041] opacity-0 transition-opacity group-hover:opacity-100" />

                            {/* Top row: avatar + info + actions */}
                            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start">
                                {/* Avatar */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a1f1e] text-sm font-semibold tracking-wider text-white">
                                    {getInitials(candidat.nom, candidat.prenom)}
                                </div>

                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex flex-wrap items-center gap-2">
                                        <h3 className="text-base font-semibold text-[#1a1f1e]">
                                            {candidat.prenom} {candidat.nom}
                                        </h3>
                                        {currentStatus === 'en_attente' && (
                                            <span className="border border-amber-300 bg-amber-50 px-2 py-0.5 text-[9px] tracking-widest text-amber-600 uppercase">
                                                {t(
                                                    'admin_candidates.badges.pending',
                                                )}
                                            </span>
                                        )}
                                        {currentStatus === 'accepte' && (
                                            <span className="border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[9px] tracking-widest text-emerald-600 uppercase">
                                                {t(
                                                    'admin_candidates.badges.accepted',
                                                )}
                                            </span>
                                        )}
                                        {currentStatus === 'refuse' && (
                                            <span className="border border-rose-300 bg-rose-50 px-2 py-0.5 text-[9px] tracking-widest text-rose-600 uppercase">
                                                {t(
                                                    'admin_candidates.badges.rejected',
                                                )}
                                            </span>
                                        )}
                                        {currentStatus === 'archive' && (
                                            <span className="border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] tracking-widest text-slate-400 uppercase">
                                                {t(
                                                    'admin_candidates.badges.archived',
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#1a1f1e]/50">
                                        {candidat.postes?.length > 0 && (
                                            <span>
                                                {candidat.postes
                                                    .map(
                                                        (p: any) =>
                                                            p.poste?.nom,
                                                    )
                                                    .filter(Boolean)
                                                    .join(', ')}
                                            </span>
                                        )}
                                        {candidat.formation_juridique?.nom && (
                                            <>
                                                <span className="text-[#1a1f1e]/20">
                                                    ·
                                                </span>
                                                <span>
                                                    {
                                                        candidat
                                                            .formation_juridique
                                                            .nom
                                                    }
                                                </span>
                                            </>
                                        )}
                                        {candidat.niveau_experience?.nom && (
                                            <>
                                                <span className="text-[#1a1f1e]/20">
                                                    ·
                                                </span>
                                                <span>
                                                    {formatCandidateExperienceLabel(
                                                        candidat
                                                            .niveau_experience
                                                            .nom,
                                                        candidat.exact_experience_months,
                                                        t,
                                                    )}
                                                </span>
                                            </>
                                        )}
                                        {candidat.ville_travails?.length >
                                            0 && (
                                            <>
                                                <span className="text-[#1a1f1e]/20">
                                                    ·
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {Array.from(
                                                        new Set(
                                                            candidat.ville_travails.map(
                                                                (v: any) =>
                                                                    v.ville
                                                                        ?.nom,
                                                            ),
                                                        ),
                                                    ).join(', ')}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex shrink-0 flex-wrap items-center gap-2">
                                    <CandidateDiplomaAction
                                        formations={candidat.formations}
                                    />
                                    {(currentStatus === 'en_attente' ||
                                        currentStatus === 'archive') && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleApprove(candidat.id)
                                                }
                                                className="inline-flex items-center gap-1 border border-emerald-500 px-3 py-1.5 text-xs tracking-wider text-emerald-700 uppercase transition-colors hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                                            >
                                                <Check className="h-3 w-3" />
                                                {t(
                                                    'admin_candidates.actions.approve',
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleReject(candidat.id)
                                                }
                                                className="inline-flex items-center gap-1 border border-rose-400 px-3 py-1.5 text-xs tracking-wider text-rose-600 uppercase transition-colors hover:border-rose-600 hover:bg-rose-600 hover:text-white"
                                            >
                                                <X className="h-3 w-3" />
                                                {t(
                                                    'admin_candidates.actions.reject',
                                                )}
                                            </button>
                                        </>
                                    )}
                                    {currentStatus === 'refuse' && (
                                        <button
                                            onClick={() =>
                                                handleApprove(candidat.id)
                                            }
                                            className="inline-flex items-center gap-1 border border-emerald-500 px-3 py-1.5 text-xs tracking-wider text-emerald-700 uppercase transition-colors hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                                        >
                                            <Check className="h-3 w-3" />
                                            {t(
                                                'admin_candidates.actions.approve',
                                            )}
                                        </button>
                                    )}
                                    {currentStatus === 'accepte' && (
                                        <button
                                            onClick={() =>
                                                handleReject(candidat.id)
                                            }
                                            className="inline-flex items-center gap-1 border border-rose-400 px-3 py-1.5 text-xs tracking-wider text-rose-600 uppercase transition-colors hover:border-rose-600 hover:bg-rose-600 hover:text-white"
                                        >
                                            <X className="h-3 w-3" />
                                            {t(
                                                'admin_candidates.actions.reject',
                                            )}
                                        </button>
                                    )}
                                    {currentStatus !== 'archive' && (
                                        <button
                                            onClick={() =>
                                                handleArchive(candidat.id)
                                            }
                                            className="inline-flex items-center gap-1 border border-[#1a1f1e]/20 px-3 py-1.5 text-xs tracking-wider text-[#1a1f1e]/50 uppercase transition-colors hover:bg-[#1a1f1e]/5"
                                        >
                                            <Archive className="h-3 w-3" />
                                            {t(
                                                'admin_candidates.actions.archive',
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Details grid */}
                            <div className="grid grid-cols-1 gap-4 border-t border-[#1a1f1e]/6 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                                {candidat.formations?.length > 0 && (
                                    <div>
                                        <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] text-[#1a1f1e]/30 uppercase">
                                            <GraduationCap className="h-3 w-3" />{' '}
                                            {t(
                                                'admin_candidates.details.education',
                                            )}
                                        </p>
                                        <div className="space-y-1.5">
                                            {candidat.formations.map(
                                                (form: any) => (
                                                    <div
                                                        key={form.id}
                                                        className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1a1f1e]/5 pb-1 text-xs text-[#1a1f1e]/70 last:border-0"
                                                    >
                                                        <span className="min-w-0 flex-1 truncate">
                                                            <span className="font-semibold text-[#1a1f1e]">
                                                                {
                                                                    form
                                                                        .formation_juridique
                                                                        ?.nom
                                                                }
                                                            </span>
                                                            {form.ecole?.nom
                                                                ? ` — ${form.ecole.nom}`
                                                                : form.autre_ecole
                                                                  ? ` — ${form.autre_ecole}`
                                                                  : ''}
                                                            {form.annee_fin
                                                                ? ` (${form.annee_fin})`
                                                                : ''}
                                                        </span>
                                                        {form.has_diploma ? (
                                                            <a
                                                                href={
                                                                    adminDiploma(
                                                                        form.id,
                                                                    ).url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex shrink-0 items-center gap-1 border border-[#C06041]/30 bg-[#C06041]/10 px-2 py-0.5 text-[11px] font-semibold text-[#C06041] transition-colors hover:bg-[#C06041] hover:text-white"
                                                            >
                                                                <FileText className="h-3 w-3" />
                                                                {t(
                                                                    'admin_candidates.details.view_pdf',
                                                                )}
                                                                <ExternalLink className="h-2.5 w-2.5 opacity-75" />
                                                            </a>
                                                        ) : (
                                                            <span className="shrink-0 text-[10px] text-[#1a1f1e]/30 italic">
                                                                {t(
                                                                    'admin_candidates.details.no_pdf',
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                                {candidat.experiences?.length > 0 && (
                                    <div>
                                        <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.15em] text-[#1a1f1e]/30 uppercase">
                                            <Briefcase className="h-3 w-3" />{' '}
                                            {t(
                                                'admin_candidates.details.experience',
                                            )}
                                        </p>
                                        <div className="space-y-0.5">
                                            {candidat.experiences.map(
                                                (exp: any) => (
                                                    <p
                                                        key={exp.id}
                                                        className="text-xs text-[#1a1f1e]/60"
                                                    >
                                                        {exp.poste?.nom} —{' '}
                                                        {exp.entreprise} (
                                                        {exp.debut} –{' '}
                                                        {exp.fin ||
                                                            t(
                                                                'admin_candidates.details.present',
                                                            )}
                                                        )
                                                    </p>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    {candidat.langues?.length > 0 && (
                                        <p className="flex items-center gap-1.5 text-xs text-[#1a1f1e]/50">
                                            <Globe className="h-3 w-3 text-[#C06041]/60" />
                                            {Array.from(
                                                new Set(
                                                    candidat.langues.map(
                                                        (l: any) =>
                                                            l.langue?.nom,
                                                    ),
                                                ),
                                            ).join(', ')}
                                        </p>
                                    )}
                                    {candidat.type_travails?.length > 0 && (
                                        <p className="flex items-center gap-1.5 text-xs text-[#1a1f1e]/50">
                                            <Clock className="h-3 w-3 text-[#C06041]/60" />
                                            {Array.from(
                                                new Set(
                                                    candidat.type_travails.map(
                                                        (t: any) =>
                                                            t.type_travail?.nom,
                                                    ),
                                                ),
                                            ).join(', ')}
                                        </p>
                                    )}
                                    {candidat.mode_travails?.length > 0 && (
                                        <p className="flex items-center gap-1.5 text-xs text-[#1a1f1e]/50">
                                            <MapPin className="h-3 w-3 text-[#C06041]/60" />
                                            {Array.from(
                                                new Set(
                                                    candidat.mode_travails.map(
                                                        (m: any) =>
                                                            m.mode_travail?.nom,
                                                    ),
                                                ),
                                            ).join(' / ')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Specialisations */}
                            {candidat.specialisations?.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {candidat.specialisations.map(
                                        (spec: any) => (
                                            <span
                                                key={spec.id}
                                                className="border border-[#1a1f1e]/12 px-2 py-0.5 text-[10px] tracking-wider text-[#1a1f1e]/50 uppercase"
                                            >
                                                {spec.specialisation?.nom}
                                            </span>
                                        ),
                                    )}
                                </div>
                            )}

                            {/* Contact */}
                            <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[#1a1f1e]/6 pt-3 text-xs text-[#1a1f1e]/40">
                                {candidat.user?.telephone && (
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="h-3 w-3" />
                                        {candidat.user.telephone}
                                    </span>
                                )}
                                {candidat.user?.email && (
                                    <a
                                        href={`mailto:${candidat.user.email}`}
                                        className="flex items-center gap-1.5 transition-colors hover:text-[#C06041]"
                                    >
                                        <Mail className="h-3 w-3" />
                                        {candidat.user.email}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {candidates.total > 0 && (
                    <div className="flex items-center justify-between border-t border-[#1a1f1e]/8 pt-6">
                        <p className="text-xs text-[#1a1f1e]/40">
                            {t('admin_candidates.pagination.info', {
                                from: candidates.from,
                                to: candidates.to,
                                total: candidates.total,
                            })}
                        </p>
                        <div className="flex gap-1.5">
                            {candidates.links.map(
                                (link: any, index: number) => {
                                    if (link.label.includes('Previous')) {
                                        return (
                                            <button
                                                key={index}
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(link.url)
                                                }
                                                className="border border-[#1a1f1e]/15 px-3 py-1.5 text-xs text-[#1a1f1e]/60 transition-colors hover:border-[#1a1f1e]/40 disabled:cursor-not-allowed disabled:opacity-30"
                                            >
                                                {t(
                                                    'admin_candidates.pagination.prev',
                                                )}
                                            </button>
                                        );
                                    }
                                    if (link.label.includes('Next')) {
                                        return (
                                            <button
                                                key={index}
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(link.url)
                                                }
                                                className="border border-[#1a1f1e]/15 px-3 py-1.5 text-xs text-[#1a1f1e]/60 transition-colors hover:border-[#1a1f1e]/40 disabled:cursor-not-allowed disabled:opacity-30"
                                            >
                                                {t(
                                                    'admin_candidates.pagination.next',
                                                )}
                                            </button>
                                        );
                                    }
                                    if (
                                        !link.url ||
                                        isNaN(Number(link.label))
                                    ) {
                                        return null;
                                    }
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`border px-3 py-1.5 text-xs transition-colors ${
                                                link.active
                                                    ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                                    : 'border-[#1a1f1e]/15 text-[#1a1f1e]/60 hover:border-[#1a1f1e]/40'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                },
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

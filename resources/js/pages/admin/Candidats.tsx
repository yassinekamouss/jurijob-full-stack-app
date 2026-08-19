import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Check, X, GraduationCap, Briefcase, Globe, Clock, MapPin, Phone, Mail, Archive, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

export default function Candidats({ candidates, currentStatus, filters }: any) {
    const { t } = useTranslation();
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/candidats', { status: currentStatus, search }, { preserveState: true, preserveScroll: true });
    };

    const handleApprove = (id: number) => {
        router.post(`/admin/candidats/${id}/approve`, {}, { preserveScroll: true });
    };

    const handleReject = (id: number) => {
        router.post(`/admin/candidats/${id}/reject`, {}, { preserveScroll: true });
    };

    const handleArchive = (id: number) => {
        router.post(`/admin/candidats/${id}/archive`, {}, { preserveScroll: true });
    };

    const getInitials = (nom: string, prenom: string) =>
        `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();

    return (
        <AdminLayout breadcrumbs={breadcrumbs(t)}>
            <Head title={t('admin_candidates.page_title')} />

            <div className="flex flex-col gap-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {/* Header */}
                <div className="border-b border-[#1a1f1e]/10 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#C06041] font-medium mb-2">
                            {t('admin_candidates.admin_label')}
                        </p>
                        <h1
                            className="text-4xl md:text-5xl text-[#1a1f1e] font-light leading-tight"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('admin_candidates.title_part1')} <span className="italic">{t('admin_candidates.title_part2')}</span>
                        </h1>
                        <p className="text-[#1a1f1e]/40 mt-2 text-sm">
                            {candidates.total > 1 
                                ? t('admin_candidates.total_count_plural', { count: candidates.total }) 
                                : t('admin_candidates.total_count', { count: candidates.total })}
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:max-w-xs">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30" />
                            <input
                                type="text"
                                placeholder={t('admin_candidates.search_placeholder')}
                                className="w-full pl-9 border border-[#1a1f1e]/20 bg-white h-10 text-sm outline-none focus:border-[#C06041] transition-colors px-3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#1a1f1e] text-white h-10 px-4 text-xs uppercase tracking-wider hover:bg-[#1a1f1e]/80 transition-colors shrink-0"
                        >
                            {t('admin_candidates.search_btn')}
                        </button>
                    </form>
                </div>

                {/* Status tabs */}
                <div className="flex overflow-x-auto border-b border-[#1a1f1e]/10 -mt-4">
                    {statusTabs(t).map((tab) => (
                        <Link
                            key={tab.value}
                            href={`/admin/candidats?status=${tab.value}${search ? `&search=${search}` : ''}`}
                            className={`whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider transition-all border-b-2 ${
                                currentStatus === tab.value || (!currentStatus && tab.value === 'accepte')
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
                        <div className="bg-white border border-[#1a1f1e]/8 py-16 text-center">
                            <p className="text-[#1a1f1e]/30 text-sm uppercase tracking-wider">{t('admin_candidates.empty_state')}</p>
                        </div>
                    )}

                    {candidates.data.map((candidat: any) => (
                        <div
                            key={candidat.id}
                            className="bg-white border border-[#1a1f1e]/8 p-6 group hover:border-[#1a1f1e]/20 transition-colors relative overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 w-[2px] h-full bg-[#C06041] opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Top row: avatar + info + actions */}
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                                {/* Avatar */}
                                <div className="h-12 w-12 rounded-full bg-[#1a1f1e] text-white flex items-center justify-center text-sm font-semibold tracking-wider shrink-0">
                                    {getInitials(candidat.nom, candidat.prenom)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h3 className="text-base font-semibold text-[#1a1f1e]">
                                            {candidat.prenom} {candidat.nom}
                                        </h3>
                                        {currentStatus === 'en_attente' && (
                                            <span className="text-[9px] uppercase tracking-widest border border-amber-300 text-amber-600 px-2 py-0.5 bg-amber-50">
                                                {t('admin_candidates.badges.pending')}
                                            </span>
                                        )}
                                        {currentStatus === 'accepte' && (
                                            <span className="text-[9px] uppercase tracking-widest border border-emerald-300 text-emerald-600 px-2 py-0.5 bg-emerald-50">
                                                {t('admin_candidates.badges.accepted')}
                                            </span>
                                        )}
                                        {currentStatus === 'refuse' && (
                                            <span className="text-[9px] uppercase tracking-widest border border-rose-300 text-rose-600 px-2 py-0.5 bg-rose-50">
                                                {t('admin_candidates.badges.rejected')}
                                            </span>
                                        )}
                                        {currentStatus === 'archive' && (
                                            <span className="text-[9px] uppercase tracking-widest border border-slate-200 text-slate-400 px-2 py-0.5 bg-slate-50">
                                                {t('admin_candidates.badges.archived')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#1a1f1e]/50">
                                        {candidat.postes?.length > 0 && <span>{candidat.postes.map((p: any) => p.poste?.nom).filter(Boolean).join(', ')}</span>}
                                        {candidat.formation_juridique?.nom && (
                                            <>
                                                <span className="text-[#1a1f1e]/20">·</span>
                                                <span>{candidat.formation_juridique.nom}</span>
                                            </>
                                        )}
                                        {candidat.niveau_experience?.nom && (
                                            <>
                                                <span className="text-[#1a1f1e]/20">·</span>
                                                <span>{candidat.niveau_experience.nom}</span>
                                            </>
                                        )}
                                        {candidat.ville_travails?.length > 0 && (
                                            <>
                                                <span className="text-[#1a1f1e]/20">·</span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {Array.from(new Set(candidat.ville_travails.map((v: any) => v.ville?.nom))).join(', ')}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 flex-wrap shrink-0">
                                    {(currentStatus === 'en_attente' || currentStatus === 'archive') && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(candidat.id)}
                                                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider border border-emerald-500 text-emerald-700 px-3 py-1.5 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                                            >
                                                <Check className="h-3 w-3" />
                                                {t('admin_candidates.actions.approve')}
                                            </button>
                                            <button
                                                onClick={() => handleReject(candidat.id)}
                                                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider border border-rose-400 text-rose-600 px-3 py-1.5 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors"
                                            >
                                                <X className="h-3 w-3" />
                                                {t('admin_candidates.actions.reject')}
                                            </button>
                                        </>
                                    )}
                                    {currentStatus === 'refuse' && (
                                        <button
                                            onClick={() => handleApprove(candidat.id)}
                                            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider border border-emerald-500 text-emerald-700 px-3 py-1.5 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                                        >
                                            <Check className="h-3 w-3" />
                                            {t('admin_candidates.actions.approve')}
                                        </button>
                                    )}
                                    {currentStatus === 'accepte' && (
                                        <button
                                            onClick={() => handleReject(candidat.id)}
                                            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider border border-rose-400 text-rose-600 px-3 py-1.5 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                            {t('admin_candidates.actions.reject')}
                                        </button>
                                    )}
                                    {currentStatus !== 'archive' && (
                                        <button
                                            onClick={() => handleArchive(candidat.id)}
                                            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider border border-[#1a1f1e]/20 text-[#1a1f1e]/50 px-3 py-1.5 hover:bg-[#1a1f1e]/5 transition-colors"
                                        >
                                            <Archive className="h-3 w-3" />
                                            {t('admin_candidates.actions.archive')}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Details grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-[#1a1f1e]/6 pt-4">
                                {candidat.formations?.length > 0 && (
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#1a1f1e]/30 font-medium mb-1.5 flex items-center gap-1.5">
                                            <GraduationCap className="h-3 w-3" /> {t('admin_candidates.details.education')}
                                        </p>
                                        <div className="space-y-0.5">
                                            {candidat.formations.map((form: any) => (
                                                <p key={form.id} className="text-xs text-[#1a1f1e]/60">
                                                    {form.formation_juridique?.nom}
                                                    {form.ecole?.nom ? ` — ${form.ecole.nom}` : (form.autre_ecole ? ` — ${form.autre_ecole}` : '')}
                                                    {form.annee_fin ? ` (${form.annee_fin})` : ''}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {candidat.experiences?.length > 0 && (
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#1a1f1e]/30 font-medium mb-1.5 flex items-center gap-1.5">
                                            <Briefcase className="h-3 w-3" /> {t('admin_candidates.details.experience')}
                                        </p>
                                        <div className="space-y-0.5">
                                            {candidat.experiences.map((exp: any) => (
                                                <p key={exp.id} className="text-xs text-[#1a1f1e]/60">
                                                    {exp.poste?.nom} — {exp.entreprise} ({exp.debut} – {exp.fin || t('admin_candidates.details.present')})
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    {candidat.langues?.length > 0 && (
                                        <p className="flex items-center gap-1.5 text-xs text-[#1a1f1e]/50">
                                            <Globe className="h-3 w-3 text-[#C06041]/60" />
                                            {Array.from(new Set(candidat.langues.map((l: any) => l.langue?.nom))).join(', ')}
                                        </p>
                                    )}
                                    {candidat.type_travails?.length > 0 && (
                                        <p className="flex items-center gap-1.5 text-xs text-[#1a1f1e]/50">
                                            <Clock className="h-3 w-3 text-[#C06041]/60" />
                                            {Array.from(new Set(candidat.type_travails.map((t: any) => t.type_travail?.nom))).join(', ')}
                                        </p>
                                    )}
                                    {candidat.mode_travails?.length > 0 && (
                                        <p className="flex items-center gap-1.5 text-xs text-[#1a1f1e]/50">
                                            <MapPin className="h-3 w-3 text-[#C06041]/60" />
                                            {Array.from(new Set(candidat.mode_travails.map((m: any) => m.mode_travail?.nom))).join(' / ')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Specialisations */}
                            {candidat.specialisations?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {candidat.specialisations.map((spec: any) => (
                                        <span
                                            key={spec.id}
                                            className="text-[10px] uppercase tracking-wider border border-[#1a1f1e]/12 text-[#1a1f1e]/50 px-2 py-0.5"
                                        >
                                            {spec.specialisation?.nom}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Contact */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-[#1a1f1e]/40 border-t border-[#1a1f1e]/6 pt-3 mt-3">
                                {candidat.user?.telephone && (
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="h-3 w-3" />
                                        {candidat.user.telephone}
                                    </span>
                                )}
                                {candidat.user?.email && (
                                    <a
                                        href={`mailto:${candidat.user.email}`}
                                        className="flex items-center gap-1.5 hover:text-[#C06041] transition-colors"
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
                                total: candidates.total
                            })}
                        </p>
                        <div className="flex gap-1.5">
                            {candidates.links.map((link: any, index: number) => {
                                if (link.label.includes('Previous')) {
                                    return (
                                        <button
                                            key={index}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            className="px-3 py-1.5 text-xs border border-[#1a1f1e]/15 text-[#1a1f1e]/60 hover:border-[#1a1f1e]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {t('admin_candidates.pagination.prev')}
                                        </button>
                                    );
                                }
                                if (link.label.includes('Next')) {
                                    return (
                                        <button
                                            key={index}
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            className="px-3 py-1.5 text-xs border border-[#1a1f1e]/15 text-[#1a1f1e]/60 hover:border-[#1a1f1e]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {t('admin_candidates.pagination.next')}
                                        </button>
                                    );
                                }
                                if (!link.url || isNaN(Number(link.label))) {
                                    return null;
                                }
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-1.5 text-xs border transition-colors ${
                                            link.active
                                                ? 'bg-[#1a1f1e] text-white border-[#1a1f1e]'
                                                : 'border-[#1a1f1e]/15 text-[#1a1f1e]/60 hover:border-[#1a1f1e]/40'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
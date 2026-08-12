import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { ArrowLeft, Building2, Briefcase, GraduationCap, Globe, Mail, Phone, Users, Award, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type MatchingBreakdown = {
    score: number;
    language_bonus: number;
    language_penalty: number;
    specialisation_penalty: number;
};

type MatchedCandidate = {
    id: number;
    nom: string;
    prenom: string;
    matching_score: number;
    matching_breakdown?: MatchingBreakdown;
    user?: { email?: string; telephone?: string };
    poste?: { nom?: string };
    niveau_experience?: { nom?: string };
    formation_juridique?: { nom?: string };
    langues?: Array<{ id: number; langue?: { nom?: string }; niveau_langue?: { nom?: string } }>;
    specialisations?: Array<{ id: number; specialisation?: { nom?: string } }>;
};

type Props = {
    offre: {
        id: number;
        titre: string;
        statut: string;
        nombre_cv: number;
        recruteur?: { nom_entreprise?: string };
        poste?: { nom?: string };
        ville?: { nom?: string };
        niveau_experience?: { nom?: string };
        formation_juridique?: { nom?: string };
    };
    candidates: MatchedCandidate[];
};

const breadcrumbs = (t: any) => [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: t('admin_offers.breadcrumb'), href: '/admin/offres?statut=EN_TRAITEMENT' },
    { title: t('admin_matching.breadcrumb'), href: '#' },
];

function scoreColor(score: number): { bar: string; text: string; bg: string } {
    if (score >= 100) return { bar: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    if (score >= 90) return { bar: 'bg-sky-500', text: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' };
    if (score >= 80) return { bar: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    return { bar: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
}

export default function OffreMatching({ offre, candidates }: Props) {
    const { t } = useTranslation();
    const shortlist = candidates.slice(0, offre.nombre_cv);
    const rest = candidates.slice(offre.nombre_cv);

    return (
        <AdminLayout breadcrumbs={breadcrumbs(t)}>
            <Head title={t('admin_matching.page_title', { title: offre.titre })} />

            <div className="flex flex-col gap-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {/* Back + Header */}
                <div className="border-b border-[#1a1f1e]/10 pb-8">
                    <Link
                        href="/admin/offres?statut=EN_TRAITEMENT"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#1a1f1e]/40 hover:text-[#C06041] transition-colors mb-6"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {t('admin_matching.back_to_offers')}
                    </Link>

                    <p className="text-xs uppercase tracking-[0.2em] text-[#C06041] font-medium mb-2">{t('admin_matching.matching_results')}</p>
                    <h1
                        className="text-3xl md:text-4xl text-[#1a1f1e] font-light leading-tight"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        {offre.titre}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-[#1a1f1e]/50">
                        {offre.recruteur?.nom_entreprise && (
                            <span className="flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5" />
                                {offre.recruteur.nom_entreprise}
                            </span>
                        )}
                        {offre.poste?.nom && (
                            <span className="flex items-center gap-1.5">
                                <Briefcase className="h-3.5 w-3.5" />
                                {offre.poste.nom}
                            </span>
                        )}
                        {offre.niveau_experience?.nom && <span>{offre.niveau_experience.nom}</span>}
                        <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {t('admin_matching.cv_requested', { count: offre.nombre_cv })}
                        </span>
                    </div>

                    {/* Stats bar */}
                    <div className="flex flex-wrap gap-4 mt-5">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#1a1f1e]/8">
                            <span className="text-xl font-medium text-[#1a1f1e]">
                                {candidates.length}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-[#1a1f1e]/40">{t('admin_matching.profiles_matched')}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200">
                            <Star className="h-4 w-4 text-emerald-600" />
                            <span className="text-xl font-medium text-emerald-700">
                                {Math.min(offre.nombre_cv, candidates.length)}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-emerald-600">{t('admin_matching.in_shortlist')}</span>
                        </div>
                    </div>
                </div>

                {/* Empty state */}
                {candidates.length === 0 && (
                    <div className="bg-white border border-[#1a1f1e]/8 py-20 text-center">
                        <p className="text-[#1a1f1e]/25 text-sm uppercase tracking-widest mb-2">{t('admin_matching.empty_state')}</p>
                        <p className="text-[#1a1f1e]/40 text-xs">{t('admin_matching.empty_desc')}</p>
                    </div>
                )}

                {/* Short-list section */}
                {shortlist.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-px flex-1 bg-emerald-200" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-medium flex items-center gap-1.5">
                                <Star className="h-3 w-3" />
                                {shortlist.length > 1
                                    ? t('admin_matching.shortlist_title_plural', { count: shortlist.length })
                                    : t('admin_matching.shortlist_title', { count: shortlist.length })}
                            </span>
                            <span className="h-px flex-1 bg-emerald-200" />
                        </div>

                        {shortlist.map((candidat, index) => {
                            const colors = scoreColor(candidat.matching_score);
                            const displayScore = Math.min(candidat.matching_score, 100);
                            return (
                                <CandidateCard
                                    key={candidat.id}
                                    candidat={candidat}
                                    index={index}
                                    colors={colors}
                                    displayScore={displayScore}
                                    inShortlist
                                />
                            );
                        })}
                    </div>
                )}

                {/* Rest of candidates */}
                {rest.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-px flex-1 bg-[#1a1f1e]/8" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1f1e]/30 font-medium">
                                {t('admin_matching.other_candidates', { count: rest.length })}
                            </span>
                            <span className="h-px flex-1 bg-[#1a1f1e]/8" />
                        </div>

                        {rest.map((candidat, index) => {
                            const colors = scoreColor(candidat.matching_score);
                            const displayScore = Math.min(candidat.matching_score, 100);
                            return (
                                <CandidateCard
                                    key={candidat.id}
                                    candidat={candidat}
                                    index={shortlist.length + index}
                                    colors={colors}
                                    displayScore={displayScore}
                                    inShortlist={false}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function CandidateCard({
    candidat,
    index,
    colors,
    displayScore,
    inShortlist,
}: {
    candidat: MatchedCandidate;
    index: number;
    colors: { bar: string; text: string; bg: string };
    displayScore: number;
    inShortlist: boolean;
}) {
    const { t } = useTranslation();
    const breakdown = candidat.matching_breakdown;

    return (
        <div
            className={`bg-white border p-5 relative overflow-hidden group transition-colors ${
                inShortlist ? 'border-emerald-200 hover:border-emerald-300' : 'border-[#1a1f1e]/8 hover:border-[#1a1f1e]/20'
            }`}
        >
            <div className={`absolute left-0 top-0 w-[2px] h-full ${inShortlist ? 'bg-emerald-400' : 'bg-[#C06041] opacity-0 group-hover:opacity-100'} transition-opacity`} />

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-3">
                    {/* Name row */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#1a1f1e]/25 font-medium">#{index + 1}</span>
                        <h3 className="text-base font-semibold text-[#1a1f1e]">
                            {candidat.prenom} {candidat.nom}
                        </h3>
                        {inShortlist && (
                            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest border border-emerald-300 text-emerald-600 px-2 py-0.5 bg-emerald-50">
                                <Star className="h-2.5 w-2.5" />
                                Short-list
                            </span>
                        )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#1a1f1e]/50">
                        {candidat.poste?.nom && (
                            <span className="flex items-center gap-1.5">
                                <Briefcase className="h-3 w-3" />
                                {candidat.poste.nom}
                            </span>
                        )}
                        {candidat.niveau_experience?.nom && (
                            <span className="flex items-center gap-1.5">
                                <Award className="h-3 w-3" />
                                {candidat.niveau_experience.nom}
                            </span>
                        )}
                        {candidat.formation_juridique?.nom && (
                            <span className="flex items-center gap-1.5">
                                <GraduationCap className="h-3 w-3" />
                                {candidat.formation_juridique.nom}
                            </span>
                        )}
                    </div>

                    {/* Specialisations */}
                    {candidat.specialisations && candidat.specialisations.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {candidat.specialisations.map((spec) => (
                                <span
                                    key={spec.id}
                                    className="text-[10px] uppercase tracking-wider border border-[#1a1f1e]/12 text-[#1a1f1e]/50 px-2 py-0.5"
                                >
                                    {spec.specialisation?.nom}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Langues */}
                    {candidat.langues && candidat.langues.length > 0 && (
                        <p className="flex items-center gap-1.5 text-xs text-[#1a1f1e]/50">
                            <Globe className="h-3 w-3 text-[#C06041]/50" />
                            {candidat.langues
                                .map((l) => `${l.langue?.nom ?? ''}${l.niveau_langue?.nom ? ` (${l.niveau_langue.nom})` : ''}`)
                                .filter(Boolean)
                                .join(' · ')}
                        </p>
                    )}

                    {/* Breakdown */}
                    {breakdown && (
                        <div className="flex flex-wrap gap-3 text-[10px] text-[#1a1f1e]/35 uppercase tracking-wider">
                            <span className="text-emerald-600">{t('admin_matching.bonus_languages', { count: breakdown.language_bonus })}</span>
                            {breakdown.language_penalty > 0 && (
                                <span className="text-rose-500">{t('admin_matching.penalty_languages', { count: breakdown.language_penalty })}</span>
                            )}
                            {breakdown.specialisation_penalty > 0 && (
                                <span className="text-rose-500">{t('admin_matching.penalty_specialities', { count: breakdown.specialisation_penalty })}</span>
                            )}
                        </div>
                    )}

                    {/* Contact */}
                    <div className="flex flex-wrap gap-4 text-xs text-[#1a1f1e]/40 border-t border-[#1a1f1e]/6 pt-2">
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

                {/* Score */}
                <div className={`flex flex-col items-center justify-center shrink-0 px-5 py-4 border ${colors.bg} min-w-[80px]`}>
                    <span className={`text-3xl font-medium ${colors.text}`}>
                        {displayScore}
                    </span>
                    <span className={`text-[9px] uppercase tracking-widest ${colors.text} opacity-70`}>{t('admin_matching.score')}</span>
                </div>
            </div>
        </div>
    );
}

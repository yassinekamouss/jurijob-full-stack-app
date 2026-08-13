import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Briefcase,
    Building2,
    Calendar,
    GraduationCap,
    Globe,
    Laptop,
    Mail,
    MapPin,
    Phone,
    Award,
    type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { index as offresIndex } from '@/routes/offres';

type ProfileLangue = {
    nom?: string | null;
    niveau?: string | null;
};

type ProfileExperience = {
    entreprise?: string | null;
    poste?: string | null;
    type_travail?: string | null;
    debut?: string | null;
    fin?: string | null;
};

type ProfileFormation = {
    ecole?: string | null;
    formation_juridique?: string | null;
    specialisation?: string | null;
    annee_debut?: number | string | null;
    annee_fin?: number | string | null;
};

type Profile = {
    id: number;
    match_score: number;
    nom: string;
    prenom: string;
    email?: string | null;
    telephone?: string | null;
    poste?: string | null;
    niveau_experience?: string | null;
    formation_juridique?: string | null;
    urgence?: string | null;
    specialisations: string[];
    langues: ProfileLangue[];
    villes: string[];
    modes_travail: string[];
    types_travail: string[];
    experiences: ProfileExperience[];
    formations: ProfileFormation[];
};

type OffreCriteria = {
    id: number;
    titre: string;
    statut: string;
    ville?: string | null;
    type_travail?: string | null;
    mode_travail?: string | null;
    specialisations: string[];
    langues: string[];
};

type Props = {
    offre: OffreCriteria;
    profiles: Profile[];
};

function normalizeLabel(value?: string | null): string {
    return (value ?? '').trim().toLocaleLowerCase();
}

function uniqueLabels(values: Array<string | null | undefined>): string[] {
    const seen = new Set<string>();
    const result: string[] = [];

    for (const value of values) {
        const label = (value ?? '').trim();
        const key = normalizeLabel(label);

        if (!key || seen.has(key)) {
            continue;
        }

        seen.add(key);
        result.push(label);
    }

    return result;
}

function isMatchedValue(value: string | null | undefined, required: Array<string | null | undefined>): boolean {
    const normalized = normalizeLabel(value);

    if (!normalized) {
        return false;
    }

    return required.some((item) => normalizeLabel(item) === normalized);
}

function formatPeriod(start?: string | number | null, end?: string | number | null, presentLabel = 'Présent'): string {
    if (!start && !end) {
        return '';
    }

    const startLabel = start ? String(start) : '—';
    const endLabel = end ? String(end) : presentLabel;

    return `${startLabel} — ${endLabel}`;
}

function displayScore(score: number): number {
    return Math.min(Math.max(score, 0), 100);
}

export default function Profiles({ offre, profiles }: Props) {
    const { t } = useTranslation();

    const offreSpecialisations = uniqueLabels(offre.specialisations ?? []);
    const offreLangues = uniqueLabels(offre.langues ?? []);
    const offreVilles = uniqueLabels([offre.ville]);
    const offreTypesTravail = uniqueLabels([offre.type_travail]);
    const offreModesTravail = uniqueLabels([offre.mode_travail]);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title={`${t('recruiter.profiles.seo_title')} — ${offre.titre}`} />
            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 space-y-4 sm:mb-12"
                >
                    <Link
                        href={offresIndex().url}
                        className="group inline-flex items-center text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 transition-all hover:text-[#1a1f1e]"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {t('recruiter.profiles.back')}
                    </Link>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                        {t('recruiter.profiles.eyebrow')}
                    </p>
                    <h1 className="font-serif text-3xl font-bold italic tracking-tight sm:text-4xl md:text-5xl">
                        {offre.titre}
                    </h1>
                    <p className="max-w-2xl text-sm font-medium text-[#1a1f1e]/50 sm:text-base">
                        {t('recruiter.profiles.subtitle', { count: profiles.length })}
                    </p>
                </motion.div>

                {profiles.length === 0 ? (
                    <div className="border border-[#1a1f1e]/8 bg-white px-6 py-12 text-center sm:px-8 sm:py-16">
                        <p className="text-sm uppercase tracking-widest text-[#1a1f1e]/35">
                            {t('recruiter.profiles.empty')}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-10">
                        {profiles.map((profile, index) => {
                            const score = displayScore(profile.match_score);
                            const specialisations = uniqueLabels(profile.specialisations);
                            const villes = uniqueLabels(profile.villes);
                            const typesTravail = uniqueLabels(profile.types_travail);
                            const modesTravail = uniqueLabels(profile.modes_travail);
                            const langues = profile.langues.filter(
                                (langue, langueIndex, list) =>
                                    normalizeLabel(langue.nom)
                                    && list.findIndex(
                                        (item) => normalizeLabel(item.nom) === normalizeLabel(langue.nom),
                                    ) === langueIndex,
                            );

                            return (
                                <motion.article
                                    key={profile.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    className="overflow-hidden border border-[#1a1f1e]/8 bg-white shadow-sm shadow-[#1a1f1e]/5"
                                >
                                    <div className="border-b border-[#1a1f1e]/8 bg-[#1a1f1e] px-5 py-6 sm:px-8 sm:py-8 text-white">
                                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                                                    {t('recruiter.profiles.profile_label', { number: index + 1 })}
                                                </p>
                                                <h2 className="font-serif text-2xl font-bold italic tracking-tight sm:text-3xl md:text-4xl">
                                                    {profile.prenom} {profile.nom}
                                                </h2>
                                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70">
                                                    {profile.poste && (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Briefcase className="h-3.5 w-3.5" />
                                                            {profile.poste}
                                                        </span>
                                                    )}
                                                    {profile.niveau_experience && (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Award className="h-3.5 w-3.5" />
                                                            {profile.niveau_experience}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:items-end lg:gap-8">
                                                <div className="space-y-2 text-sm">
                                                    {profile.email && (
                                                        <a
                                                            href={`mailto:${profile.email}`}
                                                            className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                                                        >
                                                            <Mail className="h-3.5 w-3.5" />
                                                            {profile.email}
                                                        </a>
                                                    )}
                                                    {profile.telephone && (
                                                        <a
                                                            href={`tel:${profile.telephone}`}
                                                            className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                                                        >
                                                            <Phone className="h-3.5 w-3.5" />
                                                            {profile.telephone}
                                                        </a>
                                                    )}
                                                </div>

                                                <MatchScoreRing score={score} label={t('recruiter.profiles.match_score')} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-0 lg:grid-cols-12">
                                        <aside className="space-y-8 border-b border-[#1a1f1e]/8 bg-[#FDFCF8] px-5 py-6 sm:px-8 sm:py-8 lg:col-span-4 lg:border-b-0 lg:border-r">
                                            <CvBlock title={t('recruiter.profiles.sections.summary')}>
                                                <div className="space-y-2 text-sm text-[#1a1f1e]/70">
                                                    {profile.formation_juridique && (
                                                        <p>
                                                            <span className="font-semibold text-[#1a1f1e]">
                                                                {t('recruiter.profiles.fields.education')}:
                                                            </span>{' '}
                                                            {profile.formation_juridique}
                                                        </p>
                                                    )}
                                                    {profile.urgence && (
                                                        <p>
                                                            <span className="font-semibold text-[#1a1f1e]">
                                                                {t('recruiter.profiles.fields.availability')}:
                                                            </span>{' '}
                                                            {profile.urgence}
                                                        </p>
                                                    )}
                                                </div>
                                            </CvBlock>

                                            {specialisations.length > 0 && (
                                                <CvBlock title={t('recruiter.profiles.sections.specialisations')}>
                                                    <div className="flex flex-wrap gap-2">
                                                        {specialisations.map((item) => (
                                                            <CriterionTag
                                                                key={item}
                                                                label={item}
                                                                matched={isMatchedValue(item, offreSpecialisations)}
                                                                matchedLabel={t('recruiter.profiles.matched')}
                                                            />
                                                        ))}
                                                    </div>
                                                </CvBlock>
                                            )}

                                            {langues.length > 0 && (
                                                <CvBlock title={t('recruiter.profiles.sections.languages')}>
                                                    <ul className="space-y-2">
                                                        {langues.map((langue) => {
                                                            const matched = isMatchedValue(langue.nom, offreLangues);

                                                            return (
                                                                <li
                                                                    key={`${langue.nom}-${langue.niveau}`}
                                                                    className={`flex items-center justify-between gap-3 text-sm ${
                                                                        matched
                                                                            ? 'rounded-full border border-[#C06041] bg-[#C06041]/8 px-3 py-1.5 text-[#1a1f1e]'
                                                                            : 'text-[#1a1f1e]/75'
                                                                    }`}
                                                                >
                                                                    <span className="inline-flex items-center gap-1.5">
                                                                        <Globe className="h-3.5 w-3.5 text-[#C06041]" />
                                                                        {langue.nom}
                                                                        {matched && (
                                                                            <span className="sr-only">
                                                                                {t('recruiter.profiles.matched')}
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                    {langue.niveau && (
                                                                        <span className="text-[10px] uppercase tracking-wider text-[#1a1f1e]/40">
                                                                            {langue.niveau}
                                                                        </span>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </CvBlock>
                                            )}

                                            {villes.length > 0 && (
                                                <CvBlock title={t('recruiter.profiles.sections.cities')}>
                                                    <div className="flex flex-wrap gap-2">
                                                        {villes.map((item) => (
                                                            <CriterionTag
                                                                key={item}
                                                                label={item}
                                                                matched={isMatchedValue(item, offreVilles)}
                                                                matchedLabel={t('recruiter.profiles.matched')}
                                                                icon={MapPin}
                                                            />
                                                        ))}
                                                    </div>
                                                </CvBlock>
                                            )}
                                        </aside>

                                        <div className="space-y-10 px-8 py-8 lg:col-span-8">
                                            <CvBlock
                                                title={t('recruiter.profiles.sections.experience')}
                                                icon={Briefcase}
                                            >
                                                {profile.experiences.length === 0 ? (
                                                    <p className="text-sm text-[#1a1f1e]/40">
                                                        {t('recruiter.profiles.no_experience')}
                                                    </p>
                                                ) : (
                                                    <ol className="relative space-y-6 border-l border-[#1a1f1e]/10 pl-6">
                                                        {profile.experiences.map((experience, expIndex) => (
                                                            <li key={`${profile.id}-exp-${expIndex}`} className="relative">
                                                                <span className="absolute -left-[1.91rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[#C06041]" />
                                                                <div className="space-y-1">
                                                                    <h3 className="text-base font-semibold text-[#1a1f1e]">
                                                                        {experience.poste || t('recruiter.profiles.fields.role')}
                                                                    </h3>
                                                                    <p className="inline-flex items-center gap-1.5 text-sm text-[#1a1f1e]/60">
                                                                        <Building2 className="h-3.5 w-3.5" />
                                                                        {experience.entreprise || '—'}
                                                                        {experience.type_travail
                                                                            ? ` · ${experience.type_travail}`
                                                                            : ''}
                                                                    </p>
                                                                    <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#1a1f1e]/40">
                                                                        <Calendar className="h-3 w-3" />
                                                                        {formatPeriod(
                                                                            experience.debut,
                                                                            experience.fin,
                                                                            t('recruiter.profiles.present'),
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                )}
                                            </CvBlock>

                                            <CvBlock
                                                title={t('recruiter.profiles.sections.education')}
                                                icon={GraduationCap}
                                            >
                                                {profile.formations.length === 0 ? (
                                                    <p className="text-sm text-[#1a1f1e]/40">
                                                        {t('recruiter.profiles.no_education')}
                                                    </p>
                                                ) : (
                                                    <ol className="relative space-y-6 border-l border-[#1a1f1e]/10 pl-6">
                                                        {profile.formations.map((formation, formationIndex) => (
                                                            <li
                                                                key={`${profile.id}-edu-${formationIndex}`}
                                                                className="relative"
                                                            >
                                                                <span className="absolute -left-[1.91rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[#1a1f1e]" />
                                                                <div className="space-y-1">
                                                                    <h3 className="text-base font-semibold text-[#1a1f1e]">
                                                                        {formation.formation_juridique
                                                                            || formation.specialisation
                                                                            || t('recruiter.profiles.fields.education')}
                                                                    </h3>
                                                                    {formation.ecole && (
                                                                        <p className="text-sm text-[#1a1f1e]/60">
                                                                            {formation.ecole}
                                                                        </p>
                                                                    )}
                                                                    {formation.specialisation
                                                                        && formation.formation_juridique && (
                                                                            <p className="text-sm text-[#1a1f1e]/50">
                                                                                {formation.specialisation}
                                                                            </p>
                                                                        )}
                                                                    <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#1a1f1e]/40">
                                                                        <Calendar className="h-3 w-3" />
                                                                        {formatPeriod(
                                                                            formation.annee_debut,
                                                                            formation.annee_fin,
                                                                            t('recruiter.profiles.present'),
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                )}
                                            </CvBlock>

                                            {(typesTravail.length > 0 || modesTravail.length > 0) && (
                                                <CvBlock
                                                    title={t('recruiter.profiles.sections.work_preferences')}
                                                    icon={Laptop}
                                                >
                                                    <div className="space-y-5">
                                                        {typesTravail.length > 0 && (
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1f1e]/40">
                                                                    {t('recruiter.profiles.fields.work_type')}
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {typesTravail.map((item) => (
                                                                        <CriterionTag
                                                                            key={item}
                                                                            label={item}
                                                                            matched={isMatchedValue(item, offreTypesTravail)}
                                                                            matchedLabel={t('recruiter.profiles.matched')}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {modesTravail.length > 0 && (
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1f1e]/40">
                                                                    {t('recruiter.profiles.fields.work_mode')}
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {modesTravail.map((item) => (
                                                                        <CriterionTag
                                                                            key={item}
                                                                            label={item}
                                                                            matched={isMatchedValue(item, offreModesTravail)}
                                                                            matchedLabel={t('recruiter.profiles.matched')}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CvBlock>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

function MatchScoreRing({ score, label }: { score: number; label: string }) {
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference * (1 - score / 100);

    return (
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
            <svg className="-rotate-90" width="96" height="96" viewBox="0 0 96 96" aria-hidden>
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="5"
                />
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="none"
                    stroke="#C06041"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    className="transition-[stroke-dashoffset] duration-700 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-serif text-2xl font-semibold tracking-tight text-white">{score}</span>
                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/45">
                    {label}
                </span>
            </div>
        </div>
    );
}

function CriterionTag({
    label,
    matched,
    matchedLabel,
    icon: Icon,
}: {
    label: string;
    matched: boolean;
    matchedLabel: string;
    icon?: LucideIcon;
}) {
    return (
        <span
            className={
                matched
                    ? 'inline-flex items-center gap-1.5 rounded-full border border-[#C06041] bg-[#C06041]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C06041]'
                    : 'inline-flex items-center gap-1.5 bg-[#1a1f1e] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white'
            }
            title={matched ? matchedLabel : undefined}
        >
            {Icon && <Icon className="h-3 w-3" />}
            {label}
            {matched && <span className="sr-only"> ({matchedLabel})</span>}
        </span>
    );
}

function CvBlock({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon?: LucideIcon;
    children: ReactNode;
}) {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1a1f1e]/8 pb-2">
                {Icon && <Icon className="h-4 w-4 text-[#C06041]" />}
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1f1e]/45">
                    {title}
                </h3>
            </div>
            {children}
        </section>
    );
}

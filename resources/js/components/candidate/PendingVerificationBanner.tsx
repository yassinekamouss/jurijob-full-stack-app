import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    Briefcase,
    Building2,
    CheckCircle2,
    Clock,
    Folder,
    GraduationCap,
    Languages,
    MapPin,
    User,
} from 'lucide-react';

export type ProfileCompletion = {
    profile: boolean;
    experiences: boolean;
    formations: boolean;
    specialisations: boolean;
    langues: boolean;
    localisation: boolean;
    mode_travails: boolean;
    type_travails: boolean;
    is_complete: boolean;
};

interface Props {
    profileCompletion?: ProfileCompletion;
    showSettingsLink?: boolean;
}

const sections = [
    { key: 'profile' as const, label: 'Profil général', icon: User },
    { key: 'experiences' as const, label: 'Expériences', icon: Briefcase },
    { key: 'formations' as const, label: 'Formations', icon: GraduationCap },
    { key: 'specialisations' as const, label: 'Spécialisations', icon: Folder },
    { key: 'langues' as const, label: 'Langues', icon: Languages },
    { key: 'localisation' as const, label: 'Localisation', icon: MapPin },
    { key: 'mode_travails' as const, label: 'Mode de travail', icon: Building2 },
    { key: 'type_travails' as const, label: 'Type de travail', icon: Briefcase },
];

export default function PendingVerificationBanner({
    profileCompletion,
    showSettingsLink = false,
}: Props) {
    const isComplete = profileCompletion?.is_complete ?? false;
    const missingCount = profileCompletion
        ? sections.filter(({ key }) => !profileCompletion[key]).length
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[32px] border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-[#FDFCF8] p-8 shadow-sm"
        >
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />

            <div className="relative z-10 space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-1 text-[10px] font-black tracking-widest text-amber-800 uppercase">
                                Profil en attente de validation
                            </div>
                            <h2 className="font-serif text-2xl font-bold italic text-[#1a1f1e]">
                                Complétez et vérifiez vos informations
                            </h2>
                            <p className="max-w-2xl text-sm leading-relaxed font-medium text-[#1a1f1e]/60">
                                Pour être accepté et intégré au matching, renseignez
                                avec exactitude votre parcours, vos préférences de
                                recherche (pays, villes, modes et types de travail)
                                ainsi que vos langues et spécialisations.
                                Une fois vos données authentifiées par notre équipe,
                                votre profil sera validé sous{' '}
                                <span className="font-bold text-[#1a1f1e]">
                                    24 heures maximum
                                </span>
                                .
                            </p>
                        </div>
                    </div>

                    {showSettingsLink && (
                        <Link
                            href="/candidate/settings"
                            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#1a1f1e] px-7 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#1a1f1e]/90 active:scale-95"
                        >
                            Compléter mon profil
                        </Link>
                    )}
                </div>

                {profileCompletion && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                            {isComplete ? (
                                <>
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                    Dossier complet — en cours d&apos;examen
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                                    {missingCount} section{missingCount > 1 ? 's' : ''} à renseigner
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                            {sections.map(({ key, label, icon: Icon }) => {
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
                                        <span className="truncate">{label}</span>
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
                )}
            </div>
        </motion.div>
    );
}

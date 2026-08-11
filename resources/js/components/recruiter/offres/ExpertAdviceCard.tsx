import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UserCheck,
    Award,
    ShieldCheck,
    Languages,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    FileText,
    CheckCircle2,
    Building2,
    GraduationCap,
    Target,
    Lightbulb,
    type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpertAdviceCardProps {
    currentStep?: number;
    className?: string;
}

const TOTAL_STEPS = 6;

type StepAdvice = {
    intro: ReactNode;
    tips: { icon: LucideIcon; iconClassName: string; title: string; body: string }[];
    goldenRule: string;
};

const stepAdvice: Record<number, StepAdvice> = {
    1: {
        intro: (
            <>
                Nos consultants spécialisés en recrutement juridique s'appuient sur vos explications pour comprendre{' '}
                <strong className="font-semibold text-slate-900">le contexte exact de votre besoin</strong>.
            </>
        ),
        tips: [
            {
                icon: FileText,
                iconClassName: 'text-amber-700',
                title: 'Intitulé & Description',
                body: 'Soyez précis sur la mission principale et le métier visé : un titre clair oriente immédiatement nos recherches.',
            },
        ],
        goldenRule: 'Une description claire et bien structurée permet à nos experts de cibler immédiatement les meilleurs juristes.',
    },
    2: {
        intro: (
            <>
                Contrat, mode de travail, lieu et salaire aident nos équipes à{' '}
                <strong className="font-semibold text-slate-900">filtrer les profils compatibles</strong> avec votre organisation.
            </>
        ),
        tips: [
            {
                icon: Building2,
                iconClassName: 'text-amber-700',
                title: 'Cadre du poste',
                body: 'Indiquez le mode (présentiel, hybride, remote) et la localisation réelle pour éviter les candidats inadaptés.',
            },
            {
                icon: ShieldCheck,
                iconClassName: 'text-emerald-600',
                title: 'Transparence salariale',
                body: 'Une fourchette réaliste accélère les échanges et limite les refus en cours de process.',
            },
        ],
        goldenRule: 'Plus le cadre organisationnel est net, plus nos consultants peuvent qualifier les candidatures rapidement.',
    },
    3: {
        intro: (
            <>
                Expérience, formation et notes internes donnent à nos experts{' '}
                <strong className="font-semibold text-slate-900">le niveau de séniorité attendu</strong> pour le tri des profils.
            </>
        ),
        tips: [
            {
                icon: GraduationCap,
                iconClassName: 'text-amber-700',
                title: 'Niveau attendu',
                body: 'Alignez expérience et formation sur le réel besoin du poste, sans sur-qualifier inutilement.',
            },
            {
                icon: FileText,
                iconClassName: 'text-slate-500',
                title: 'Notes complémentaires',
                body: 'Ajoutez le contexte utile (équipe, enjeux, contraintes) que seuls vos consultants doivent connaître.',
            },
        ],
        goldenRule: 'Un profil cible réaliste élargit le vivier de talents sans diluer la qualité de la présélection.',
    },
    4: {
        intro: (
            <>
                Nos consultants s'appuient{' '}
                <strong className="font-semibold text-slate-900">strictement sur les spécialisations sélectionnées</strong> pour dénicher votre talent idéal.
            </>
        ),
        tips: [
            {
                icon: Target,
                iconClassName: 'text-amber-700',
                title: 'Ciblez l\'essentiel',
                body: 'Ne retenez que les domaines vraiment indispensables à la mission, pas toutes les expertises « nice to have ».',
            },
            {
                icon: ShieldCheck,
                iconClassName: 'text-emerald-600',
                title: 'Éviter la sur-sélection',
                body: 'Trop de spécialisations réduit artificiellement le nombre de profils pertinents.',
            },
        ],
        goldenRule: 'Pour un ciblage optimal par nos équipes, ne sélectionnez que les spécialisations indispensables.',
    },
    5: {
        intro: (
            <>
                Le niveau et l'importance de chaque langue déterminent{' '}
                <strong className="font-semibold text-slate-900">si un candidat est écarté ou simplement moins priorisé</strong>.
            </>
        ),
        tips: [
            {
                icon: Languages,
                iconClassName: 'text-amber-700',
                title: 'Importance réelle',
                body: "Si l'anglais est un atout mais pas une obligation, choisissez « Important » ou « Souhaitable », pas « Indispensable ».",
            },
            {
                icon: ShieldCheck,
                iconClassName: 'text-emerald-600',
                title: 'Critère éliminatoire',
                body: 'Réservez « Indispensable » aux langues vraiment bloquantes, sinon d\'excellents juristes seront écartés.',
            },
        ],
        goldenRule: 'Calibrez l\'importance des langues pour ne jamais éliminer un profil qui correspond pourtant parfaitement à votre besoin.',
    },
    6: {
        intro: (
            <>
                Relisez la synthèse de votre offre. Dès validation, nos chargés de recrutement{' '}
                <strong className="font-semibold text-slate-900">lanceront la recherche active</strong> et la présélection des candidats.
            </>
        ),
        tips: [
            {
                icon: CheckCircle2,
                iconClassName: 'text-emerald-600',
                title: 'Prise en charge rapide',
                body: 'Nos experts vérifient votre offre sous 24h et vous contactent dès qualification des premiers profils réactifs.',
            },
        ],
        goldenRule: 'Une offre complète et validée garantit un accompagnement réactif par nos consultants.',
    },
};

export default function ExpertAdviceCard({ currentStep = 1, className = '' }: ExpertAdviceCardProps) {
    const [showTipDetails, setShowTipDetails] = useState(false);
    const advice = stepAdvice[currentStep] ?? stepAdvice[1];

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-b from-[#FFFDF9] via-white to-amber-50/30 p-6 shadow-xl shadow-amber-900/5 transition-all',
                className
            )}
        >
            {/* Decorative Top Accent Glow */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-100/50 blur-2xl" />

            {/* Header Badge */}
            <div className="relative z-10 mb-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900">
                    <UserCheck className="h-3.5 w-3.5 text-amber-700" />
                    Accompagnement Humain
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                    Étape {currentStep} sur {TOTAL_STEPS}
                </span>
            </div>

            {/* Step-Specific Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                >
                    <h3 className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900">
                        <div className="shadow-xs flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                            <Award className="h-4 w-4 text-amber-700" />
                        </div>
                        Conseil de nos Experts
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{advice.intro}</p>

                    <div className="mt-5 space-y-3.5">
                        <div className="shadow-xs space-y-3 rounded-2xl border border-amber-100 bg-white p-4">
                            {advice.tips.map((tip, index) => {
                                const Icon = tip.icon;

                                return (
                                    <div
                                        key={tip.title}
                                        className={cn(
                                            'flex items-start gap-2.5',
                                            index > 0 && 'border-t border-slate-100 pt-2'
                                        )}
                                    >
                                        <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', tip.iconClassName)} />
                                        <div className="text-xs leading-normal text-slate-700">
                                            <strong className="mb-0.5 block font-semibold text-slate-900">{tip.title}</strong>
                                            {tip.body}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 p-4 text-white shadow-md shadow-amber-900/10">
                            <div className="relative z-10 flex items-start gap-3">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                                    <Lightbulb className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <span className="mb-0.5 block text-[10px] font-black tracking-wider text-amber-100 uppercase">
                                        Règle d'or
                                    </span>
                                    <p className="text-xs leading-snug font-semibold text-white">"{advice.goldenRule}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Toggleable Extra Details */}
            <div className="relative z-10 mt-4 border-t border-amber-100 pt-3.5">
                <button
                    type="button"
                    onClick={() => setShowTipDetails(!showTipDetails)}
                    className="flex w-full items-center justify-between text-xs font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                    <span className="flex items-center gap-1.5">
                        <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                        Comment nos experts analysent vos offres ?
                    </span>
                    {showTipDetails ? (
                        <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    )}
                </button>

                <AnimatePresence>
                    {showTipDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                        >
                            <p className="mt-2 rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-xs leading-relaxed text-slate-600">
                                Chaque critère renseigné sert de boussole à nos chargés de recrutement pour évaluer les CV et
                                conduire la pré-qualification des candidats. En ciblant l'essentiel, vous bénéficiez d'une
                                sélection sur-mesure et réactive.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

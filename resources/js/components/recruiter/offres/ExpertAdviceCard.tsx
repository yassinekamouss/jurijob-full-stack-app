import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Award, ShieldCheck, Languages, ChevronDown, ChevronUp, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpertAdviceCardProps {
    currentStep?: number;
    className?: string;
}

export default function ExpertAdviceCard({ currentStep = 1, className = '' }: ExpertAdviceCardProps) {
    const [showTipDetails, setShowTipDetails] = useState(false);

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
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-900">
                    <UserCheck className="h-3.5 w-3.5 text-amber-700" />
                    Accompagnement Humain
                </div>
                <span className="text-[11px] font-medium text-slate-400">Étape {currentStep} sur 3</span>
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
                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shrink-0 shadow-xs">
                            <Award className="h-4 w-4 text-amber-700" />
                        </div>
                        Conseil de nos Experts
                    </h3>

                    {/* Step 1: Info */}
                    {currentStep === 1 && (
                        <>
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Nos consultants spécialisés en recrutement juridique étudient attentivement chaque offre. Ils s'appuient sur vos explications pour comprendre <strong className="text-slate-900 font-semibold">le contexte exact de votre besoin</strong>.
                            </p>

                            <div className="mt-5 space-y-3.5">
                                <div className="rounded-2xl bg-white p-4 border border-amber-100 shadow-xs space-y-3">
                                    <div className="flex items-start gap-2.5">
                                        <FileText className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                                        <div className="text-xs text-slate-700 leading-normal">
                                            <strong className="text-slate-900 font-semibold block mb-0.5">
                                                Intitulé & Description
                                            </strong>
                                            Soyez précis sur la mission principale et l'organisation du poste (présentiel, hybride, remote) pour guider nos recherches.
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 p-4 text-white shadow-md shadow-amber-900/10">
                                    <div className="relative z-10 flex items-start gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-sm font-bold">
                                            💡
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 block mb-0.5">
                                                Règle d'or
                                            </span>
                                            <p className="text-xs font-semibold leading-snug text-white">
                                                "Une description claire et bien structurée permet à nos experts de cibler immédiatement les meilleurs juristes."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 2: Criteria (Requirements) */}
                    {currentStep === 2 && (
                        <>
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Nos consultants s'appuient <strong className="text-slate-900 font-semibold">strictement sur les critères sélectionnés ici</strong> pour dénicher votre talent idéal.
                            </p>

                            <div className="mt-5 space-y-3.5">
                                <div className="rounded-2xl bg-white p-4 border border-amber-100 shadow-xs space-y-3">
                                    <div className="flex items-start gap-2.5">
                                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <div className="text-xs text-slate-700 leading-normal">
                                            <strong className="text-slate-900 font-semibold block mb-0.5">
                                                Exigences vs Atouts
                                            </strong>
                                            Distinguez les requis indispensables des simples compétences appréciées.
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                                        <Languages className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                                        <div className="text-xs text-slate-600 leading-normal">
                                            <strong className="text-slate-900 font-semibold block mb-0.5">
                                                Exemple des langues :
                                            </strong>
                                            Si l'anglais est un atout mais pas une obligation, ne l'ajoutez pas en critère obligatoire. Sinon, nos experts seront contraints d'écarter d'excellents juristes francophones qui correspondent parfaitement à votre besoin.
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 p-4 text-white shadow-md shadow-amber-900/10">
                                    <div className="relative z-10 flex items-start gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-sm font-bold">
                                            💡
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 block mb-0.5">
                                                Règle d'or
                                            </span>
                                            <p className="text-xs font-semibold leading-snug text-white">
                                                "Pour un ciblage optimal par nos équipes, ne sélectionnez que les critères indispensables."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 3: Review */}
                    {currentStep === 3 && (
                        <>
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Relisez la synthèse de votre offre. Dès validation, nos chargés de recrutement <strong className="text-slate-900 font-semibold">lanceront la recherche active</strong> et la présélection des candidats.
                            </p>

                            <div className="mt-5 space-y-3.5">
                                <div className="rounded-2xl bg-white p-4 border border-amber-100 shadow-xs space-y-3">
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <div className="text-xs text-slate-700 leading-normal">
                                            <strong className="text-slate-900 font-semibold block mb-0.5">
                                                Prise en charge rapide
                                            </strong>
                                            Nos experts vérifient votre offre sous 24h et prennent directement contact avec vous dès qualification des premiers profil réactifs.
                                        </div>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 p-4 text-white shadow-md shadow-amber-900/10">
                                    <div className="relative z-10 flex items-start gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-sm font-bold">
                                            💡
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 block mb-0.5">
                                                Règle d'or
                                            </span>
                                            <p className="text-xs font-semibold leading-snug text-white">
                                                "Une offre complète et validée garantit un accompagnement réactif par nos consultants."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Toggleable Extra Details */}
            <div className="mt-4 pt-3.5 border-t border-amber-100 relative z-10">
                <button
                    type="button"
                    onClick={() => setShowTipDetails(!showTipDetails)}
                    className="w-full flex items-center justify-between text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <span className="flex items-center gap-1.5">
                        <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                        Comment nos experts analysent vos offres ?
                    </span>
                    {showTipDetails ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
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
                            <p className="mt-2 text-xs text-slate-600 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                                Chaque critère renseigné sert de boussole à nos chargés de recrutement pour évaluer les CV et conduire la pré-qualification des candidats. En ciblant l'essentiel, vous bénéficiez d'une sélection sur-mesure et réactive.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

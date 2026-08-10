import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lightbulb, Target, Languages, CheckCircle2, ChevronDown, ChevronUp, Info, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MatchingAdviceCardProps {
    className?: string;
    variant?: 'sidebar' | 'inline';
    defaultExpanded?: boolean;
}

export default function MatchingAdviceCard({
    className = '',
    variant = 'sidebar',
    defaultExpanded = true,
}: MatchingAdviceCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [showExample, setShowExample] = useState(false);

    if (variant === 'inline') {
        return (
            <div
                className={cn(
                    'relative overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/80 via-amber-50/30 to-sky-50/50 p-5 shadow-sm backdrop-blur-sm transition-all',
                    className
                )}
            >
                {/* Decorative Accent Glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-200/40 blur-2xl" />

                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 shadow-inner">
                            <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-slate-900 text-base">
                                    Optimisez votre Matching
                                </h3>
                                <span className="inline-flex items-center rounded-full bg-amber-100/80 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-800 uppercase">
                                    Conseil Algorithme
                                </span>
                            </div>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                                Chaque critère sélectionné agit comme un <strong className="text-slate-900 font-semibold">filtre strict</strong> pour notre algorithme. Privilégiez uniquement les exigences indispensables.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-white/80 hover:bg-white px-3 py-1.5 rounded-lg border border-amber-200/80 shadow-xs transition-all shrink-0 self-start"
                    >
                        {isExpanded ? 'Moins de détails' : 'En savoir plus'}
                        {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 pt-4 border-t border-amber-200/40 space-y-3.5 text-xs text-slate-700">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex items-start gap-2.5 bg-white/70 p-3 rounded-xl border border-amber-100">
                                        <Target className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-slate-900 block mb-0.5">
                                                Filtres stricts & qualifiés
                                            </span>
                                            Seuls les candidats remplissant à 100% vos critères indispensables apparaîtront en priorité.
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5 bg-white/70 p-3 rounded-xl border border-amber-100">
                                        <Languages className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-slate-900 block mb-0.5">
                                                Distinguez obligatoires et atouts
                                            </span>
                                            Si l'anglais est un "plus", ne le mettez pas en obligatoire : vous risquez de masquer d'excellents candidats francophones.
                                        </div>
                                    </div>
                                </div>

                                {/* Golden Rule Callout */}
                                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-emerald-500/10 border border-amber-300/60 rounded-xl p-3 text-amber-950 font-medium">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white shrink-0 font-black text-xs shadow-xs">
                                        💡
                                    </div>
                                    <p className="text-xs font-semibold leading-snug">
                                        <span className="text-amber-900 font-bold uppercase text-[10px] tracking-wider block mb-0.5">Règle d'or :</span>
                                        "Ne sélectionnez que les critères indispensables pour maximiser vos chances de trouver le bon profil."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Default Sidebar / Standalone Card variant
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 transition-all',
                className
            )}
        >
            {/* Header Badge & Icon */}
            <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-[11px] font-bold text-amber-800">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-spin-slow" />
                    Conseil Algorithme
                </div>
                <span className="text-xs text-slate-400 font-mono">IA Matching</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500 shrink-0" />
                Optimisez votre Matching
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Chaque critère sélectionné dans cette étape agit comme un <strong className="text-slate-900 font-semibold">filtre strict</strong> pour notre algorithme de sélection.
            </p>

            {/* Highlight Box */}
            <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
                    <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-700 leading-normal">
                            <strong className="text-slate-900 font-semibold block mb-0.5">
                                Obligatoire vs Atout
                            </strong>
                            Distinguez les exigences impératives des simples compétences appréciées.
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                        <Languages className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-700 leading-normal">
                            <strong className="text-slate-900 font-semibold block mb-0.5">
                                Exemple concret (Langues)
                            </strong>
                            Si l'anglais est juste un <em>"plus"</em>, ne le cochez pas comme obligatoire. Sinon, l'algorithme écartera automatiquement d'excellents juristes bilingues ou francophones.
                        </div>
                    </div>
                </div>

                {/* Golden Rule Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 text-white shadow-md shadow-amber-500/20">
                    <div className="relative z-10 flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-base">
                            ✨
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 block mb-1">
                                Règle d'or
                            </span>
                            <p className="text-xs font-semibold leading-snug text-white">
                                "Ne sélectionnez que les critères indispensables pour maximiser vos chances de trouver le bon profil."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggleable Concrete Tips */}
            <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                    type="button"
                    onClick={() => setShowExample(!showExample)}
                    className="w-full flex items-center justify-between text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <span className="flex items-center gap-1.5">
                        <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                        Pourquoi cibler juste l'essentiel ?
                    </span>
                    {showExample ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                <AnimatePresence>
                    {showExample && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                        >
                            <p className="mt-2 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                Ajouter trop de critères restrictifs réduit mathématiquement le vivier de candidats qualifiés. En restant focalisé sur vos vraies contraintes métier, vous garantissez un taux de correspondance plus élevé et plus rapide.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

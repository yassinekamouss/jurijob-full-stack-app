import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
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

const stepAdvice = (t: any): Record<number, StepAdvice> => ({
    1: {
        intro: (
            <>
                {t('offer_creation.expert_advice.steps.1.intro_start')}
                <strong className="font-semibold text-slate-900">{t('offer_creation.expert_advice.steps.1.intro_bold')}</strong>
                {t('offer_creation.expert_advice.steps.1.intro_end')}
            </>
        ),
        tips: [
            {
                icon: FileText,
                iconClassName: 'text-amber-700',
                title: t('offer_creation.expert_advice.steps.1.tips.0.title'),
                body: t('offer_creation.expert_advice.steps.1.tips.0.body'),
            },
        ],
        goldenRule: t('offer_creation.expert_advice.steps.1.golden_rule'),
    },
    2: {
        intro: (
            <>
                {t('offer_creation.expert_advice.steps.2.intro_start')}
                <strong className="font-semibold text-slate-900">{t('offer_creation.expert_advice.steps.2.intro_bold')}</strong>
                {t('offer_creation.expert_advice.steps.2.intro_end')}
            </>
        ),
        tips: [
            {
                icon: Building2,
                iconClassName: 'text-amber-700',
                title: t('offer_creation.expert_advice.steps.2.tips.0.title'),
                body: t('offer_creation.expert_advice.steps.2.tips.0.body'),
            },
            {
                icon: ShieldCheck,
                iconClassName: 'text-emerald-600',
                title: t('offer_creation.expert_advice.steps.2.tips.1.title'),
                body: t('offer_creation.expert_advice.steps.2.tips.1.body'),
            },
        ],
        goldenRule: t('offer_creation.expert_advice.steps.2.golden_rule'),
    },
    3: {
        intro: (
            <>
                {t('offer_creation.expert_advice.steps.3.intro_start')}
                <strong className="font-semibold text-slate-900">{t('offer_creation.expert_advice.steps.3.intro_bold')}</strong>
                {t('offer_creation.expert_advice.steps.3.intro_end')}
            </>
        ),
        tips: [
            {
                icon: GraduationCap,
                iconClassName: 'text-amber-700',
                title: t('offer_creation.expert_advice.steps.3.tips.0.title'),
                body: t('offer_creation.expert_advice.steps.3.tips.0.body'),
            },
            {
                icon: FileText,
                iconClassName: 'text-slate-500',
                title: t('offer_creation.expert_advice.steps.3.tips.1.title'),
                body: t('offer_creation.expert_advice.steps.3.tips.1.body'),
            },
        ],
        goldenRule: t('offer_creation.expert_advice.steps.3.golden_rule'),
    },
    4: {
        intro: (
            <>
                {t('offer_creation.expert_advice.steps.4.intro_start')}
                <strong className="font-semibold text-slate-900">{t('offer_creation.expert_advice.steps.4.intro_bold')}</strong>
                {t('offer_creation.expert_advice.steps.4.intro_end')}
            </>
        ),
        tips: [
            {
                icon: Target,
                iconClassName: 'text-amber-700',
                title: t('offer_creation.expert_advice.steps.4.tips.0.title'),
                body: t('offer_creation.expert_advice.steps.4.tips.0.body'),
            },
            {
                icon: ShieldCheck,
                iconClassName: 'text-emerald-600',
                title: t('offer_creation.expert_advice.steps.4.tips.1.title'),
                body: t('offer_creation.expert_advice.steps.4.tips.1.body'),
            },
        ],
        goldenRule: t('offer_creation.expert_advice.steps.4.golden_rule'),
    },
    5: {
        intro: (
            <>
                {t('offer_creation.expert_advice.steps.5.intro_start')}
                <strong className="font-semibold text-slate-900">{t('offer_creation.expert_advice.steps.5.intro_bold')}</strong>
                {t('offer_creation.expert_advice.steps.5.intro_end')}
            </>
        ),
        tips: [
            {
                icon: Languages,
                iconClassName: 'text-amber-700',
                title: t('offer_creation.expert_advice.steps.5.tips.0.title'),
                body: t('offer_creation.expert_advice.steps.5.tips.0.body'),
            },
            {
                icon: ShieldCheck,
                iconClassName: 'text-emerald-600',
                title: t('offer_creation.expert_advice.steps.5.tips.1.title'),
                body: t('offer_creation.expert_advice.steps.5.tips.1.body'),
            },
        ],
        goldenRule: t('offer_creation.expert_advice.steps.5.golden_rule'),
    },
    6: {
        intro: (
            <>
                {t('offer_creation.expert_advice.steps.6.intro_start')}
                <strong className="font-semibold text-slate-900">{t('offer_creation.expert_advice.steps.6.intro_bold')}</strong>
                {t('offer_creation.expert_advice.steps.6.intro_end')}
            </>
        ),
        tips: [
            {
                icon: CheckCircle2,
                iconClassName: 'text-emerald-600',
                title: t('offer_creation.expert_advice.steps.6.tips.0.title'),
                body: t('offer_creation.expert_advice.steps.6.tips.0.body'),
            },
        ],
        goldenRule: t('offer_creation.expert_advice.steps.6.golden_rule'),
    },
});

export default function ExpertAdviceCard({ currentStep = 1, className = '' }: ExpertAdviceCardProps) {
    const { t } = useTranslation();
    const [showTipDetails, setShowTipDetails] = useState(false);
    const advice = stepAdvice(t)[currentStep] ?? stepAdvice(t)[1];

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
                    {t('offer_creation.expert_advice.human_support')}
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                    {t('offer_creation.expert_advice.step_progress', { current: currentStep, total: TOTAL_STEPS })}
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
                        {t('offer_creation.expert_advice.expert_advice_title')}
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
                                        {t('offer_creation.expert_advice.golden_rule')}
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
                        {t('offer_creation.expert_advice.how_experts_analyze')}
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
                                {t('offer_creation.expert_advice.analysis_description')}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

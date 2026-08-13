import { store as offresStore } from '@/routes/offres';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { cn } from '@/lib/utils';
import { CheckCircle2, Sparkles } from 'lucide-react';
import ExpertAdviceCard from '@/components/recruiter/offres/ExpertAdviceCard';
import CreateIdentityStep from '@/components/recruiter/offres/CreateIdentityStep';
import CreateOrganizationStep from '@/components/recruiter/offres/CreateOrganizationStep';
import CreateProfileStep from '@/components/recruiter/offres/CreateProfileStep';
import CreateExpertiseStep from '@/components/recruiter/offres/CreateExpertiseStep';
import CreateLanguagesStep from '@/components/recruiter/offres/CreateLanguagesStep';
import CreateReviewStep from '@/components/recruiter/offres/CreateReviewStep';

import type { Taxonomies, Requirement } from '@/types';

interface Props {
    taxonomies: Taxonomies;
}

export interface OffreFormData {
    titre: string;
    description: string;
    poste_id: number | string;
    type_travail_id: number | string;
    mode_travail_id: number | string;
    ville_id: number | string;
    niveau_experience_id: number | string;
    formation_juridique_id: number | string;
    salaire_id: number | string;
    urgence_id: number | string;
    notes_complementaires: string;
    nombre_cv: number;
    requirements: Requirement[];
}

export default function Create({ taxonomies }: Props) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const stepCardRef = useRef<HTMLDivElement>(null);
    const isFirstStepRender = useRef(true);

    const steps = [
        { id: 1, title: t('recruiter_offers.create.steps.1.title'), subtitle: t('recruiter_offers.create.steps.1.subtitle') },
        { id: 2, title: t('recruiter_offers.create.steps.2.title'), subtitle: t('recruiter_offers.create.steps.2.subtitle') },
        { id: 3, title: t('recruiter_offers.create.steps.3.title'), subtitle: t('recruiter_offers.create.steps.3.subtitle') },
        { id: 4, title: t('recruiter_offers.create.steps.4.title'), subtitle: t('recruiter_offers.create.steps.4.subtitle') },
        { id: 5, title: t('recruiter_offers.create.steps.5.title'), subtitle: t('recruiter_offers.create.steps.5.subtitle') },
        { id: 6, title: t('recruiter_offers.create.steps.6.title'), subtitle: t('recruiter_offers.create.steps.6.subtitle') },
    ];

    const { data, setData, post, processing, errors } = useForm<OffreFormData>({
        titre: '',
        description: '',
        poste_id: '',
        type_travail_id: '',
        mode_travail_id: '',
        ville_id: '',
        niveau_experience_id: '',
        formation_juridique_id: '',
        salaire_id: '',
        urgence_id: '',
        notes_complementaires: '',
        nombre_cv: 1,
        requirements: [],
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    useEffect(() => {
        if (isFirstStepRender.current) {
            isFirstStepRender.current = false;
            return;
        }

        const frame = window.requestAnimationFrame(() => {
            stepCardRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });

        return () => window.cancelAnimationFrame(frame);
    }, [step]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(offresStore().url);
    };

    const progress = ((step - 1) / (steps.length - 1)) * 100;

    return (
        <div className="relative min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(253,252,248,1)_34%,_#f4efe7_100%)] text-[#1a1f1e]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" />
            <Head title={t('recruiter_offers.create.page_title')} />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-[1680px] px-4 pt-24 pb-16 sm:px-6 lg:px-8 xl:px-10">
                <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
                    <div className="min-w-0 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-5"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/70 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                                <Sparkles className="h-3.5 w-3.5 text-[#C06041]" />
                                {t('recruiter_offers.create.badge')}
                            </div>
                            <div className="max-w-3xl space-y-3">
                                <h1 className="font-serif text-3xl font-bold tracking-tight italic text-[#1a1f1e] sm:text-4xl lg:text-5xl">
                                    {t('recruiter_offers.create.title')}
                                </h1>
                                <p className="max-w-2xl text-base font-medium leading-relaxed text-[#1a1f1e]/55 sm:text-lg">
                                    {t('recruiter_offers.create.description')}
                                </p>
                            </div>
                        </motion.div>

                        <div id="formulaire-start" className="relative space-y-6">
                            <div className="overflow-hidden border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur-sm sm:p-5">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <p className="text-xs font-semibold text-[#1a1f1e]/55">
                                        {t('recruiter_offers.create.step')} <span className="font-black text-[#1a1f1e]">{step}</span> {t('recruiter_offers.create.on')} {steps.length}
                                    </p>
                                    <p className="text-xs font-semibold text-[#C06041]">{steps[step - 1]?.title}</p>
                                </div>

                                <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-[#C06041] transition-all duration-500 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-6 lg:gap-2.5 sm:overflow-visible">
                                    {steps.map((item) => {
                                        const state = step === item.id ? 'active' : step > item.id ? 'done' : 'todo';

                                        return (
                                            <div
                                                key={item.id}
                                                className={cn(
                                                    'rounded-2xl border px-3 py-2.5 transition-colors sm:px-3.5 sm:py-3.5 shrink-0 sm:shrink min-w-[120px] sm:min-w-0',
                                                    state === 'active'
                                                        ? 'border-[#C06041]/30 bg-[#C06041]/7'
                                                        : state === 'done'
                                                            ? 'border-emerald-200 bg-emerald-50'
                                                            : 'border-slate-200/80 bg-white'
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={cn(
                                                            'flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl text-[11px] font-black',
                                                            state === 'active'
                                                                ? 'bg-[#C06041] text-white'
                                                                : state === 'done'
                                                                    ? 'bg-emerald-500 text-white'
                                                                    : 'bg-slate-100 text-slate-500'
                                                        )}
                                                    >
                                                        {state === 'done' ? <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : item.id}
                                                    </div>
                                                    <p className="truncate text-[10px] font-black uppercase tracking-wider text-slate-700 sm:text-xs">
                                                        {item.title}
                                                    </p>
                                                </div>
                                                <p className="mt-1.5 hidden text-[11px] leading-relaxed text-slate-500 sm:block">
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <motion.div
                                ref={stepCardRef}
                                key={step}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.28 }}
                                className="min-h-[420px] scroll-mt-28 overflow-hidden border border-[#1a1f1e]/8 bg-white/95"
                            >
                                <div className="p-5 sm:p-8 lg:p-10 xl:p-12">
                                    {step === 1 && (
                                        <CreateIdentityStep
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                            onNext={nextStep}
                                            taxonomies={taxonomies}
                                        />
                                    )}
                                    {step === 2 && (
                                        <CreateOrganizationStep
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                            onNext={nextStep}
                                            onPrev={prevStep}
                                            taxonomies={taxonomies}
                                        />
                                    )}
                                    {step === 3 && (
                                        <CreateProfileStep
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                            onNext={nextStep}
                                            onPrev={prevStep}
                                            taxonomies={taxonomies}
                                        />
                                    )}
                                    {step === 4 && (
                                        <CreateExpertiseStep
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                            onNext={nextStep}
                                            onPrev={prevStep}
                                            taxonomies={taxonomies}
                                        />
                                    )}
                                    {step === 5 && (
                                        <CreateLanguagesStep
                                            data={data}
                                            setData={setData}
                                            errors={errors}
                                            onNext={nextStep}
                                            onPrev={prevStep}
                                            taxonomies={taxonomies}
                                        />
                                    )}
                                    {step === 6 && (
                                        <CreateReviewStep
                                            data={data}
                                            processing={processing}
                                            onSubmit={submit}
                                            onPrev={prevStep}
                                            taxonomies={taxonomies}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <aside className="w-full xl:sticky xl:top-32 xl:self-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <ExpertAdviceCard currentStep={step} />
                        </motion.div>
                    </aside>
                </div>

                <div className="mt-12 text-center opacity-40 transition-opacity hover:opacity-100">
                    <p className="text-sm font-bold text-[#1a1f1e]">
                        {t('recruiter_offers.create.need_help')}{' '}
                        <a
                            href="mailto:recrutement@sentissilegal.com"
                            className="underline decoration-2 underline-offset-4"
                        >
                            recrutement@sentissilegal.com
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}

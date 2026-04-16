import { store as offresStore } from '@/routes/offres';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/recruiter/DashboardHeader';

import RequirementsStep from '../../components/recruiter/offres/RequirementsStep';
import ReviewStep from '../../components/recruiter/offres/ReviewStep';
import StepperHeader from '../../components/recruiter/offres/StepperHeader';
import BasicInfoStep from '../../components/recruiter/offres/BasicInfoStep';

interface Props {
    taxonomies: any;
}

export default function Create({ taxonomies }: Props) {
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description: '',
        poste_id: '',
        type_travail_id: '',
        mode_travail_id: '',
        niveau_experience_id: '',
        requirements: [] as any[],
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(offresStore().url);
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title="Publier une offre - Jurijob" />

            {/* Grain Texture Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.25] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm mb-6">
                        Nouvelle Publication
                    </div>
                    <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight italic md:text-5xl lg:text-6xl text-[#1a1f1e]">
                        Recrutez votre Talent
                    </h1>
                    <p className="mx-auto max-w-xl text-lg font-medium text-[#1a1f1e]/50 leading-relaxed">
                        Définissez votre besoin avec précision et laissez notre algorithme faire le reste.
                    </p>
                </motion.div>

                <div className="relative">
                    <StepperHeader currentStep={step} />

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-12 overflow-hidden rounded-[40px] border border-[#1a1f1e]/5 bg-white shadow-2xl shadow-[#1a1f1e]/5"
                    >
                        <div className="p-8 md:p-14">
                            {step === 1 && (
                                <BasicInfoStep
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    onNext={nextStep}
                                    taxonomies={taxonomies}
                                />
                            )}
                            {step === 2 && (
                                <RequirementsStep
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    onNext={nextStep}
                                    onPrev={prevStep}
                                    taxonomies={taxonomies}
                                />
                            )}
                            {step === 3 && (
                                <ReviewStep
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

                <div className="mt-12 text-center opacity-40 hover:opacity-100 transition-opacity">
                    <p className="text-sm font-bold text-[#1a1f1e]">
                        Besoin d'aide ? <a href="#" className="underline decoration-2 underline-offset-4">Consultez notre guide de rédaction</a>
                    </p>
                </div>
            </main>
        </div>
    );
}

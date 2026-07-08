import { update as offresUpdate } from '@/routes/offres';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Briefcase, Settings2, SlidersHorizontal, AlertCircle } from 'lucide-react';

import RequirementsStep from '../../components/recruiter/offres/RequirementsStep';
import BasicInfoStep from '../../components/recruiter/offres/BasicInfoStep';

interface Props {
    offre: any;
    taxonomies: any;
}

type TabType = 'general' | 'criteres';

export default function Edit({ offre, taxonomies }: Props) {
    const [activeTab, setActiveTab] = useState<TabType>('general');

    const { data, setData, put, processing, errors, isDirty, reset } = useForm({
        titre: offre.titre || '',
        description: offre.description || '',
        poste_id: offre.poste_id || '',
        type_travail_id: offre.type_travail_id || '',
        mode_travail_id: offre.mode_travail_id || '',
        ville_id: offre.ville_id || '',
        niveau_experience_id: offre.niveau_experience_id || '',
        requirements: offre.requirements || [],
    });

    const submit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        put(offresUpdate(offre.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success toast here if needed
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-primary/20">
            <Head title="Configuration de l'offre - Jurijob" />

            <DashboardHeader />

            <main className="mx-auto max-w-5xl px-4 pt-28 pb-32 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-8 space-y-4">
                    <Link href="/offres" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux offres
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Configuration de l'offre
                            </h1>
                            <p className="text-slate-500 mt-1">
                                Ajustez les paramètres et les critères de matching pour "{data.titre || 'Sans titre'}"
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Navigation Sidebar */}
                    <div className="w-full md:w-64 shrink-0">
                        <nav className="flex flex-col gap-1 sticky top-32" aria-label="Tabs">
                            <button
                                type="button"
                                onClick={() => setActiveTab('general')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                    activeTab === 'general'
                                        ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                <Settings2 className={`h-4 w-4 ${activeTab === 'general' ? 'text-primary' : 'text-slate-400'}`} />
                                Informations générales
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('criteres')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                    activeTab === 'criteres'
                                        ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                <SlidersHorizontal className={`h-4 w-4 ${activeTab === 'criteres' ? 'text-primary' : 'text-slate-400'}`} />
                                Critères de sélection
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                            <form onSubmit={submit} id="edit-offer-form">
                                <div className="p-6 sm:p-8">
                                    <AnimatePresence mode="wait" initial={false}>
                                        {activeTab === 'general' && (
                                            <motion.div
                                                key="general"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <div className="mb-6 pb-6 border-b border-slate-100">
                                                    <h2 className="text-lg font-semibold text-slate-900">
                                                        Informations générales
                                                    </h2>
                                                    <p className="text-sm text-slate-500 mt-1">
                                                        Modifiez les détails de base de votre annonce.
                                                    </p>
                                                </div>
                                                <BasicInfoStep
                                                    data={data}
                                                    setData={setData}
                                                    errors={errors}
                                                    taxonomies={taxonomies}
                                                    isEditMode={true}
                                                />
                                            </motion.div>
                                        )}

                                        {activeTab === 'criteres' && (
                                            <motion.div
                                                key="criteres"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <div className="mb-6 pb-6 border-b border-slate-100">
                                                    <h2 className="text-lg font-semibold text-slate-900">
                                                        Critères de sélection
                                                    </h2>
                                                    <p className="text-sm text-slate-500 mt-1">
                                                        Ajustez l'algorithme de matching en configurant précisément les attentes.
                                                    </p>
                                                </div>
                                                <RequirementsStep
                                                    data={data}
                                                    setData={setData}
                                                    errors={errors}
                                                    taxonomies={taxonomies}
                                                    isEditMode={true}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </main>

            {/* Smart Floating Save Bar */}
            <AnimatePresence>
                {isDirty && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
                    >
                        <div className="mx-auto max-w-3xl pointer-events-auto">
                            <div className="bg-slate-900 text-white shadow-2xl rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <AlertCircle className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Modifications non enregistrées</p>
                                        <p className="text-xs text-slate-400">N'oubliez pas de sauvegarder vos changements.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => reset()}
                                        className="text-slate-300 hover:text-white hover:bg-white/10 w-full sm:w-auto"
                                        disabled={processing}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        form="edit-offer-form"
                                        type="submit"
                                        className="bg-white text-slate-900 hover:bg-slate-100 shadow-sm font-semibold w-full sm:w-auto"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Enregistrement...
                                            </span>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" /> Enregistrer
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

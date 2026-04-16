import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { matching } from '@/routes/offres';
import { Offre } from '@/types/offre';
import { Deferred, Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Award, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Candidate {
    id: number;
    nom: string;
    prenom: string;
    matching_score: number;
    user: {
        email: string;
    };
}

interface Props {
    offre: Offre;
    candidates: Candidate[];
    filters: {
        allow_overqualified: boolean;
    };
}

export default function Matching({ offre, candidates, filters }: Props) {
    const [isOverqualified, setIsOverqualified] = useState(filters.allow_overqualified);

    const handleToggleOverqualified = (checked: boolean) => {
        setIsOverqualified(checked);
        router.get(
            matching({ offre: offre.id }).url,
            { allow_overqualified: checked ? 1 : 0 },
            { preserveState: true, preserveScroll: true, only: ['candidates'] }
        );
    };

    return (
        <div className="relative min-h-screen bg-[#FDFCF8] text-[#1a1f1e] overflow-x-hidden">
            <Head title={`Matching : ${offre.titre} - Jurijob`} />

            {/* Grain Texture Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.25] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                            Analyse de Correspondance
                        </div>
                        <h1 className="font-serif text-4xl font-bold tracking-tight italic md:text-5xl">
                            Candidats Idéaux
                        </h1>
                        <p className="max-w-xl text-lg font-medium text-[#1a1f1e]/50">
                            Notre algorithme a analysé {offre.titre} pour vous présenter les profils les plus pertinents.
                        </p>
                    </motion.div>


                </div>

                {/* Content Section with Deferred Loading */}
                <Deferred
                    data="candidates"
                    fallback={
                        <div className="flex flex-col items-center justify-center py-32 space-y-8">
                            <div className="relative flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="h-24 w-24 rounded-full border-b-2 border-[#1a1f1e]"
                                />
                                <div className="absolute flex gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                            className="h-2 w-2 rounded-full bg-[#1a1f1e]"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-serif font-bold italic text-[#1a1f1e]">Analyse en cours...</h3>
                                <p className="text-sm font-bold text-[#1a1f1e]/40 tracking-widest uppercase mt-2">Nous évaluons les profils juridiques</p>
                            </div>
                        </div>
                    }
                >
                    <AnimatePresence mode="wait">
                        {candidates && candidates.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {candidates.map((candidate, idx) => (
                                    <CandidateCard key={candidate.id} candidate={candidate} index={idx} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border border-[#1a1f1e]/5"
                            >
                                <div className="bg-[#1a1f1e]/5 p-8 rounded-3xl mb-8">
                                    <AlertCircle className="h-14 w-14 text-[#1a1f1e]/20" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1a1f1e] mb-3">Aucun candidat trouvé</h3>
                                <p className="text-lg font-medium text-[#1a1f1e]/40 max-w-sm text-center">
                                    Réessayez en modifiant vos critères ou en incluant les profils sur-qualifiés.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Deferred>
            </main>
        </div>
    );
}

function CandidateCard({ candidate, index }: { candidate: Candidate; index: number }) {
    const scoreColor = candidate.matching_score >= 80 ? 'text-green-600' : candidate.matching_score >= 50 ? 'text-blue-600' : 'text-orange-600';
    const scoreBg = candidate.matching_score >= 80 ? 'bg-green-50' : candidate.matching_score >= 50 ? 'bg-blue-50' : 'bg-orange-50';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-[32px] border border-[#1a1f1e]/5 p-8 shadow-sm hover:shadow-2xl hover:shadow-[#1a1f1e]/5 transition-all duration-500 overflow-hidden"
        >
            <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-[#1a1f1e]/[0.02] transition-transform group-hover:scale-150" />

            <div className="flex items-start justify-between mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a1f1e] text-white shadow-xl shadow-[#1a1f1e]/20 group-hover:scale-110 transition-transform duration-500">
                    <User className="h-8 w-8" />
                </div>
                <div className={`px-4 py-2 rounded-2xl ${scoreBg} ${scoreColor} flex flex-col items-end`}>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Score Match</span>
                    <span className="text-xl font-black">{candidate.matching_score}%</span>
                </div>
            </div>

            <div className="space-y-2 mb-8">
                <h3 className="font-serif text-2xl font-bold text-[#1a1f1e] group-hover:italic transition-all">
                    {candidate.prenom} {candidate.nom}
                </h3>
                <div className="flex items-center gap-2 text-sm font-bold text-[#1a1f1e]/40">
                    <Mail className="h-3.5 w-3.5" />
                    {candidate.user?.email}
                </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-[#1a1f1e]/5">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#1a1f1e]/30">
                    <span>Recommandation</span>
                    <span className="flex items-center gap-1 text-[#1a1f1e]">
                        {candidate.matching_score >= 80 ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <Award className="h-3 w-3" />}
                        {candidate.matching_score >= 80 ? 'Excellent profil' : candidate.matching_score >= 50 ? 'Profil pertinent' : 'Profil à vérifier'}
                    </span>
                </div>

                <button className="flex h-12 w-full items-center justify-center rounded-xl bg-[#1a1f1e] text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-[#1a1f1e]/90 transition-all active:scale-95">
                    Voir le profil <ChevronRight className="ml-2 h-3.5 w-3.5" />
                </button>
            </div>
        </motion.div>
    );
}


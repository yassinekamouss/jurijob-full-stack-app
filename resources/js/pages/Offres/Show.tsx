import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ChevronDown,
    MapPin,
    Briefcase,
    GraduationCap,
    Globe,
    ShieldCheck,
    CheckCircle2,
    Clock,
    Layers,
    LayoutDashboard,
    Info
} from 'lucide-react';
import { useMemo, useState } from 'react';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { index as offresIndex } from '@/routes/offres';
import type { Offre } from '@/types/offre';

interface Props {
    offre: Offre;
}

const CATEGORIES = [
    { label: 'Spécialisations', type: 'SPECIALISATION', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Langues souhaitées', type: 'LANGUE', icon: Globe, color: 'text-sky-600 bg-sky-50' },
];

const IMPORTANCE_LEVELS = {
    indispensable: { label: 'Indispensable', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    important: { label: 'Important', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    souhaitable: { label: 'Souhaitable', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    facultatif: { label: 'Facultatif', color: 'bg-slate-50 text-slate-600 border-slate-200' },
};

const BASE_CRITERIA = [
    { label: 'Poste', icon: Briefcase, value: (offre: Offre) => offre.poste?.nom },
    { label: 'Type de contrat', icon: ShieldCheck, value: (offre: Offre) => offre.type_travail?.nom },
    { label: 'Mode de travail', icon: MapPin, value: (offre: Offre) => offre.mode_travail?.nom },
    { label: 'Ville', icon: Globe, value: (offre: Offre) => offre.ville?.nom },
    { label: "Niveau d'expérience", icon: GraduationCap, value: (offre: Offre) => offre.niveau_experience?.nom },
    { label: 'Formation juridique', icon: LayoutDashboard, value: (offre: Offre) => offre.formation_juridique?.nom },
    { label: 'Salaire', icon: Layers, value: (offre: Offre) => offre.salaire?.nom },
    { label: 'Urgence', icon: Clock, value: (offre: Offre) => offre.urgence?.nom },
] as const;

export default function Show({ offre }: Props) {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const groupedRequirements = useMemo(() => {
        if (!offre.requirements) {
            return [];
        }

        return CATEGORIES.map(cat => ({
            ...cat,
            items: (offre.requirements || []).filter(r => r.taxonomy_type === cat.type)
        })).filter(g => g.items.length > 0);
    }, [offre.requirements]);

    const totalCriteres = useMemo(() => {
        const baseCriteria = BASE_CRITERIA.reduce((count, criterion) => {
            return criterion.value(offre) ? count + 1 : count;
        }, 0);

        return baseCriteria + (offre.requirements?.length ?? 0);
    }, [offre]);

    const baseCriteriaCards = useMemo(() => {
        return BASE_CRITERIA.map((criterion) => ({
            ...criterion,
            value: criterion.value(offre),
        }));
    }, [offre]);

    const toggleGroup = (groupType: string) => {
        setExpandedGroups((current) => ({
            ...current,
            [groupType]: !current[groupType],
        }));
    };

    return (
        <div className="relative min-h-screen bg-[#FDFCF8] text-[#1a1f1e] overflow-x-hidden">
            <Head title={`${offre.titre} - Détails de l'offre`} />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
                {/* Navigation & Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <Link
                            href={offresIndex().url}
                            className="group inline-flex items-center text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 hover:text-[#1a1f1e] transition-all"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                            Retour au tableau de bord
                        </Link>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight leading-tight">
                            {offre.titre}
                        </h1>
                        <div className="flex flex-wrap gap-2 items-center">
                            <Badge className={cn(
                                "h-7 px-4 rounded-full font-black uppercase tracking-widest text-[9px] border-none shadow-sm",
                                offre.statut === 'EN_TRAITEMENT' ? 'bg-amber-500 text-white' :
                                    offre.statut === 'ATTENTE_PAIEMENT' ? 'bg-orange-500 text-white' :
                                        offre.statut === 'VERIFICATION_PAIEMENT' ? 'bg-blue-500 text-white' :
                                            offre.statut === 'CV_ENVOYES' ? 'bg-emerald-500 text-white' :
                                                'bg-slate-500 text-white'
                            )}>
                                {offre.statut === 'EN_TRAITEMENT' ? 'En traitement' :
                                    offre.statut === 'ATTENTE_PAIEMENT' ? 'En attente de paiement' :
                                        offre.statut === 'VERIFICATION_PAIEMENT' ? 'Vérification de paiement' :
                                            offre.statut === 'CV_ENVOYES' ? 'CV Envoyés' :
                                                'Offre Archivée'}
                            </Badge>
                            <span className="h-1 w-1 rounded-full bg-slate-300 mx-1" />
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                                <Clock className="h-3 w-3" />
                                Posté le {new Date(offre.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </motion.div>


                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Description Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
                                    <LayoutDashboard className="h-4 w-4 text-white" />
                                </div>
                                <h2 className="font-serif text-2xl font-bold italic tracking-tight text-slate-900">À propos du rôle</h2>
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <div className="text-lg leading-relaxed text-slate-600 font-medium font-sans whitespace-pre-line bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm shadow-slate-200/50">
                                    {offre.description}
                                </div>
                            </div>
                        </section>

                        {/* Criteria Section */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                        <Layers className="h-4 w-4 text-white" />
                                    </div>
                                    <h2 className="font-serif text-2xl font-bold italic tracking-tight text-slate-900">Critères de l'offre</h2>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Vue unifiée des critères
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4 rounded-[32px] border border-slate-100 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-50 pb-5">
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Critères structurants</h3>
                                            <p className="text-[11px] font-medium text-slate-400 italic">Les informations structurantes de l'offre.</p>
                                        </div>
                                        <Badge variant="outline" className="h-8 px-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm bg-slate-900 text-white border-slate-900">
                                            {baseCriteriaCards.filter((criterion) => criterion.value).length} critères
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {baseCriteriaCards.map((item, i) => (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                    className="p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-4 bg-[#FCFCFB]"
                                            >
                                                <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                                    <item.icon className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                                    <p className="font-bold text-slate-900 whitespace-normal break-words leading-snug">{item.value || 'Non renseigné'}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="p-8 bg-slate-900 rounded-[32px] border border-white/5 text-white shadow-2xl sticky top-32 overflow-hidden">
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/[0.03]" />
                                <div className="relative space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                                <Info className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Informations</p>
                                                <h3 className="text-xl font-bold tracking-tight">Synthèse des critères</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm text-white/60 leading-relaxed font-sans font-medium">
                                            Cette vue regroupe les critères structurants de l'offre et les critères complémentaires configurés lors de la publication.
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-white/10 space-y-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "h-3 w-3 rounded-full",
                                                    offre.statut === 'CV_ENVOYES' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                                                )} />
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80">
                                                    {offre.statut === 'EN_TRAITEMENT' ? 'En traitement'
                                                        : offre.statut === 'ATTENTE_PAIEMENT' ? 'Attente de paiement'
                                                        : offre.statut === 'VERIFICATION_PAIEMENT' ? 'Vérification du paiement'
                                                        : offre.statut === 'CV_ENVOYES' ? 'CV Envoyés'
                                                        : 'Archivée'}
                                                </span>
                                            </div>
                                        
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-2xl bg-white/5 p-4 space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Critères</p>
                                                <p className="text-2xl font-black text-white">{totalCriteres}</p>
                                            </div>
                                            <div className="rounded-2xl bg-white/5 p-4 space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Publié le</p>
                                                <p className="text-sm font-black text-white leading-tight">
                                                    {new Date(offre.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Card className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 overflow-hidden mt-8">
                                    <div className="space-y-4">
                                       

                                        <div className="space-y-3">
                                            <AnimatePresence mode="popLayout">
                                                {groupedRequirements.map((group, groupIdx) => (
                                                    <motion.div
                                                        key={group.type}
                                                        initial={{ opacity: 0, y: 12 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.15 + groupIdx * 0.08 }}
                                                        className="relative rounded-2xl border border-slate-100 bg-slate-50/60 p-4 shadow-sm"
                                                    >
                                                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shrink-0", group.color)}>
                                                                    <group.icon className="h-5 w-5" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 break-words">{group.label}</h4>
                                                                    <p className="text-[11px] font-medium text-slate-500 italic">Critères complémentaires</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2 shrink-0">
                                                                {group.items.length > 1 && (
                                                                    <Badge variant="outline" className="h-7 px-3 rounded-full font-black text-[10px] uppercase tracking-widest bg-slate-900 text-white border-slate-900">
                                                                        {group.items.length}
                                                                    </Badge>
                                                                )}

                                                                {group.items.length > 2 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => toggleGroup(group.type)}
                                                                        className="h-8 w-8 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center shadow-sm transition-transform hover:scale-105"
                                                                        aria-label={expandedGroups[group.type] ? `Réduire ${group.label}` : `Afficher plus de ${group.label}`}
                                                                    >
                                                                        <ChevronDown className={cn("h-4 w-4 transition-transform", expandedGroups[group.type] ? "rotate-180" : "rotate-0")} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="mt-3 space-y-2">
                                                                    {(expandedGroups[group.type] ? group.items : group.items.slice(0, 2)).map((req, reqIdx) => {
                                                                const importanceValue = (req.metadata?.importance || 'important') as keyof typeof IMPORTANCE_LEVELS;
                                                                const importance = IMPORTANCE_LEVELS[importanceValue] ?? IMPORTANCE_LEVELS.important;
                                                                const niveauNom = req.metadata?.niveau_nom;

                                                                return (
                                                                    <div
                                                                        key={reqIdx}
                                                                        className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3"
                                                                    >
                                                                        <div className="min-w-0 flex-1 pr-2">
                                                                            <p className="text-sm font-semibold text-slate-900 whitespace-normal break-words leading-snug">
                                                                                {req.label}
                                                                            </p>
                                                                            {niveauNom && (
                                                                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 break-words">
                                                                                    Niveau: {niveauNom}
                                                                                </p>
                                                                            )}
                                                                        </div>

                                                                        {req.taxonomy_type === 'LANGUE' && (
                                                                            <Badge className={cn("flex-shrink-0 h-6 px-3 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm", importance.color)}>
                                                                                {importance.label}
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}

                                                            {group.items.length > 2 && !expandedGroups[group.type] && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleGroup(group.type)}
                                                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500 transition-colors hover:bg-slate-50"
                                                                >
                                                                    <ChevronDown className="h-4 w-4" />
                                                                    Voir {group.items.length - 2} autre{group.items.length - 2 > 1 ? 's' : ''}
                                                                </button>
                                                            )}

                                                            {group.items.length > 2 && expandedGroups[group.type] && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleGroup(group.type)}
                                                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500 transition-colors hover:bg-slate-50"
                                                                >
                                                                    <ChevronDown className="h-4 w-4 rotate-180" />
                                                                    Réduire la liste
                                                                </button>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { index as offresIndex, edit as offresEdit, matching as offresMatching } from '@/routes/offres';
import { Offre } from '@/types/offre';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Briefcase,
    GraduationCap,
    Globe,
    ShieldCheck,
    CheckCircle2,
    Clock,
    Layers,
    Target,
    Settings,
    LayoutDashboard
} from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    offre: Offre;
}

const CATEGORIES = [
    { label: 'Localisations', type: 'ville', icon: MapPin, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Spécialisations', type: 'specialisation', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Langues souhaitées', type: 'langue', icon: Globe, color: 'text-sky-600 bg-sky-50' },
    { label: 'Domaines d\'expérience', type: 'domaine_experience', icon: Briefcase, color: 'text-amber-600 bg-amber-50' },
    { label: 'Formations Juridiques', type: 'formation_juridique', icon: GraduationCap, color: 'text-rose-600 bg-rose-50' },
];

const IMPORTANCE_LEVELS = {
    indispensable: { label: 'Indispensable', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    important: { label: 'Important', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    souhaitable: { label: 'Souhaitable', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    facultatif: { label: 'Facultatif', color: 'bg-slate-50 text-slate-600 border-slate-200' },
};

export default function Show({ offre }: Props) {
    // Group requirements by their category label
    const groupedRequirements = useMemo(() => {
        if (!offre.requirements) return [];

        return CATEGORIES.map(cat => ({
            ...cat,
            items: (offre.requirements || []).filter(r => r.taxonomy_type === cat.type)
        })).filter(g => g.items.length > 0);
    }, [offre.requirements]);

    return (
        <div className="relative min-h-screen bg-[#FDFCF8] text-[#1a1f1e] overflow-x-hidden">
            <Head title={`${offre.titre} - Détails de l'offre`} />

            {/* Background Texture Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.15] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            />

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
                                offre.statut === 'ouvert' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            )}>
                                {offre.statut === 'ouvert' ? 'Active • Recrutement en cours' : 'Offre Archivée'}
                            </Badge>
                            <span className="h-1 w-1 rounded-full bg-slate-300 mx-1" />
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                                <Clock className="h-3 w-3" />
                                Posté le {new Date(offre.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3"
                    >
                        <Link href={offresMatching({ offre: offre.id }).url}>
                            <Button className="h-14 px-8 rounded-2xl bg-[#1a1f1e] text-white font-black hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-[#1a1f1e]/20 group">
                                <Target className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                                Trouver des Talents
                            </Button>
                        </Link>
                        <Link href={offresEdit({ offre: offre.id }).url}>
                            <Button variant="outline" className="h-14 px-6 rounded-2xl border-slate-200 bg-white font-black hover:bg-slate-50 transition-all">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Poste', value: offre.poste?.nom, icon: Briefcase, color: 'bg-white' },
                                { label: 'Type de contrat', value: offre.type_travail?.nom, icon: ShieldCheck, color: 'bg-white' },
                                { label: 'Mode de travail', value: offre.mode_travail?.nom, icon: MapPin, color: 'bg-white' },
                                { label: "Niveau d'expérience", value: offre.niveau_experience?.nom, icon: GraduationCap, color: 'bg-white' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={cn(
                                        "p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-4",
                                        item.color
                                    )}
                                >
                                    <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                        <item.icon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                        <p className="font-bold text-slate-900 line-clamp-1">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

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

                        {/* Groups & Logical Requirements */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                        <Layers className="h-4 w-4 text-white" />
                                    </div>
                                    <h2 className="font-serif text-2xl font-bold italic tracking-tight text-slate-900">Critères & Logique de Matching</h2>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Profil Vérifié par l'Algorithme
                                </div>
                            </div>

                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {groupedRequirements.map((group, groupIdx) => (
                                        <motion.div
                                            key={group.type}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + groupIdx * 0.1 }}
                                            className="relative p-6 sm:p-8 rounded-[32px] border border-slate-100 bg-white shadow-lg shadow-slate-200/50 group/group"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-50 pb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover/group:scale-110", group.color)}>
                                                        <group.icon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">{group.label}</h4>
                                                        <p className="text-[11px] font-medium text-slate-400 italic">Configuration du groupe de matching</p>
                                                    </div>
                                                </div>

                                                {/* Logic Display */}
                                                {group.items.length > 1 && (
                                                    <Badge variant="outline" className={cn(
                                                        "h-8 px-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-sm",
                                                        (group.items[0] as any).operator === 'AND' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-900 text-white border-slate-900'
                                                    )}>
                                                        MODIFICATEUR LOGIQUE : {(group.items[0] as any).operator === 'AND' ? 'TOUS REQUIS (AND)' : 'AU MOINS UN (OR)'}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {group.items.map((req, reqIdx) => {
                                                    const importance = IMPORTANCE_LEVELS[req.importance as keyof typeof IMPORTANCE_LEVELS];
                                                    return (
                                                        <div
                                                            key={reqIdx}
                                                            className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-100 hover:shadow-md transition-all group/card"
                                                        >
                                                            <div className="min-w-0 pr-4">
                                                                <p className="font-bold text-slate-900 line-clamp-1">{req.label}</p>
                                                                {req.requirements_data?.niveau_nom ? (
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Niveau: {req.requirements_data.niveau_nom}</p>
                                                                ) : req.requirements_data?.niveau_langue_id && (
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Niveau ID: {req.requirements_data.niveau_langue_id}</p>
                                                                )}
                                                            </div>
                                                            <Badge className={cn("flex-shrink-0 h-6 px-3 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm", importance.color)}>
                                                                {importance.label}
                                                            </Badge>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Decorative connector for AND logic */}
                                            {group.items.length > 1 && (group.items[0] as any).operator === 'AND' && (
                                                <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 flex items-center justify-center p-1 bg-white border border-indigo-100 rounded-full text-indigo-400 shadow-sm">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
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
                                                <Target className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Outil de Matching</p>
                                                <h3 className="text-xl font-bold tracking-tight">Recrutement Ciblé</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm text-white/60 leading-relaxed font-sans font-medium">
                                            Notre algorithme a détecté plusieurs candidats potentiels correspondant à vos {offre.requirements?.length || 0} critères de recherche.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <Link href={offresMatching({ offre: offre.id }).url}>
                                            <Button className="h-14 w-full rounded-2xl bg-white text-slate-900 font-black hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-white/10">
                                                Lancer le Matching
                                            </Button>
                                        </Link>
                                        <p className="text-[10px] text-center font-bold uppercase tracking-widest text-white/30">
                                            Analyse en temps réel de 500+ profils
                                        </p>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Statut: En Ligne</span>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-white/10 text-white">
                                                ID: #{offre.id}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <div className="px-8 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Métriques de l'offre</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-500">Complexité Matching</span>
                                    <span className="text-xs font-black text-slate-900">HAUTE</span>
                                </div>
                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '85%' }}
                                        className="h-full bg-indigo-600 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

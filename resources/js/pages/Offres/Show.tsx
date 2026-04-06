import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { index as offresIndex, edit as offresEdit } from '@/routes/offres';
import { Offre } from '@/types/offre';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Briefcase, GraduationCap, Globe, ShieldCheck } from 'lucide-react';

interface Props {
    offre: Offre;
}

export default function Show({ offre }: Props) {
    const getImportanceColor = (importance: string) => {
        switch (importance) {
            case 'indispensable': return 'bg-red-100 text-red-700 border-red-200';
            case 'important': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'souhaitable': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="relative min-h-screen bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title={`${offre.titre} - Jurijob`} />
            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                <Link 
                    href={offresIndex().url}
                    className="inline-flex items-center text-sm font-bold text-[#1a1f1e]/40 hover:text-[#1a1f1e] transition-colors mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux offres
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight italic mb-6">
                                {offre.titre}
                            </h1>

                            <div className="flex flex-wrap gap-4 items-center text-sm font-bold text-[#1a1f1e]/50">
                                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#1a1f1e]/5 shadow-sm">
                                    <Briefcase className="h-4 w-4" /> {offre.poste?.nom}
                                </span>
                                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#1a1f1e]/5 shadow-sm">
                                    <ShieldCheck className="h-4 w-4" /> {offre.type_travail?.nom}
                                </span>
                                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#1a1f1e]/5 shadow-sm">
                                    <Calendar className="h-4 w-4" /> Publié le {new Date(offre.created_at).toLocaleDateString('fr-FR')}
                                </span>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            <h2 className="font-serif text-2xl font-bold italic border-b border-[#1a1f1e]/5 pb-4">Description du poste</h2>
                            <div className="prose prose-gray max-w-none text-lg leading-relaxed text-[#1a1f1e]/70 font-medium font-sans whitespace-pre-line">
                                {offre.description}
                            </div>
                        </div>

                        {/* Requirements Sections */}
                        <div className="space-y-12 pt-12 border-t border-[#1a1f1e]/5">
                            <h2 className="font-serif text-2xl font-bold italic">Critères de sélection</h2>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Languages */}
                                {offre.langue_requirements?.map((req) => (
                                    <RequirementCard
                                        key={req.id}
                                        icon={<Globe className="h-5 w-5" />}
                                        title={req.langue?.nom || 'Langue'}
                                        subtitle={req.niveau_langue?.nom}
                                        importance={req.importance}
                                        colorClass={getImportanceColor(req.importance)}
                                    />
                                ))}

                                {/* Villes */}
                                {offre.ville_requirements?.map((req) => (
                                    <RequirementCard
                                        key={req.id}
                                        icon={<MapPin className="h-5 w-5" />}
                                        title={req.ville?.nom || 'Ville'}
                                        importance={req.importance}
                                        colorClass={getImportanceColor(req.importance)}
                                    />
                                ))}

                                {/* Specialisations */}
                                {offre.specialisation_requirements?.map((req) => (
                                    <RequirementCard
                                        key={req.id}
                                        icon={<ShieldCheck className="h-5 w-5" />}
                                        title={req.specialisation?.nom || 'Spécialisation'}
                                        importance={req.importance}
                                        colorClass={getImportanceColor(req.importance)}
                                    />
                                ))}

                                {/* Domain Experience */}
                                {offre.domain_experience_requirements?.map((req) => (
                                    <RequirementCard 
                                        key={req.id}
                                        icon={<Briefcase className="h-5 w-5" />}
                                        title={req.domaine_experience?.nom || 'Expérience'}
                                        importance={req.importance}
                                        colorClass={getImportanceColor(req.importance)}
                                    />
                                ))}

                                {/* Formations */}
                                {offre.formation_juridique_requirements?.map((req) => (
                                    <RequirementCard
                                        key={req.id}
                                        icon={<GraduationCap className="h-5 w-5" />}
                                        title={req.formation_juridique?.nom || 'Formation'}
                                        importance={req.importance}
                                        colorClass={getImportanceColor(req.importance)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Actions */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card className="p-8 bg-white rounded-[32px] border border-[#1a1f1e]/5 shadow-sm sticky top-28">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1f1e]/30">Actions</p>
                                    <div className="flex flex-col gap-3">
                                        <Button className="h-14 w-full rounded-2xl bg-[#1a1f1e] text-white font-bold hover:scale-[1.02] transition-transform">
                                            Trouver des Matchs
                                        </Button>
                                        <Link 
                                            href={offresEdit({ offre: offre.id }).url}
                                            className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-[#1a1f1e]/10 font-bold hover:bg-gray-50 transition-colors"
                                        >
                                            Modifier l'offre
                                        </Link>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#1a1f1e]/5 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1f1e]/30">Statut</p>
                                    <Badge className={`px-4 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] ${offre.statut === 'ouvert' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {offre.statut}
                                    </Badge>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

function RequirementCard({ icon, title, subtitle, importance, colorClass }: any) {
    return (
        <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-[#1a1f1e]/5 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#1a1f1e]/5 text-[#1a1f1e] group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div>
                    <p className="font-bold text-gray-900">{title}</p>
                    {subtitle && <p className="text-xs font-medium text-gray-400">{subtitle}</p>}
                </div>
            </div>
            <Badge variant="outline" className={`px-3 py-1 text-[10px] uppercase font-black tracking-widest ${colorClass}`}>
                {importance}
            </Badge>
        </div>
    );
}

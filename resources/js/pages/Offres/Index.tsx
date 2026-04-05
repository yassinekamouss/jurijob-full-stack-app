import DashboardHeader from '@/components/recruiter/DashboardHeader';
import { create as offresCreate, show as offresShow, edit as offresEdit } from '@/routes/offres';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Search } from 'lucide-react';

interface Props {
    offres: any[];
}

export default function Index({ offres }: Props) {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title="Mes Offres - Jurijob" />

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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                            Gestion des Annonces
                        </div>
                        <h1 className="font-serif text-4xl font-bold tracking-tight italic md:text-5xl">
                            Mes Offres d'Emploi
                        </h1>
                        <p className="max-w-xl text-lg font-medium text-[#1a1f1e]/50">
                            Gérez vos publications, suivez les candidatures et trouvez les meilleurs profils juridiques.
                        </p>
                    </div>

                    <Link
                        href={offresCreate().url}
                        className="inline-flex h-14 items-center justify-center rounded-full bg-[#1a1f1e] px-10 text-base font-bold text-white transition-all hover:scale-105 hover:bg-[#1a1f1e]/90 active:scale-95 shadow-xl shadow-[#1a1f1e]/10"
                    >
                        <Plus className="mr-2 h-5 w-5" />
                        Publier une nouvelle offre
                    </Link>
                </motion.div>

                {offres.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border border-[#1a1f1e]/5 shadow-sm"
                    >
                        <div className="bg-[#1a1f1e]/5 p-8 rounded-3xl mb-8">
                            <Briefcase className="h-14 w-14 text-[#1a1f1e]/20" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1a1f1e] mb-3">Aucune offre publiée</h3>
                        <p className="text-lg font-medium text-[#1a1f1e]/40 max-w-sm text-center mb-10">
                            Votre tableau de bord est vide. Commencez à recruter dès maintenant.
                        </p>
                        <Link
                            href={offresCreate().url}
                            className="text-[#1a1f1e] font-black text-sm tracking-widest uppercase border-b-2 border-[#1a1f1e] pb-1 hover:opacity-70 transition-opacity"
                        >
                            Créer ma première offre &rarr;
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offres.map((offre, idx) => (
                            <motion.div
                                key={offre.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-white rounded-[32px] border border-[#1a1f1e]/5 p-8 shadow-sm hover:shadow-2xl hover:shadow-[#1a1f1e]/5 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-[#1a1f1e]/[0.02] transition-transform group-hover:scale-150" />
                                
                                <div className="flex justify-between items-center mb-6">
                                    <Badge className="bg-[#1a1f1e]/5 text-[#1a1f1e] border-none text-[10px] uppercase font-black tracking-wider">
                                        {offre.poste?.nom || 'Poste'}
                                    </Badge>
                                    <span className="text-xs font-bold text-[#1a1f1e]/30">
                                        {new Date(offre.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                    </span>
                                </div>

                                <h3 className="font-serif text-2xl font-bold text-[#1a1f1e] group-hover:italic transition-all mb-4 line-clamp-2">
                                    {offre.titre}
                                </h3>

                                <div className="flex items-center gap-4 text-sm font-bold text-[#1a1f1e]/40 mb-8">
                                    <span className="flex items-center gap-1.5">
                                        <Search className="h-3.5 w-3.5" />
                                        {offre.requirements?.length || 0} critères
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-[#1a1f1e]/10" />
                                    <span>{offre.type_travail?.nom}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#1a1f1e]/5">
                                    <Link 
                                        href={offresShow({ offre: offre.id }).url} 
                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-xs font-black text-[#1a1f1e] uppercase tracking-widest hover:bg-[#1a1f1e] hover:text-white transition-all"
                                    >
                                        Détails
                                    </Link>
                                    <Link 
                                        href={offresEdit({ offre: offre.id }).url} 
                                        className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-blue-600 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        Modifier
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

function Badge({ children, className }: any) {
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {children}
        </span>
    );
}
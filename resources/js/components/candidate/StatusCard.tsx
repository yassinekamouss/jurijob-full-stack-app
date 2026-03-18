import { LayoutGrid, Search, BookOpen, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  isActive: boolean;
}

export default function StatusCard({ isActive }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm transition-all hover:shadow-md"
    >
      <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-[#1a1f1e]/5 blur-3xl" />
      
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              {isActive ? <LayoutGrid className="h-5 w-5" /> : <Folder className="h-5 w-5" />}
            </div>
            <h2 className="text-xl font-bold font-serif italic text-[#1a1f1e]">Statut de visibilité</h2>
          </div>
          
          <p className="max-w-md text-sm leading-relaxed text-[#1a1f1e]/60">
            {isActive 
              ? "Votre profil est actuellement actif et visible par notre réseau de recruteurs. Vous serez contacté dès qu'un projet correspond à votre expertise."
              : "Votre profil est actuellement masqué. Les recruteurs ne peuvent pas vous trouver ou vous proposer des opportunités de matching."
            }
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-sm ${
            isActive 
              ? 'bg-emerald-500 text-white' 
              : 'bg-[#1a1f1e] text-[#FDFCF8]'
          }`}>
            {isActive ? (
              <>
                <Search className="h-4 w-4" />
                Profil Actif
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4" />
                Profil Inactif
              </>
            )}
          </div>
          
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1f1e]/30">
            Géré via vos paramètres de compte
          </p>
        </div>
      </div>
    </motion.div>
  );
}

import { LayoutGrid, Folder, BookOpen, Search } from 'lucide-react';
import ProfileSectionCard from './ProfileSectionCard';

interface Props {
  candidat: any;
}

export default function ProfileGrid({ candidat }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Experience & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileSectionCard title="Expériences" icon={LayoutGrid} delay={0.1}>
          <div className="space-y-6">
            {candidat?.experiences?.length > 0 ? (
              candidat.experiences.map((exp: any, i: number) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[#C06041]">
                  <h4 className="font-bold text-[#1a1f1e] text-lg">{exp.poste}</h4>
                  <p className="text-sm font-medium text-[#1a1f1e]/60 uppercase tracking-wide">{exp.entreprise}</p>
                  <p className="mt-1 text-xs font-bold text-[#1a1f1e]/40">{exp.debut} — {exp.fin || 'Présent'}</p>
                </div>
              ))
            ) : (
              <p className="text-sm italic text-[#1a1f1e]/40">Aucune expérience renseignée</p>
            )}
          </div>
        </ProfileSectionCard>

        <ProfileSectionCard title="Formations" icon={BookOpen} delay={0.2}>
          <div className="space-y-6">
            {candidat?.formations?.length > 0 ? (
              candidat.formations.map((form: any, i: number) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[#1a1f1e]">
                  <h4 className="font-bold text-[#1a1f1e] text-lg">{form.niveau} en {form.domaine}</h4>
                  <p className="text-sm font-medium text-[#1a1f1e]/60 uppercase tracking-wide">{form.ecole}</p>
                  <p className="mt-1 text-xs font-bold text-[#1a1f1e]/40">{form.annee_debut} — {form.annee_fin || 'N/A'}</p>
                </div>
              ))
            ) : (
              <p className="text-sm italic text-[#1a1f1e]/40">Aucune formation renseignée</p>
            )}
          </div>
        </ProfileSectionCard>
      </div>

      {/* Skills & Langs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileSectionCard title="Spécialisations" icon={Folder} delay={0.3}>
          <div className="flex flex-wrap gap-3">
            {candidat?.specialisations?.length > 0 ? (
              candidat.specialisations.map((s: any, i: number) => (
                <span key={i} className="rounded-2xl bg-[#1a1f1e]/5 border border-[#1a1f1e]/5 px-5 py-2.5 text-sm font-bold text-[#1a1f1e] transition-colors hover:bg-[#1a1f1e] hover:text-[#FDFCF8] cursor-default">
                  {s.specialisation}
                </span>
              ))
            ) : (
              <p className="text-sm italic text-[#1a1f1e]/40">Aucune spécialisation ajoutée</p>
            )}
          </div>
        </ProfileSectionCard>

        <ProfileSectionCard title="Langues" icon={Search} delay={0.4}>
          <div className="space-y-4">
            {candidat?.langues?.length > 0 ? (
              candidat.langues.map((l: any, i: number) => (
                <div key={i} className="flex items-center justify-between rounded-2xl bg-[#FDFCF8] border border-[#1a1f1e]/10 p-4">
                  <span className="font-bold text-[#1a1f1e]">{l.nom}</span>
                  <span className="rounded-full bg-[#1a1f1e] px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter text-[#FDFCF8]">
                    {l.niveau}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm italic text-[#1a1f1e]/40">Aucune langue ajoutée</p>
            )}
          </div>
        </ProfileSectionCard>
      </div>
    </div>
  );
}

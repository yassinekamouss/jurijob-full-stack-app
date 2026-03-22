import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Languages, Plus, Trash2, CheckCircle2, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { langues as langueOptions, niveauxLangue } from '@/constants/options';
import { store, destroy } from '@/routes/candidate/langues';

interface Props {
  langues: any[];
}

export default function LanguageSection({ langues }: Props) {
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm({
    nom: '',
    niveau: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(store().url, {
      onSuccess: () => {
        form.reset();
        setIsAdding(false);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Supprimer cette langue ?')) {
      form.delete(destroy(id).url);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif italic mb-1">Langues</h3>
          <p className="text-sm text-[#1a1f1e]/50 font-medium">Maîtrise linguistique.</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[#1a1f1e] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#343a38] transition-all"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 bg-[#1a1f1e]/[0.03] rounded-[32px] border border-[#1a1f1e]/5"
          >
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-6 items-end">
              <div className="flex-[2] space-y-2 w-full">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1f1e]/40 ml-1">Langue</label>
                <div className="relative group">
                  <select
                    value={form.data.nom}
                    onChange={e => form.setData('nom', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer pr-12 group-hover:border-[#1a1f1e]/20"
                    required
                  >
                    <option value="">Choisir une langue</option>
                    {langueOptions
                      .filter(opt => !langues.some(l => l.nom === opt))
                      .map(opt => <option key={opt} value={opt}>{opt}</option>)
                    }
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/20 group-hover:text-[#1a1f1e]/40 transition-colors pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 space-y-2 w-full">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1f1e]/40 ml-1">Niveau</label>
                <div className="relative group">
                  <select
                    value={form.data.niveau}
                    onChange={e => form.setData('niveau', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer pr-12 group-hover:border-[#1a1f1e]/20"
                    required
                  >
                    <option value="">Niveau</option>
                    {niveauxLangue.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/20 group-hover:text-[#1a1f1e]/40 transition-colors pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={form.processing || !form.isDirty}
                  className="flex-1 sm:flex-none bg-[#1a1f1e] text-white p-4 px-6 rounded-2xl flex items-center justify-center hover:bg-[#343a38] transition-all disabled:opacity-50 shadow-xl shadow-[#1a1f1e]/10 active:scale-95"
                  title="Ajouter"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="p-4 rounded-2xl border border-[#1a1f1e]/10 text-[#1a1f1e]/40 hover:bg-white hover:text-[#1a1f1e] hover:border-[#1a1f1e]/20 transition-all active:scale-95"
                  title="Annuler"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {langues.length > 0 ? (
          langues.map((l) => (
            <div
              key={l.id}
              className="group flex items-center justify-between rounded-2xl bg-white border border-[#1a1f1e]/10 p-5 transition-all hover:border-[#1a1f1e] hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#1a1f1e]">
                  <Languages className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-[#1a1f1e]">{l.nom}</span>
                  <div className="text-[10px] font-black uppercase tracking-tighter text-[#1a1f1e]/40">
                    {l.niveau}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(l.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-300 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 rounded-[32px] border-2 border-dashed border-[#1a1f1e]/10">
            <p className="text-[#1a1f1e]/30 font-bold italic">Aucune langue ajoutée.</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Briefcase, Plus, Trash2, Check, X, ChevronDown, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import { store, update, destroy } from '@/routes/candidate/domaine-experiences';

interface Props {
  domainExperiences: any[];
}

export default function DomaineExperienceSection({ domainExperiences }: Props) {
  const { domaineExperiences: domainExperienceOptions } = useTaxonomies();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm({
    domaine_experience_id: '',
  });

  const resetForm = () => {
    form.reset();
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (exp: any) => {
    form.setData({
      domaine_experience_id: exp.domaine_experience_id,
    });
    setEditingId(exp.id);
    setIsAdding(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      form.put(update(editingId).url, {
        onSuccess: () => {
          resetForm();
        },
      });
    } else {
      form.post(store().url, {
        onSuccess: () => {
          resetForm();
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm(`Supprimer ce domaine d'expérience ?`)) {
      form.delete(destroy(id).url);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif italic mb-1">Domaines d'expérience</h3>
          <p className="text-sm text-[#1a1f1e]/50 font-medium">Vos domaines d'expérience juridique.</p>
        </div>
        {!isAdding && !editingId && (
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
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 bg-[#1a1f1e]/[0.03] rounded-[32px] border border-[#1a1f1e]/5"
          >
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-6 items-end">
              <div className="flex-1 space-y-2 w-full">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1f1e]/40 ml-1">Domaine d'expérience</label>
                <div className="relative group">
                  <select
                    value={form.data.domaine_experience_id}
                    onChange={e => form.setData('domaine_experience_id', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer pr-12 group-hover:border-[#1a1f1e]/20"
                    required
                  >
                    <option value="">Sélectionner un domaine</option>
                    {useLoadingTaxonomy(domainExperienceOptions) ? (
                      <option disabled>Chargement...</option>
                    ) : (
                      domainExperienceOptions
                        .filter(opt => !domainExperiences.some(s => s.domaine_experience_id === opt.id && s.id !== editingId))
                        .map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/20 group-hover:text-[#1a1f1e]/40 transition-colors pointer-events-none" />
                </div>
                {form.errors.domaine_experience_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.domaine_experience_id}</p>}
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={form.processing || !form.isDirty}
                  className="flex-1 sm:flex-none bg-[#1a1f1e] text-white p-4 px-6 rounded-2xl flex items-center justify-center hover:bg-[#343a38] transition-all disabled:opacity-50 shadow-xl shadow-[#1a1f1e]/10 active:scale-95"
                  title={editingId ? 'Mettre à jour' : 'Ajouter'}
                >
                  {editingId ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => resetForm()}
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

      <div className="flex flex-wrap gap-3">
        {domainExperiences && domainExperiences.length > 0 ? (
          domainExperiences.map((s) => (
            <div
              key={s.id}
              className="group relative flex items-center gap-3 rounded-2xl bg-white border border-[#1a1f1e]/10 px-6 py-4 transition-all hover:border-[#1a1f1e] hover:shadow-sm"
            >
              <Briefcase className="h-4 w-4 text-[#1a1f1e]/20" />
              <span className="font-bold text-sm text-[#1a1f1e]">{getTaxonomyLabel(s.domaine_experience_id, domainExperienceOptions)}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                <button
                  onClick={() => handleEdit(s)}
                  className="p-1.5 rounded-lg text-[#1a1f1e]/40 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 transition-all"
                  title="Éditer"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 rounded-lg text-red-300 hover:text-red-500 transition-all"
                  title="Supprimer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-12 rounded-[32px] border-2 border-dashed border-[#1a1f1e]/10">
            <p className="text-[#1a1f1e]/30 font-bold italic">Aucun domaine d'expérience ajouté.</p>
          </div>
        )}
      </div>
    </section>
  );
}

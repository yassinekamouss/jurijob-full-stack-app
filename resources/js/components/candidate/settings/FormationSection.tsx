import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { GraduationCap, Plus, Trash2, FileText, Calendar } from 'lucide-react';
import Icon from '@/components/signup/FormularIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import { store, update, destroy } from '@/routes/candidate/formations';

interface Props {
  formations: any[];
}

export default function FormationSection({ formations }: Props) {
  const { ecoles, formationJuridiques, specialisations } = useTaxonomies();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm({
    formation_juridique_id: '',
    specialisation_id: '',
    ecole_id: '',
    annee_debut: '',
    annee_fin: '',
    diploma_file: null as File | null,
  });

  const resetForm = () => {
    form.reset();
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (formItem: any) => {
    form.setData({
      formation_juridique_id: formItem.formation_juridique_id,
      specialisation_id: formItem.specialisation_id,
      ecole_id: formItem.ecole_id,
      annee_debut: formItem.annee_debut,
      annee_fin: formItem.annee_fin || '',
      diploma_file: null,
    });
    setEditingId(formItem.id);
    setIsAdding(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.data.annee_debut && form.data.annee_fin && form.data.annee_fin < form.data.annee_debut) {
      form.setError('annee_fin', "L'année de fin doit être postérieure ou égale à l'année de début.");
      return;
    }

    if (editingId) {
      form.transform((data) => ({ 
        ...data, 
        _method: 'put' 
      }));
      form.post(update(editingId).url, {
        forceFormData: true,
        onSuccess: () => resetForm(),
      });
    } else {
      // Clear transform to avoid _method: 'put' in store requests if the user edits then adds
      form.transform((data) => data); 
      form.post(store().url, {
        forceFormData: true,
        onSuccess: () => resetForm(),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Supprimer cette formation ?')) {
      form.delete(destroy(id).url);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif italic mb-1">Mes Formations</h3>
          <p className="text-sm text-[#1a1f1e]/50 font-medium">Diplômes et parcours académique.</p>
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

      <AnimatePresence mode="wait">
        {(isAdding || editingId) ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[32px] border border-[#1a1f1e]/10 p-8 shadow-sm"
          >
            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Niveau</label>
                  <select
                    value={form.data.formation_juridique_id}
                    onChange={e => form.setData('formation_juridique_id', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choisir un niveau</option>
                    {useLoadingTaxonomy(formationJuridiques) ? (
                      <option disabled>Chargement...</option>
                    ) : (
                      formationJuridiques.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.formation_juridique_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.formation_juridique_id}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Domaine d'études</label>
                  <select
                    value={form.data.specialisation_id}
                    onChange={e => form.setData('specialisation_id', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choisir un domaine</option>
                    {useLoadingTaxonomy(specialisations) ? (
                      <option disabled>Chargement...</option>
                    ) : (
                      specialisations.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.specialisation_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.specialisation_id}</p>}
                </div>
              </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">École / Université</label>
                  <select
                    value={form.data.ecole_id}
                    onChange={e => form.setData('ecole_id', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choisir un établissement</option>
                    {useLoadingTaxonomy(ecoles) ? (
                      <option disabled>Chargement...</option>
                    ) : (
                      ecoles.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.ecole_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.ecole_id}</p>}
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Année de début</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30 pointer-events-none" />
                    <input
                      type="month"
                      value={form.data.annee_debut || ''}
                      onChange={e => form.setData('annee_debut', e.target.value)}
                      onClick={(e) => e.currentTarget.showPicker()}
                      className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none cursor-pointer"
                      required
                    />
                  </div>
                  {form.errors.annee_debut && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.annee_debut}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Année de fin</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30 pointer-events-none" />
                    <input
                      type="month"
                      value={form.data.annee_fin || ''}
                      onChange={e => form.setData('annee_fin', e.target.value)}
                      onClick={(e) => e.currentTarget.showPicker()}
                      className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none cursor-pointer"
                    />
                  </div>
                  {form.errors.annee_fin && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.annee_fin}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Diplôme (PDF, JPG, PNG)</label>
                <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-[#1a1f1e]/10 bg-[#FDFCF8]">
                  <FileText className="h-8 w-8 text-[#1a1f1e]/20" />
                  <div className="flex-1">
                    <input
                      type="file"
                      id="diploma"
                      className="hidden"
                      onChange={e => form.setData('diploma_file', e.target.files?.[0] || null)}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="diploma" className="text-xs font-bold text-[#1a1f1e] hover:underline cursor-pointer">
                      {form.data.diploma_file ? form.data.diploma_file.name : 'Choisir un fichier'}
                    </label>
                    <p className="text-[10px] text-[#1a1f1e]/40 uppercase font-black">Max 5Mo</p>
                  </div>
                </div>
                {form.errors.diploma_file && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.diploma_file}</p>}
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#1a1f1e]/5">
                <button type="button" onClick={resetForm} className="px-6 py-3 text-sm font-bold text-[#1a1f1e]/40 hover:text-[#1a1f1e]">Annuler</button>
                <button type="submit" disabled={form.processing || !form.isDirty} className="bg-[#1a1f1e] text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-50">
                  <Icon name="CheckCircle2" size={16} />
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {formations.length > 0 ? (
              formations.map((f) => (
                <motion.div
                  key={f.id}
                  layout
                  className="bg-white rounded-[24px] border border-[#1a1f1e]/10 p-6 flex items-center justify-between group transition-all hover:border-[#1a1f1e]/20"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-[#1a1f1e]/5 flex items-center justify-center text-[#1a1f1e]">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{getTaxonomyLabel(f.formation_juridique_id, formationJuridiques)} en {getTaxonomyLabel(f.specialisation_id, specialisations)}</h4>
                      <p className="text-sm font-medium text-[#1a1f1e]/40 uppercase tracking-widest">{getTaxonomyLabel(f.ecole_id, ecoles)}</p>
                      <p className="text-xs font-bold text-[#1a1f1e]/30 mt-1">{f.annee_debut} — {f.annee_fin || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {f.diploma_file && (
                      <a
                        href={`/candidate/diploma/${f.id}`}
                        target="_blank"
                        className="p-2 rounded-xl border border-[#1a1f1e]/10 text-emerald-600 hover:bg-emerald-50 transition-all"
                        title="Voir le diplôme"
                      >
                        <Icon name="Download" size={16} />
                      </a>
                    )}
                    <button onClick={() => handleEdit(f)} className="p-2 rounded-xl border border-[#1a1f1e]/10 text-[#1a1f1e]/40 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5">
                        <Icon name="Pencil" size={16} />
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="p-2 rounded-xl border border-red-100 text-red-300 hover:text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 rounded-[32px] border-2 border-dashed border-[#1a1f1e]/10">
                <p className="text-[#1a1f1e]/30 font-bold italic">Aucune formation enregistrée.</p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

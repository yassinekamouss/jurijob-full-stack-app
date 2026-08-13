import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { GraduationCap, Plus, Trash2, Calendar } from 'lucide-react';
import Icon from '@/components/signup/FormularIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import { useTranslation } from 'react-i18next';
import { store, update, destroy } from '@/routes/candidate/formations';

interface Props {
  formations: any[];
}

export default function FormationSection({ formations }: Props) {
  const { t } = useTranslation();
  const { ecoles, formationJuridiques, specialisations } = useTaxonomies();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm({
    formation_juridique_id: '',
    specialisation_id: '',
    ecole_id: '',
    annee_debut: '',
    annee_fin: '',
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
    });
    setEditingId(formItem.id);
    setIsAdding(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.data.annee_debut && form.data.annee_fin && form.data.annee_fin < form.data.annee_debut) {
      form.setError('annee_fin', t('candidate_settings.education.date_error'));
      return;
    }

    if (editingId) {
      form.put(update(editingId).url, {
        onSuccess: () => resetForm(),
      });
    } else {
      form.post(store().url, {
        onSuccess: () => resetForm(),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm(t('candidate_settings.education.delete_confirm'))) {
      form.delete(destroy(id).url);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif italic mb-1">{t('candidate_settings.education.title')}</h3>
          <p className="text-sm text-[#1a1f1e]/50 font-medium">{t('candidate_settings.education.description')}</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[#1a1f1e] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#343a38] transition-all"
          >
            <Plus className="h-4 w-4" />
            {t('candidate_settings.education.add_button')}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {(isAdding || editingId) ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 rounded-[28px] border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-6 sm:p-8"
          >
            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.education.labels.level')}</label>
                  <select
                    value={form.data.formation_juridique_id}
                    onChange={e => form.setData('formation_juridique_id', e.target.value)}
                    className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">{t('candidate_settings.education.placeholders.level')}</option>
                    {useLoadingTaxonomy(formationJuridiques) ? (
                      <option disabled>{t('candidate_settings.education.loading')}</option>
                    ) : (
                      formationJuridiques.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.formation_juridique_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.formation_juridique_id}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.education.labels.field')}</label>
                  <select
                    value={form.data.specialisation_id}
                    onChange={e => form.setData('specialisation_id', e.target.value)}
                    className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">{t('candidate_settings.education.placeholders.field')}</option>
                    {useLoadingTaxonomy(specialisations) ? (
                      <option disabled>{t('candidate_settings.education.loading')}</option>
                    ) : (
                      specialisations.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.specialisation_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.specialisation_id}</p>}
                </div>
              </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.education.labels.school')}</label>
                  <select
                    value={form.data.ecole_id}
                    onChange={e => form.setData('ecole_id', e.target.value)}
                    className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">{t('candidate_settings.education.placeholders.school')}</option>
                    {useLoadingTaxonomy(ecoles) ? (
                      <option disabled>{t('candidate_settings.education.loading')}</option>
                    ) : (
                      ecoles.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.ecole_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.ecole_id}</p>}
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.education.labels.start_year')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30 pointer-events-none" />
                    <input
                      type="month"
                      value={form.data.annee_debut || ''}
                      onChange={e => form.setData('annee_debut', e.target.value)}
                      onClick={(e) => e.currentTarget.showPicker()}
                      className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none cursor-pointer"
                      required
                    />
                  </div>
                  {form.errors.annee_debut && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.annee_debut}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.education.labels.end_year')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30 pointer-events-none" />
                    <input
                      type="month"
                      value={form.data.annee_fin || ''}
                      onChange={e => form.setData('annee_fin', e.target.value)}
                      onClick={(e) => e.currentTarget.showPicker()}
                      className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none cursor-pointer"
                    />
                  </div>
                  {form.errors.annee_fin && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.annee_fin}</p>}
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#1a1f1e]/5">
                <button type="button" onClick={resetForm} className="px-6 py-3 text-sm font-bold text-[#1a1f1e]/40 hover:text-[#1a1f1e]">{t('candidate_settings.education.cancel_button')}</button>
                <button type="submit" disabled={form.processing || !form.isDirty} className="bg-[#1a1f1e] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-[#343a38] disabled:cursor-not-allowed disabled:opacity-40">
                  <Icon name="CheckCircle2" size={16} />
                  {editingId ? t('candidate_settings.education.update_button') : t('candidate_settings.education.add_button')}
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
                  className="bg-white rounded-[24px] border border-[#1a1f1e]/10 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all hover:border-[#1a1f1e]/20"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-2xl bg-[#1a1f1e]/5 flex items-center justify-center text-[#1a1f1e]">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg">{getTaxonomyLabel(f.formation_juridique_id, formationJuridiques)} {t('candidate_settings.education.in')} {getTaxonomyLabel(f.specialisation_id, specialisations)}</h4>
                      <p className="text-xs sm:text-sm font-medium text-[#1a1f1e]/40 uppercase tracking-widest">{getTaxonomyLabel(f.ecole_id, ecoles)}</p>
                      <p className="text-xs font-bold text-[#1a1f1e]/30 mt-1">{f.annee_debut} — {f.annee_fin || t('candidate_settings.education.not_applicable')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
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
                <p className="text-[#1a1f1e]/30 font-bold italic">{t('candidate_settings.education.no_education')}</p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

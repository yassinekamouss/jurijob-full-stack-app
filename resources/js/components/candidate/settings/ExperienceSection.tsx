import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Briefcase, Plus, Trash2, X, Calendar, CheckCircle2 } from 'lucide-react';
import Icon from '@/components/signup/FormularIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import { useTranslation } from 'react-i18next';
import { store, update, destroy } from '@/routes/candidate/experiences';

interface Props {
  experiences: any[];
}

export default function ExperienceSection({ experiences }: Props) {
  const { t } = useTranslation();
  const { postes, typeTravails } = useTaxonomies();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm({
    poste_id: '',
    entreprise: '',
    debut: '',
    fin: '',
    type_travail_id: '',
  });

  const resetForm = () => {
    form.reset();
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (exp: any) => {
    form.setData({
      poste_id: exp.poste_id,
      entreprise: exp.entreprise,
      debut: exp.debut,
      fin: exp.fin || '',
      type_travail_id: exp.type_travail_id || '',
    });
    setEditingId(exp.id);
    setIsAdding(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.data.debut && form.data.fin && form.data.fin < form.data.debut) {
      form.setError('fin', t('candidate_settings.experience.date_error'));
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
    if (confirm(t('candidate_settings.experience.delete_confirm'))) {
      form.delete(destroy(id).url);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif italic mb-1">{t('candidate_settings.experience.title')}</h3>
          <p className="text-sm text-[#1a1f1e]/50 font-medium">{t('candidate_settings.experience.description')}</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[#1a1f1e] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#343a38] transition-all"
          >
            <Plus className="h-4 w-4" />
            {t('candidate_settings.experience.add_button')}
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
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.experience.labels.job')}</label>
                  <select
                    value={form.data.poste_id}
                    onChange={e => form.setData('poste_id', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">{t('candidate_settings.experience.placeholders.job')}</option>
                    {useLoadingTaxonomy(postes) ? (
                      <option disabled>{t('candidate_settings.experience.loading')}</option>
                    ) : (
                      postes.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.poste_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.poste_id}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.experience.labels.company')}</label>
                  <input
                    type="text"
                    value={form.data.entreprise}
                    onChange={e => form.setData('entreprise', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none"
                    placeholder={t('candidate_settings.experience.placeholders.company')}
                    required
                  />
                  {form.errors.entreprise && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.entreprise}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.experience.labels.contract_type')}</label>
                  <select
                    value={form.data.type_travail_id}
                    onChange={e => form.setData('type_travail_id', e.target.value)}
                    className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">{t('candidate_settings.experience.placeholders.contract_type')}</option>
                    {useLoadingTaxonomy(typeTravails) ? (
                      <option disabled>{t('candidate_settings.experience.loading')}</option>
                    ) : (
                      typeTravails.map(opt => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                  </select>
                  {form.errors.type_travail_id && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.type_travail_id}</p>}
                </div>
                <div className="hidden sm:block" /> {/** Spacer */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.experience.labels.start_date')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30 pointer-events-none" />
                    <input
                      type="month"
                      value={form.data.debut}
                      onChange={e => form.setData('debut', e.target.value)}
                      onClick={(e) => e.currentTarget.showPicker()}
                      className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none cursor-pointer"
                      required
                    />
                  </div>
                  {form.errors.debut && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.debut}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">{t('candidate_settings.experience.labels.end_date')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30 pointer-events-none" />
                    <input
                      type="month"
                      value={form.data.fin}
                      onChange={e => form.setData('fin', e.target.value)}
                      onClick={(e) => e.currentTarget.showPicker()}
                      className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none cursor-pointer"
                    />
                  </div>
                  {form.errors.fin && <p className="text-xs text-red-500 font-bold ml-1">{form.errors.fin}</p>}
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#1a1f1e]/5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-sm font-bold text-[#1a1f1e]/40 hover:text-[#1a1f1e] transition-all"
                >
                  {t('candidate_settings.experience.cancel_button')}
                </button>
                <button
                  type="submit"
                  disabled={form.processing || !form.isDirty}
                  className="bg-[#1a1f1e] text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#343a38] transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {editingId ? t('candidate_settings.experience.update_button') : t('candidate_settings.experience.add_button')}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-[24px] border border-[#1a1f1e]/10 p-6 flex items-center justify-between group transition-all hover:border-[#1a1f1e]/20 hover:shadow-sm"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-[#1a1f1e]/5 flex items-center justify-center text-[#1a1f1e]">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{getTaxonomyLabel(exp.poste_id, postes)}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#1a1f1e]/40 uppercase tracking-widest">{exp.entreprise}</p>
                        <span className="h-1 w-1 rounded-full bg-[#1a1f1e]/20" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#C06041]">{getTaxonomyLabel(exp.type_travail_id, typeTravails)}</p>
                      </div>
                      <p className="text-xs font-bold text-[#1a1f1e]/30 mt-1">{exp.debut} — {exp.fin || t('candidate_settings.experience.present')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 rounded-xl border border-[#1a1f1e]/10 text-[#1a1f1e]/40 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 transition-all"
                    >
                      <Icon name="Pencil" size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2 rounded-xl border border-red-100 text-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 rounded-[32px] border-2 border-dashed border-[#1a1f1e]/10">
                <p className="text-[#1a1f1e]/30 font-bold italic">{t('candidate_settings.experience.no_experience')}</p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

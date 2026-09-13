import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import {
    GraduationCap,
    Plus,
    Trash2,
    Calendar,
    Upload,
    FileText,
} from 'lucide-react';
import Icon from '@/components/signup/FormularIcons';
import { motion, AnimatePresence } from 'framer-motion';
import {
    useTaxonomies,
    useLoadingTaxonomy,
    getTaxonomyLabel,
} from '@/hooks/use-taxonomies';
import { useTranslation } from 'react-i18next';
import { diploma as candidateDiploma } from '@/routes/candidate';
import { store, update, destroy } from '@/routes/candidate/formations';

const MAX_DIPLOMA_SIZE = 5 * 1024 * 1024;

interface Props {
    formations: any[];
}

const COUNTRY_FLAGS: Record<string, string> = {
    MA: '🇲🇦',
    FR: '🇫🇷',
    BE: '🇧🇪',
    SN: '🇸🇳',
    CI: '🇨🇮',
    CM: '🇨🇲',
    ML: '🇲🇱',
    BF: '🇧🇫',
    BJ: '🇧🇯',
    TG: '🇹🇬',
    NE: '🇳🇪',
    GA: '🇬🇦',
    CG: '🇨🇬',
    CD: '🇨🇩',
    GN: '🇬🇳',
    MR: '🇲🇷',
    MG: '🇲🇬',
    TN: '🇹🇳',
    DZ: '🇩🇿',
    RW: '🇷🇼',
    KE: '🇰🇪',
    ZA: '🇿🇦',
};

export default function FormationSection({ formations }: Props) {
    const { t } = useTranslation();
    const { ecoles, formationJuridiques, specialisations, pays } =
        useTaxonomies();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedPaysId, setSelectedPaysId] = useState<number | string>('');

    const form = useForm({
        formation_juridique_id: '',
        specialisation_id: '',
        ecole_id: '',
        autre_ecole: '',
        annee_debut: '',
        annee_fin: '',
        diploma_file: null as File | null,
    });

    const handleDiplomaFile = (file: File | null) => {
        if (!file) {
            form.setData('diploma_file', null);

            return;
        }

        if (file.type !== 'application/pdf') {
            alert(t('auth.validation.diploma_invalid_type'));

            return;
        }

        if (file.size > MAX_DIPLOMA_SIZE) {
            alert(t('auth.validation.diploma_too_large'));

            return;
        }

        form.setData('diploma_file', file);
    };

    const resetForm = () => {
        form.reset();
        setIsAdding(false);
        setEditingId(null);
        setSelectedPaysId('');
    };

    const handleEdit = (formItem: any) => {
        let currentPaysId: string | number = '';
        if (formItem.ecole_id) {
            const ecole = ecoles.find((e: any) => e.id === formItem.ecole_id);
            if (ecole && ecole.pays_id !== undefined && ecole.pays_id !== null) {
                currentPaysId = ecole.pays_id;
            }
        } else if (formItem.autre_ecole) {
            currentPaysId = 'other_country';
        }

        form.setData({
            formation_juridique_id: formItem.formation_juridique_id,
            specialisation_id: formItem.specialisation_id,
            ecole_id:
                formItem.ecole_id || (formItem.autre_ecole ? 'other' : ''),
            autre_ecole: formItem.autre_ecole || '',
            annee_debut: formItem.annee_debut,
            annee_fin: formItem.annee_fin || '',
            diploma_file: null,
        });
        setEditingId(formItem.id);
        setSelectedPaysId(currentPaysId);
        setIsAdding(false);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            form.data.annee_debut &&
            form.data.annee_fin &&
            form.data.annee_fin < form.data.annee_debut
        ) {
            form.setError(
                'annee_fin',
                t('candidate_settings.education.date_error'),
            );
            return;
        }

        const data = {
            ...form.data,
            ecole_id:
                form.data.ecole_id === 'other' ? null : form.data.ecole_id,
            autre_ecole:
                form.data.ecole_id === 'other' ? form.data.autre_ecole : null,
            diploma_file: form.data.diploma_file ?? undefined,
        };

        const options = {
            onSuccess: () => resetForm(),
        };

        if (editingId) {
            if (data.diploma_file) {
                form.transform(() => ({ ...data, _method: 'PUT' }));
                form.post(update(editingId).url, {
                    ...options,
                    forceFormData: true as const,
                });
            } else {
                form.transform(() => data);
                form.put(update(editingId).url, options);
            }
        } else {
            form.transform(() => data);
            form.post(store().url, {
                ...options,
                forceFormData: true as const,
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
                    <h3 className="mb-1 font-serif text-xl font-bold italic">
                        {t('candidate_settings.education.title')}
                    </h3>
                    <p className="text-sm font-medium text-[#1a1f1e]/50">
                        {t('candidate_settings.education.description')}
                    </p>
                </div>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 rounded-xl bg-[#1a1f1e] px-4 py-2 text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-[#343a38]"
                    >
                        <Plus className="h-4 w-4" />
                        {t('candidate_settings.education.add_button')}
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {isAdding || editingId ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4 rounded-[28px] border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-6 sm:p-8"
                    >
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                        {t(
                                            'candidate_settings.education.labels.level',
                                        )}
                                    </label>
                                    <select
                                        value={form.data.formation_juridique_id}
                                        onChange={(e) =>
                                            form.setData(
                                                'formation_juridique_id',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                        required
                                    >
                                        <option value="">
                                            {t(
                                                'candidate_settings.education.placeholders.level',
                                            )}
                                        </option>
                                        {useLoadingTaxonomy(
                                            formationJuridiques,
                                        ) ? (
                                            <option disabled>
                                                {t(
                                                    'candidate_settings.education.loading',
                                                )}
                                            </option>
                                        ) : (
                                            formationJuridiques.map((opt) => (
                                                <option
                                                    key={opt.id}
                                                    value={opt.id}
                                                >
                                                    {opt.nom}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    {form.errors.formation_juridique_id && (
                                        <p className="ml-1 text-xs font-bold text-red-500">
                                            {form.errors.formation_juridique_id}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                        {t(
                                            'candidate_settings.education.labels.field',
                                        )}
                                    </label>
                                    <select
                                        value={form.data.specialisation_id}
                                        onChange={(e) =>
                                            form.setData(
                                                'specialisation_id',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                        required
                                    >
                                        <option value="">
                                            {t(
                                                'candidate_settings.education.placeholders.field',
                                            )}
                                        </option>
                                        {useLoadingTaxonomy(specialisations) ? (
                                            <option disabled>
                                                {t(
                                                    'candidate_settings.education.loading',
                                                )}
                                            </option>
                                        ) : (
                                            specialisations.map((opt) => (
                                                <option
                                                    key={opt.id}
                                                    value={opt.id}
                                                >
                                                    {opt.nom}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    {form.errors.specialisation_id && (
                                        <p className="ml-1 text-xs font-bold text-red-500">
                                            {form.errors.specialisation_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                        {t(
                                            'candidate_settings.education.labels.country',
                                            'Pays',
                                        )}
                                    </label>
                                    <select
                                        value={selectedPaysId}
                                        onChange={(e) => {
                                            setSelectedPaysId(e.target.value);
                                            form.setData('ecole_id', '');
                                        }}
                                        className="w-full cursor-pointer appearance-none rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                        required
                                    >
                                        <option value="">
                                            {t(
                                                'candidate_settings.education.placeholders.country',
                                                'Sélectionnez un pays',
                                            )}
                                        </option>
                                        {useLoadingTaxonomy(pays) ? (
                                            <option disabled>
                                                {t(
                                                    'candidate_settings.education.loading',
                                                )}
                                            </option>
                                        ) : (
                                            <>
                                                {pays.map((p) => (
                                                    <option
                                                        key={p.id}
                                                        value={p.id}
                                                    >
                                                        {(p.code &&
                                                            COUNTRY_FLAGS[
                                                                p.code
                                                            ]) ||
                                                            '🌍'}{' '}
                                                        {p.nom}
                                                    </option>
                                                ))}
                                                <option value="other_country">
                                                    {t(
                                                        'common.other_specify',
                                                    ) || 'Autre (préciser...)'}
                                                </option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                <AnimatePresence mode="wait">
                                    {selectedPaysId && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="space-y-2"
                                        >
                                            <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                {t(
                                                    'candidate_settings.education.labels.school',
                                                )}
                                            </label>
                                            {selectedPaysId ===
                                            'other_country' ? (
                                                <input
                                                    type="text"
                                                    placeholder={
                                                        t(
                                                            'common.other_school_placeholder',
                                                        ) ||
                                                        'Nom de votre école/université'
                                                    }
                                                    value={
                                                        form.data.autre_ecole
                                                    }
                                                    onChange={(e) => {
                                                        form.setData(
                                                            (data) => ({
                                                                ...data,
                                                                ecole_id:
                                                                    'other',
                                                                autre_ecole:
                                                                    e.target
                                                                        .value,
                                                            }),
                                                        );
                                                    }}
                                                    className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                    required
                                                />
                                            ) : (
                                                <select
                                                    value={form.data.ecole_id}
                                                    onChange={(e) => {
                                                        const val =
                                                            e.target.value;
                                                        form.setData(
                                                            (data) => ({
                                                                ...data,
                                                                ecole_id: val,
                                                                autre_ecole:
                                                                    val ===
                                                                    'other'
                                                                        ? data.autre_ecole
                                                                        : '',
                                                            }),
                                                        );
                                                    }}
                                                    className="w-full cursor-pointer appearance-none rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                    required
                                                >
                                                    <option value="">
                                                        {t(
                                                            'candidate_settings.education.placeholders.school',
                                                        )}
                                                    </option>
                                                    {useLoadingTaxonomy(
                                                        ecoles,
                                                    ) ? (
                                                        <option disabled>
                                                            {t(
                                                                'candidate_settings.education.loading',
                                                            )}
                                                        </option>
                                                    ) : (
                                                        <>
                                                            {ecoles
                                                                .filter(
                                                                    (e: any) =>
                                                                        e.pays_id.toString() ===
                                                                        selectedPaysId.toString(),
                                                                )
                                                                .map((opt) => (
                                                                    <option
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                        value={
                                                                            opt.id
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.nom
                                                                        }
                                                                    </option>
                                                                ))}
                                                            <option value="other">
                                                                {t(
                                                                    'common.other_specify',
                                                                ) ||
                                                                    'Autre (préciser...)'}
                                                            </option>
                                                        </>
                                                    )}
                                                </select>
                                            )}
                                            {form.errors.ecole_id && (
                                                <p className="ml-1 text-xs font-bold text-red-500">
                                                    {form.errors.ecole_id}
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence>
                                {selectedPaysId &&
                                    selectedPaysId !== 'other_country' &&
                                    form.data.ecole_id === 'other' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-2 space-y-2"
                                        >
                                            <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                {t(
                                                    'candidate_settings.education.labels.other_school',
                                                    "Nom de l'établissement",
                                                )}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={
                                                    t(
                                                        'common.other_school_placeholder',
                                                    ) ||
                                                    'Nom de votre école/université'
                                                }
                                                value={form.data.autre_ecole}
                                                onChange={(e) =>
                                                    form.setData(
                                                        'autre_ecole',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                required
                                            />
                                            {form.errors.autre_ecole && (
                                                <p className="mt-1 ml-1 text-xs font-bold text-red-500">
                                                    {form.errors.autre_ecole}
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                        {t(
                                            'candidate_settings.education.labels.start_year',
                                        )}
                                    </label>
                                    <div className="relative">
                                        <Calendar className="pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                        <input
                                            type="month"
                                            value={form.data.annee_debut || ''}
                                            onChange={(e) =>
                                                form.setData(
                                                    'annee_debut',
                                                    e.target.value,
                                                )
                                            }
                                            onClick={(e) =>
                                                e.currentTarget.showPicker()
                                            }
                                            className="w-full cursor-pointer rounded-2xl border border-[#1a1f1e]/10 bg-white py-4 pr-5 pl-12 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                            required
                                        />
                                    </div>
                                    {form.errors.annee_debut && (
                                        <p className="ml-1 text-xs font-bold text-red-500">
                                            {form.errors.annee_debut}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                        {t(
                                            'candidate_settings.education.labels.end_year',
                                        )}
                                    </label>
                                    <div className="relative">
                                        <Calendar className="pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                        <input
                                            type="month"
                                            value={form.data.annee_fin || ''}
                                            onChange={(e) =>
                                                form.setData(
                                                    'annee_fin',
                                                    e.target.value,
                                                )
                                            }
                                            onClick={(e) =>
                                                e.currentTarget.showPicker()
                                            }
                                            className="w-full cursor-pointer rounded-2xl border border-[#1a1f1e]/10 bg-white py-4 pr-5 pl-12 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                        />
                                    </div>
                                    {form.errors.annee_fin && (
                                        <p className="ml-1 text-xs font-bold text-red-500">
                                            {form.errors.annee_fin}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                    {t('auth.forms.candidate.diploma_label')}
                                </label>
                                <p className="ml-1 text-xs font-medium text-[#1a1f1e]/40">
                                    {t('auth.forms.candidate.diploma_help')}
                                </p>
                                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#1a1f1e]/15 bg-white px-5 py-4 transition-all hover:border-[#C06041]">
                                    <Upload className="h-4 w-4 shrink-0 text-[#1a1f1e]/30" />
                                    <span className="truncate text-sm font-bold text-[#1a1f1e]/50">
                                        {form.data.diploma_file
                                            ? form.data.diploma_file.name
                                            : t(
                                                  'auth.forms.candidate.diploma_placeholder',
                                              )}
                                    </span>
                                    <input
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                            handleDiplomaFile(
                                                e.target.files?.[0] ?? null,
                                            );
                                            e.currentTarget.value = '';
                                        }}
                                    />
                                </label>
                                {form.data.diploma_file && (
                                    <button
                                        type="button"
                                        onClick={() => handleDiplomaFile(null)}
                                        className="ml-1 inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />{' '}
                                        {t(
                                            'auth.forms.candidate.diploma_remove',
                                        )}
                                    </button>
                                )}
                                {form.errors.diploma_file && (
                                    <p className="ml-1 text-xs font-bold text-red-500">
                                        {form.errors.diploma_file}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-4 border-t border-[#1a1f1e]/5 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 text-sm font-bold text-[#1a1f1e]/40 hover:text-[#1a1f1e]"
                                >
                                    {t(
                                        'candidate_settings.education.cancel_button',
                                    )}
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing || !form.isDirty}
                                    className="flex items-center gap-2 rounded-full bg-[#1a1f1e] px-8 py-3 text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-[#343a38] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Icon name="CheckCircle2" size={16} />
                                    {editingId
                                        ? t(
                                              'candidate_settings.education.update_button',
                                          )
                                        : t(
                                              'candidate_settings.education.add_button',
                                          )}
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
                                    className="group flex flex-col justify-between gap-4 rounded-[24px] border border-[#1a1f1e]/10 bg-white p-4 transition-all hover:border-[#1a1f1e]/20 sm:flex-row sm:items-center sm:p-6"
                                >
                                    <div className="flex items-start gap-4 sm:items-center sm:gap-6">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1a1f1e]/5 text-[#1a1f1e] sm:h-12 sm:w-12">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold sm:text-lg">
                                                {getTaxonomyLabel(
                                                    f.formation_juridique_id,
                                                    formationJuridiques,
                                                )}{' '}
                                                {t(
                                                    'candidate_settings.education.in',
                                                )}{' '}
                                                {getTaxonomyLabel(
                                                    f.specialisation_id,
                                                    specialisations,
                                                )}
                                            </h4>
                                            <p className="text-xs font-medium tracking-widest text-[#1a1f1e]/40 uppercase sm:text-sm">
                                                {f.ecole_id
                                                    ? getTaxonomyLabel(
                                                          f.ecole_id,
                                                          ecoles,
                                                      )
                                                    : f.autre_ecole}
                                            </p>
                                            <p className="mt-1 text-xs font-bold text-[#1a1f1e]/30">
                                                {f.annee_debut} —{' '}
                                                {f.annee_fin ||
                                                    t(
                                                        'candidate_settings.education.not_applicable',
                                                    )}
                                            </p>
                                            <a
                                                href={
                                                    candidateDiploma({
                                                        formation: f.id,
                                                    }).url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`mt-2 inline-flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase ${f.has_diploma ? 'text-[#C06041] hover:text-[#a84e33]' : 'pointer-events-none text-[#1a1f1e]/30'}`}
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                                {f.has_diploma
                                                    ? t(
                                                          'candidate_settings.education.view_diploma',
                                                      )
                                                    : t(
                                                          'candidate_settings.education.no_diploma',
                                                      )}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 self-end transition-opacity sm:self-center sm:opacity-0 sm:group-hover:opacity-100">
                                        <button
                                            onClick={() => handleEdit(f)}
                                            className="rounded-xl border border-[#1a1f1e]/10 p-2 text-[#1a1f1e]/40 hover:bg-[#1a1f1e]/5 hover:text-[#1a1f1e]"
                                        >
                                            <Icon name="Pencil" size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(f.id)}
                                            className="rounded-xl border border-red-100 p-2 text-red-300 hover:bg-red-50 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="rounded-[32px] border-2 border-dashed border-[#1a1f1e]/10 py-12 text-center">
                                <p className="font-bold text-[#1a1f1e]/30 italic">
                                    {t(
                                        'candidate_settings.education.no_education',
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, GraduationCap, Briefcase, FileText, Calendar, Building2, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandidatFormData, Formation, Experience } from '@/types';
import Icon from '@/components/signup/FormularIcons';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';

type CandidatDetailsProps = {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: unknown) => void;
    errors: Record<string, string>;
    className?: string;
};

const createEmptyFormation = (): Formation => ({
    id: crypto.randomUUID(),
    annee_debut: '',
    annee_fin: '',
    formation_juridique_id: '',
    specialisation_id: '',
    ecole_id: '',
});

const createEmptyExperience = (): Experience => ({
    id: crypto.randomUUID(),
    debut: '',
    fin: '',
    type_travail_id: '',
    entreprise: '',
    poste_id: '',
});

export default function CandidatDetails({
    formData,
    onFieldChange,
    errors = {},
    className = '',
}: CandidatDetailsProps) {
    const { t } = useTranslation();
    const { ecoles, formationJuridiques, specialisations, typeTravails, postes } = useTaxonomies();

    const formations = formData.formations || [];
    const experiences = formData.experiences || [];

    const [expandedFormations, setExpandedFormations] = useState<Record<string, boolean>>({});
    const [expandedExperiences, setExpandedExperiences] = useState<Record<string, boolean>>({});

    const toggleFormation = (id: string) =>
        setExpandedFormations((prev) => ({ ...prev, [id]: prev[id] === false }));
    const toggleExperience = (id: string) =>
        setExpandedExperiences((prev) => ({ ...prev, [id]: prev[id] === false }));

    const updateFormation = (id: string, field: keyof Formation, value: string | number) =>
        onFieldChange(
            'formations',
            formations.map((formation) => (formation.id === id ? { ...formation, [field]: value } : formation)),
        );

    const updateExperience = (id: string, field: keyof Experience, value: string | number) =>
        onFieldChange(
            'experiences',
            experiences.map((experience) => (experience.id === id ? { ...experience, [field]: value } : experience)),
        );

    const inputClasses =
        'w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900';
    const labelClasses = 'flex items-center gap-2 text-xs font-bold tracking-tight text-slate-700 uppercase';

    return (
        <div className={`space-y-12 pb-10 ${className}`}>
            <div className="mb-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-slate-900">{t('auth.forms.candidate.details_title')}</h3>
                <p className="text-sm text-slate-500">{t('auth.forms.candidate.details_subtitle')}</p>
            </div>

            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-900 p-2 text-white shadow-sm">
                            <GraduationCap size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">{t('auth.forms.candidate.formations_header')}</h4>
                    </div>
                    <button
                        type="button"
                        onClick={() => onFieldChange('formations', [...formations, createEmptyFormation()])}
                        className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase shadow-md transition-all hover:bg-slate-800 active:scale-95"
                    >
                        <Plus size={16} /> {t('auth.forms.candidate.add')}
                    </button>
                </div>

                {errors.formations && (
                    <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-xs font-bold text-red-600">
                        {errors.formations}
                    </div>
                )}

                <div className="space-y-4">
                    <AnimatePresence>
                        {formations.map((formation) => {
                            const formationIndex = formations.findIndex((item) => item.id === formation.id);

                            return (
                                <motion.div
                                    key={formation.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-4 flex items-center justify-between border-b border-slate-50 pb-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => toggleFormation(formation.id)}
                                                className="text-slate-400 transition-colors hover:text-slate-900"
                                            >
                                                {expandedFormations[formation.id] !== false ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </button>
                                            <h5 className="max-w-[200px] truncate font-bold text-slate-900 sm:max-w-md">
                                                {formation.specialisation_id || formation.ecole_id
                                                    ? `${getTaxonomyLabel(formation.specialisation_id, specialisations)} – ${getTaxonomyLabel(formation.ecole_id, ecoles)}`
                                                    : t('auth.forms.candidate.new_formation')}
                                            </h5>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onFieldChange(
                                                    'formations',
                                                    formations.filter((item) => item.id !== formation.id),
                                                )
                                            }
                                            className="p-2 text-slate-300 transition-colors hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {expandedFormations[formation.id] !== false && (
                                        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
                                            <div className="space-y-5">
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>
                                                        <Building2 size={14} className="text-slate-400" /> {t('auth.forms.candidate.school_label')}
                                                    </label>
                                                    <select
                                                        value={formation.ecole_id}
                                                        onChange={(event) =>
                                                            updateFormation(formation.id, 'ecole_id', event.target.value)
                                                        }
                                                        className={inputClasses}
                                                    >
                                                        <option value="">{t('auth.forms.candidate.school_placeholder')}</option>
                                                        {useLoadingTaxonomy(ecoles) ? (
                                                            <option disabled>{t('auth.forms.loading_options')}</option>
                                                        ) : (
                                                            ecoles.map((ecole) => (
                                                                <option key={ecole.id} value={ecole.id}>
                                                                    {getTaxonomyLabel(ecole)}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>
                                                        <BookOpen size={14} className="text-slate-400" /> {t('auth.forms.candidate.degree_level_label')}
                                                    </label>
                                                    <select
                                                        value={formation.formation_juridique_id}
                                                        onChange={(event) =>
                                                            updateFormation(
                                                                formation.id,
                                                                'formation_juridique_id',
                                                                event.target.value,
                                                            )
                                                        }
                                                        className={inputClasses}
                                                    >
                                                        <option value="">{t('auth.forms.candidate.degree_level_placeholder')}</option>
                                                        {useLoadingTaxonomy(formationJuridiques) ? (
                                                            <option disabled>{t('auth.forms.loading_options')}</option>
                                                        ) : (
                                                            formationJuridiques.map((niveau) => (
                                                                <option key={niveau.id} value={niveau.id}>
                                                                    {getTaxonomyLabel(niveau)}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-5">
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>
                                                        <FileText size={14} className="text-slate-400" /> {t('auth.forms.candidate.domain_label')}
                                                    </label>
                                                    <select
                                                        value={formation.specialisation_id}
                                                        onChange={(event) =>
                                                            updateFormation(
                                                                formation.id,
                                                                'specialisation_id',
                                                                event.target.value,
                                                            )
                                                        }
                                                        className={inputClasses}
                                                    >
                                                        <option value="">{t('auth.forms.candidate.domain_placeholder')}</option>
                                                        {useLoadingTaxonomy(specialisations) ? (
                                                            <option disabled>{t('auth.forms.loading_options')}</option>
                                                        ) : (
                                                            specialisations.map((domaine) => (
                                                                <option key={domaine.id} value={domaine.id}>
                                                                    {getTaxonomyLabel(domaine)}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className={labelClasses}>{t('auth.forms.candidate.start_date')}</label>
                                                        <div className="relative">
                                                            <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                            <input
                                                                type="month"
                                                                value={formation.annee_debut}
                                                                onChange={(event) =>
                                                                    updateFormation(
                                                                        formation.id,
                                                                        'annee_debut',
                                                                        event.target.value,
                                                                    )
                                                                }
                                                                onClick={(event) => event.currentTarget.showPicker()}
                                                                className={`${inputClasses} cursor-pointer pl-10 ${errors[`formations.${formationIndex}.annee_debut`] ? 'border-red-500' : ''}`}
                                                            />
                                                        </div>
                                                        {errors[`formations.${formationIndex}.annee_debut`] && (
                                                            <p className="mt-1 text-[10px] font-bold text-red-500">
                                                                {errors[`formations.${formationIndex}.annee_debut`]}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className={labelClasses}>{t('auth.forms.candidate.end_date')}</label>
                                                        <div className="relative">
                                                            <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                            <input
                                                                type="month"
                                                                value={formation.annee_fin}
                                                                onChange={(event) =>
                                                                    updateFormation(
                                                                        formation.id,
                                                                        'annee_fin',
                                                                        event.target.value,
                                                                    )
                                                                }
                                                                onClick={(event) => event.currentTarget.showPicker()}
                                                                className={`${inputClasses} cursor-pointer pl-10 ${errors[`formations.${formationIndex}.annee_fin`] ? 'border-red-500' : ''}`}
                                                            />
                                                        </div>
                                                        {errors[`formations.${formationIndex}.annee_fin`] && (
                                                            <p className="mt-1 text-[10px] font-bold text-red-500">
                                                                {errors[`formations.${formationIndex}.annee_fin`]}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    {formations.length === 0 && (
                        <div className="rounded-[24px] border-2 border-dashed border-slate-100 bg-slate-50/50 py-10 text-center">
                            <Icon name="GraduationCap" size={32} className="mx-auto mb-3 text-slate-200" />
                            <p className="text-sm font-bold text-slate-400">{t('auth.forms.candidate.no_formation')}</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-900 p-2 text-white shadow-sm">
                            <Briefcase size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">{t('auth.forms.candidate.experiences_header')}</h4>
                    </div>
                    <button
                        type="button"
                        onClick={() => onFieldChange('experiences', [...experiences, createEmptyExperience()])}
                        className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase shadow-md transition-all hover:bg-slate-800 active:scale-95"
                    >
                        <Plus size={16} /> {t('auth.forms.candidate.add')}
                    </button>
                </div>

                {errors.experiences && (
                    <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-xs font-bold text-red-600">
                        {errors.experiences}
                    </div>
                )}

                <div className="space-y-4">
                    <AnimatePresence>
                        {experiences.map((experience) => {
                            const experienceIndex = experiences.findIndex((item) => item.id === experience.id);

                            return (
                                <motion.div
                                    key={experience.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-4 flex items-center justify-between border-b border-slate-50 pb-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => toggleExperience(experience.id)}
                                                className="text-slate-400 transition-colors hover:text-slate-900"
                                            >
                                                {expandedExperiences[experience.id] !== false ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </button>
                                            <h5 className="max-w-[200px] truncate font-bold text-slate-900 sm:max-w-md">
                                                {experience.poste_id || experience.entreprise
                                                    ? `${getTaxonomyLabel(experience.poste_id, postes)} @ ${experience.entreprise}`
                                                    : t('auth.forms.candidate.new_experience')}
                                            </h5>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onFieldChange(
                                                    'experiences',
                                                    experiences.filter((item) => item.id !== experience.id),
                                                )
                                            }
                                            className="p-2 text-slate-300 transition-colors hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {expandedExperiences[experience.id] !== false && (
                                        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
                                            <div className="space-y-5">
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>
                                                        <Building2 size={14} className="text-slate-400" /> {t('auth.forms.candidate.company_label')}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder={t('auth.forms.candidate.company_placeholder')}
                                                        value={experience.entreprise}
                                                        onChange={(event) =>
                                                            updateExperience(
                                                                experience.id,
                                                                'entreprise',
                                                                event.target.value,
                                                            )
                                                        }
                                                        className={inputClasses}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>
                                                        <FileText size={14} className="text-slate-400" /> {t('auth.forms.candidate.exp_type_label')}
                                                    </label>
                                                    <select
                                                        value={experience.type_travail_id}
                                                        onChange={(event) =>
                                                            updateExperience(
                                                                experience.id,
                                                                'type_travail_id',
                                                                event.target.value,
                                                            )
                                                        }
                                                        className={inputClasses}
                                                    >
                                                        <option value="">{t('auth.forms.candidate.exp_type_placeholder')}</option>
                                                        {useLoadingTaxonomy(typeTravails) ? (
                                                            <option disabled>{t('auth.forms.loading_options')}</option>
                                                        ) : (
                                                            typeTravails.map((type) => (
                                                                <option key={type.id} value={type.id}>
                                                                    {getTaxonomyLabel(type)}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-5">
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>
                                                        <Briefcase size={14} className="text-slate-400" /> {t('auth.forms.candidate.position_label')}
                                                    </label>
                                                    <select
                                                        value={experience.poste_id}
                                                        onChange={(event) =>
                                                            updateExperience(
                                                                experience.id,
                                                                'poste_id',
                                                                event.target.value,
                                                            )
                                                        }
                                                        className={inputClasses}
                                                    >
                                                        <option value="">{t('auth.forms.candidate.position_placeholder')}</option>
                                                        {useLoadingTaxonomy(postes) ? (
                                                            <option disabled>{t('auth.forms.loading_options')}</option>
                                                        ) : (
                                                            postes.map((poste) => (
                                                                <option key={poste.id} value={poste.id}>
                                                                    {getTaxonomyLabel(poste)}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className={labelClasses}>{t('auth.forms.candidate.start_date')}</label>
                                                        <div className="relative">
                                                            <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                            <input
                                                                type="month"
                                                                value={experience.debut}
                                                                onChange={(event) =>
                                                                    updateExperience(
                                                                        experience.id,
                                                                        'debut',
                                                                        event.target.value,
                                                                    )
                                                                }
                                                                onClick={(event) => event.currentTarget.showPicker()}
                                                                className={`${inputClasses} cursor-pointer pl-10 ${errors[`experiences.${experienceIndex}.debut`] ? 'border-red-500' : ''}`}
                                                            />
                                                        </div>
                                                        {errors[`experiences.${experienceIndex}.debut`] && (
                                                            <p className="mt-1 text-[10px] font-bold text-red-500">
                                                                {errors[`experiences.${experienceIndex}.debut`]}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className={labelClasses}>{t('auth.forms.candidate.end_date')}</label>
                                                        <div className="relative">
                                                            <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                            <input
                                                                type="month"
                                                                value={experience.fin}
                                                                onChange={(event) =>
                                                                    updateExperience(
                                                                        experience.id,
                                                                        'fin',
                                                                        event.target.value,
                                                                    )
                                                                }
                                                                onClick={(event) => event.currentTarget.showPicker()}
                                                                className={`${inputClasses} cursor-pointer pl-10 ${errors[`experiences.${experienceIndex}.fin`] ? 'border-red-500' : ''}`}
                                                            />
                                                        </div>
                                                        {errors[`experiences.${experienceIndex}.fin`] && (
                                                            <p className="mt-1 text-[10px] font-bold text-red-500">
                                                                {errors[`experiences.${experienceIndex}.fin`]}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    {experiences.length === 0 && (
                        <div className="rounded-[24px] border-2 border-dashed border-slate-100 bg-slate-50/50 py-10 text-center">
                            <Icon name="Briefcase" size={32} className="mx-auto mb-3 text-slate-200" />
                            <p className="text-sm font-bold text-slate-400">{t('auth.forms.candidate.no_experience')}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

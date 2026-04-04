import React from 'react';
import { Plus, Trash2, GraduationCap, Briefcase, FileText, Calendar, Building2, BookOpen, Upload, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandidatFormData, Formation, Experience } from '@/types';
import Icon from '@/components/signup/FormularIcons';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';

type CandidatDetailsProps = {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: any) => void;
    errors: Record<string, string>;
    className?: string;
}

const CandidatDetails: React.FC<CandidatDetailsProps> = ({ formData, onFieldChange, errors = {}, className = '' }) => {
    const { ecoles, formationJuridiques, specialisations, typeExperiences, postes } = useTaxonomies();
    
    const formations = formData.formations || [];
    const experiences = formData.experiences || [];

    const [expandedFormations, setExpandedFormations] = React.useState<Record<string, boolean>>({});
    const [expandedExperiences, setExpandedExperiences] = React.useState<Record<string, boolean>>({});

    const toggleFormation = (id: string) => setExpandedFormations((prev) => ({ ...prev, [id]: prev[id] === false ? true : false }));
    const toggleExperience = (id: string) => setExpandedExperiences((prev) => ({ ...prev, [id]: prev[id] === false ? true : false }));

    const addFormation = () => {
        const newFormation: Formation = { id: Math.random().toString(36).substr(2, 9), annee_debut: '', annee_fin: '', formation_juridique_id: '', specialisation_id: '', ecole_id: '', diploma_file: null };
        onFieldChange('formations', [...formations, newFormation]);
    };

    const removeFormation = (id: string) => onFieldChange('formations', formations.filter((f) => f.id !== id));

    const updateFormation = (id: string, field: keyof Formation, value: any) =>
        onFieldChange('formations', formations.map((f) => (f.id === id ? { ...f, [field]: value } : f)));

    const handleFileUpload = (id: string, file: File | null) => {
        if (file && file.type !== 'application/pdf') {
            alert('Veuillez sélectionner un fichier PDF uniquement.');
            return;
        }
        updateFormation(id, 'diploma_file', file);
    };

    const addExperience = () => {
        const newExperience: Experience = { id: Math.random().toString(36).substr(2, 9), debut: '', fin: '', type_experience_id: '', entreprise: '', poste_id: '' };
        onFieldChange('experiences', [...experiences, newExperience]);
    };

    const removeExperience = (id: string) => onFieldChange('experiences', experiences.filter((e) => e.id !== id));

    const updateExperience = (id: string, field: keyof Experience, value: any) =>
        onFieldChange('experiences', experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

    const inputClasses = "w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all text-sm placeholder:text-slate-400";
    const labelClasses = "text-xs font-bold text-slate-700 flex items-center gap-2 uppercase tracking-tight";

    return (
        <div className={`space-y-12 pb-10 ${className}`}>
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Détails du parcours</h3>
                <p className="text-sm text-slate-500">Renseignez vos formations et expériences marquantes</p>
            </div>

            {/* FORMATIONS */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg shadow-sm"><GraduationCap size={20} /></div>
                        <h4 className="text-lg font-bold text-slate-900">Formations</h4>
                    </div>
                    <button type="button" onClick={addFormation} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95">
                        <Plus size={16} /> Ajouter
                    </button>
                </div>

                {errors.formations && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">{errors.formations}</div>}

                <div className="space-y-4">
                    <AnimatePresence>
                        {formations.map((formation) => (
                            <motion.div key={formation.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative p-6 bg-white border border-slate-200 rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => toggleFormation(formation.id)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                            {expandedFormations[formation.id] !== false ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <h5 className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-md">
                                            {formation.specialisation_id || formation.ecole_id ? `${getTaxonomyLabel(formation.specialisation_id, specialisations)} – ${getTaxonomyLabel(formation.ecole_id, ecoles)}` : 'Nouvelle Formation'}
                                        </h5>
                                    </div>
                                    <button type="button" onClick={() => removeFormation(formation.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>

                                {expandedFormations[formation.id] !== false && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <div className="space-y-5">
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><Building2 size={14} className="text-slate-400" /> École / Université</label>
                                                <select value={formation.ecole_id} onChange={(e) => updateFormation(formation.id, 'ecole_id', e.target.value)} className={inputClasses}>
                                                    <option value="">Sélectionner une institution</option>
                                                    {useLoadingTaxonomy(ecoles) ? (
                                                        <option disabled>Chargement des options...</option>
                                                    ) : (
                                                        ecoles.map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)
                                                    )}
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><BookOpen size={14} className="text-slate-400" /> Niveau d'études</label>
                                                <select value={formation.formation_juridique_id} onChange={(e) => updateFormation(formation.id, 'formation_juridique_id', e.target.value)} className={inputClasses}>
                                                    <option value="">Sélectionner un niveau</option>
                                                    {useLoadingTaxonomy(formationJuridiques) ? (
                                                        <option disabled>Chargement des options...</option>
                                                    ) : (
                                                        formationJuridiques.map((n) => <option key={n.id} value={n.id}>{n.nom}</option>)
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><FileText size={14} className="text-slate-400" /> Domaine d'études</label>
                                                <select value={formation.specialisation_id} onChange={(e) => updateFormation(formation.id, 'specialisation_id', e.target.value)} className={inputClasses}>
                                                    <option value="">Sélectionner un domaine</option>
                                                    {useLoadingTaxonomy(specialisations) ? (
                                                        <option disabled>Chargement des options...</option>
                                                    ) : (
                                                        specialisations.map((d) => <option key={d.id} value={d.id}>{d.nom}</option>)
                                                    )}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>Début</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                                        <input 
                                                            type="month" 
                                                            value={formation.annee_debut} 
                                                            onChange={(e) => updateFormation(formation.id, 'annee_debut', e.target.value)} 
                                                            onClick={(e) => e.currentTarget.showPicker()}
                                                            className={`${inputClasses} pl-10 cursor-pointer ${errors[`formations.${formations.findIndex(f => f.id === formation.id)}.annee_debut`] ? 'border-red-500' : ''}`} 
                                                        />
                                                    </div>
                                                    {errors[`formations.${formations.findIndex(f => f.id === formation.id)}.annee_debut`] && <p className="text-[10px] text-red-500 font-bold mt-1">{errors[`formations.${formations.findIndex(f => f.id === formation.id)}.annee_debut`]}</p>}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>Fin</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                                        <input 
                                                            type="month" 
                                                            value={formation.annee_fin} 
                                                            onChange={(e) => updateFormation(formation.id, 'annee_fin', e.target.value)} 
                                                            onClick={(e) => e.currentTarget.showPicker()}
                                                            className={`${inputClasses} pl-10 cursor-pointer ${errors[`formations.${formations.findIndex(f => f.id === formation.id)}.annee_fin`] ? 'border-red-500' : ''}`} 
                                                        />
                                                    </div>
                                                    {errors[`formations.${formations.findIndex(f => f.id === formation.id)}.annee_fin`] && <p className="text-[10px] text-red-500 font-bold mt-1">{errors[`formations.${formations.findIndex(f => f.id === formation.id)}.annee_fin`]}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-tight mb-2 block">Diplôme (Format PDF)</label>
                                            <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-all duration-300 ${formation.diploma_file ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-400'}`}>
                                                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(formation.id, e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                <div className="flex items-center justify-center gap-4">
                                                    {formation.diploma_file ? (
                                                        <>
                                                            <div className="p-2 bg-slate-900 text-white rounded-lg"><FileText size={20} /></div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-bold text-slate-900 truncate">{formation.diploma_file.name}</p>
                                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{(formation.diploma_file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                            </div>
                                                            <button type="button" onClick={(e) => { e.preventDefault(); updateFormation(formation.id, 'diploma_file', null); }} className="relative z-20 p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><X size={16} /></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="p-2 bg-slate-50 text-slate-400 rounded-lg"><Upload size={20} /></div>
                                                            <span className="text-sm text-slate-500 font-bold">Téléverser le diplôme (PDF)</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {formations.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed rounded-[24px] border-slate-100 bg-slate-50/50">
                            <Icon name="GraduationCap" size={32} className="mx-auto text-slate-200 mb-3" />
                            <p className="text-sm text-slate-400 font-bold">Aucune formation ajoutée</p>
                        </div>
                    )}
                </div>
            </section>

            {/* EXPERIENCES */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg shadow-sm"><Briefcase size={20} /></div>
                        <h4 className="text-lg font-bold text-slate-900">Expériences</h4>
                    </div>
                    <button type="button" onClick={addExperience} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95">
                        <Plus size={16} /> Ajouter
                    </button>
                </div>

                {errors.experiences && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">{errors.experiences}</div>}

                <div className="space-y-4">
                    <AnimatePresence>
                        {experiences.map((exp) => (
                            <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative p-6 bg-white border border-slate-200 rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => toggleExperience(exp.id)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                            {expandedExperiences[exp.id] !== false ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <h5 className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-md">
                                            {exp.poste_id || exp.entreprise ? `${getTaxonomyLabel(exp.poste_id, postes)} @ ${exp.entreprise}` : 'Nouvelle Expérience'}
                                        </h5>
                                    </div>
                                    <button type="button" onClick={() => removeExperience(exp.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </div>

                                {expandedExperiences[exp.id] !== false && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <div className="space-y-5">
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><Building2 size={14} className="text-slate-400" /> Entreprise</label>
                                                <input type="text" placeholder="Ex: Cabinet Benjelloun" value={exp.entreprise} onChange={(e) => updateExperience(exp.id, 'entreprise', e.target.value)} className={inputClasses} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><FileText size={14} className="text-slate-400" /> Type d'expérience</label>
                                                <select value={exp.type_experience_id} onChange={(e) => updateExperience(exp.id, 'type_experience_id', e.target.value)} className={inputClasses}>
                                                    <option value="">Sélectionner un type</option>
                                                    {useLoadingTaxonomy(typeExperiences) ? (
                                                        <option disabled>Chargement des options...</option>
                                                    ) : (
                                                        typeExperiences.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-5">
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><Briefcase size={14} className="text-slate-400" /> Poste</label>
                                                <select value={exp.poste_id} onChange={(e) => updateExperience(exp.id, 'poste_id', e.target.value)} className={inputClasses}>
                                                    <option value="">Sélectionner un poste</option>
                                                    {useLoadingTaxonomy(postes) ? (
                                                        <option disabled>Chargement des options...</option>
                                                    ) : (
                                                        postes.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)
                                                    )}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>Début</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                                        <input 
                                                            type="month" 
                                                            value={exp.debut} 
                                                            onChange={(e) => updateExperience(exp.id, 'debut', e.target.value)} 
                                                            onClick={(e) => e.currentTarget.showPicker()}
                                                            className={`${inputClasses} pl-10 cursor-pointer ${errors[`experiences.${experiences.findIndex(e => e.id === exp.id)}.debut`] ? 'border-red-500' : ''}`} 
                                                        />
                                                    </div>
                                                    {errors[`experiences.${experiences.findIndex(e => e.id === exp.id)}.debut`] && <p className="text-[10px] text-red-500 font-bold mt-1">{errors[`experiences.${experiences.findIndex(e => e.id === exp.id)}.debut`]}</p>}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClasses}>Fin</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                                        <input 
                                                            type="month" 
                                                            value={exp.fin} 
                                                            onChange={(e) => updateExperience(exp.id, 'fin', e.target.value)} 
                                                            onClick={(e) => e.currentTarget.showPicker()}
                                                            className={`${inputClasses} pl-10 cursor-pointer ${errors[`experiences.${experiences.findIndex(e => e.id === exp.id)}.fin`] ? 'border-red-500' : ''}`} 
                                                        />
                                                    </div>
                                                    {errors[`experiences.${experiences.findIndex(e => e.id === exp.id)}.fin`] && <p className="text-[10px] text-red-500 font-bold mt-1">{errors[`experiences.${experiences.findIndex(e => e.id === exp.id)}.fin`]}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {experiences.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed rounded-[24px] border-slate-100 bg-slate-50/50">
                            <Icon name="Briefcase" size={32} className="mx-auto text-slate-200 mb-3" />
                            <p className="text-sm text-slate-400 font-bold">Aucune expérience ajoutée</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CandidatDetails;

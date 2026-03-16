import React from 'react';
import { Plus, Trash2, GraduationCap, Briefcase, FileText, Calendar, Building2, BookOpen, Upload, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formationsJuridiques, ecolesMaroc, specialisations, typesExperience, postes } from '@/constants/options';
import type { CandidatFormData, Formation, Experience } from '@/components/signup/FormCandidat';

interface CandidatDetailsProps {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: any) => void;
    errors: Partial<Record<keyof CandidatFormData, string>>;
    className?: string;
}

const CandidatDetails: React.FC<CandidatDetailsProps> = ({ formData, onFieldChange, errors = {}, className = '' }) => {
    const formations = formData.formations || [];
    const experiences = formData.experiences || [];

    const [expandedFormations, setExpandedFormations] = React.useState<Record<string, boolean>>({});
    const [expandedExperiences, setExpandedExperiences] = React.useState<Record<string, boolean>>({});

    const toggleFormation = (id: string) => setExpandedFormations((prev) => ({ ...prev, [id]: prev[id] === false ? true : false }));
    const toggleExperience = (id: string) => setExpandedExperiences((prev) => ({ ...prev, [id]: prev[id] === false ? true : false }));

    const addFormation = () => {
        const newFormation: Formation = { id: Math.random().toString(36).substr(2, 9), anneeDebut: '', anneeFin: '', niveau: '', domaine: '', ecole: '', diplomaFile: null };
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
        updateFormation(id, 'diplomaFile', file);
    };

    const addExperience = () => {
        const newExperience: Experience = { id: Math.random().toString(36).substr(2, 9), debut: '', fin: '', type: '', entreprise: '', poste: '' };
        onFieldChange('experiences', [...experiences, newExperience]);
    };

    const removeExperience = (id: string) => onFieldChange('experiences', experiences.filter((e) => e.id !== id));

    const updateExperience = (id: string, field: keyof Experience, value: any) =>
        onFieldChange('experiences', experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

    return (
        <div className={`max-w-4xl mx-auto p-2 space-y-12 pb-10 ${className}`}>
            <div className="text-center space-y-2 mb-8">
                <h3 className="text-lg font-semibold">Détails du parcours</h3>
                <p className="text-sm text-muted-foreground">Détaillez vos formations et expériences.</p>
            </div>

            {/* FORMATIONS */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><GraduationCap size={20} /></div>
                        <h4 className="text-xl font-semibold">Formations</h4>
                    </div>
                    <button type="button" onClick={addFormation} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-sm">
                        <Plus size={16} /> Ajouter
                    </button>
                </div>

                {errors.formations && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{errors.formations}</div>}

                <div className="grid gap-6">
                    <AnimatePresence>
                        {formations.map((formation) => (
                            <motion.div key={formation.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative p-5 bg-card border border-border rounded-2xl shadow-sm">
                                <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => toggleFormation(formation.id)} className="text-muted-foreground hover:text-foreground transition">
                                            {expandedFormations[formation.id] !== false ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <h5 className="font-medium">{formation.domaine || formation.ecole ? `${formation.domaine} – ${formation.ecole}` : 'Nouvelle Formation'}</h5>
                                    </div>
                                    <button type="button" onClick={() => removeFormation(formation.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>

                                {expandedFormations[formation.id] !== false && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium flex items-center gap-2"><Building2 size={14} className="text-muted-foreground" /> École / Université</label>
                                                <select value={formation.ecole} onChange={(e) => updateFormation(formation.id, 'ecole', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary focus:bg-card outline-none text-sm">
                                                    <option value="">Sélectionner une institution</option>
                                                    {ecolesMaroc.map((e) => <option key={e} value={e}>{e}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium flex items-center gap-2"><BookOpen size={14} className="text-muted-foreground" /> Niveau d'études</label>
                                                <select value={formation.niveau} onChange={(e) => updateFormation(formation.id, 'niveau', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary focus:bg-card outline-none text-sm">
                                                    <option value="">Sélectionner un niveau</option>
                                                    {formationsJuridiques.map((n) => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium flex items-center gap-2"><FileText size={14} className="text-muted-foreground" /> Domaine d'études</label>
                                                <select value={formation.domaine} onChange={(e) => updateFormation(formation.id, 'domaine', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary focus:bg-card outline-none text-sm">
                                                    <option value="">Sélectionner un domaine</option>
                                                    {specialisations.map((d) => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium flex items-center gap-2"><Calendar size={14} className="text-muted-foreground" /> Année Début</label>
                                                    <input type="number" min="1980" max="2030" placeholder="Année" value={formation.anneeDebut} onChange={(e) => updateFormation(formation.id, 'anneeDebut', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium flex items-center gap-2"><Calendar size={14} className="text-muted-foreground" /> Année Fin</label>
                                                    <input type="number" min="1980" max="2035" placeholder="Année" value={formation.anneeFin} onChange={(e) => updateFormation(formation.id, 'anneeFin', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="text-sm font-medium">Diplôme (Format PDF)</label>
                                            <div className={`relative border-2 border-dashed rounded-xl p-3 mt-1.5 transition-all ${formation.diplomaFile ? 'border-green-400 bg-green-50' : 'border-border bg-muted hover:border-muted-foreground'}`}>
                                                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(formation.id, e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                <div className="flex items-center justify-center gap-3">
                                                    {formation.diplomaFile ? (
                                                        <>
                                                            <div className="p-1.5 bg-green-100 text-green-600 rounded-lg"><FileText size={18} /></div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-medium text-green-800 truncate">{formation.diplomaFile.name}</p>
                                                                <p className="text-[10px] text-green-600">{(formation.diplomaFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                            </div>
                                                            <button type="button" onClick={(e) => { e.preventDefault(); updateFormation(formation.id, 'diplomaFile', null); }} className="relative z-20 p-1 hover:bg-green-100 rounded-full text-green-700"><X size={14} /></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload size={18} className="text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground font-medium">Glissez votre diplôme ou cliquez</span>
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
                        <div className="text-center py-6 border-2 border-dashed rounded-2xl border-border">
                            <p className="text-sm text-muted-foreground">Aucune formation ajoutée</p>
                        </div>
                    )}
                </div>
            </section>

            {/* EXPERIENCES */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Briefcase size={20} /></div>
                        <h4 className="text-xl font-semibold">Expériences</h4>
                    </div>
                    <button type="button" onClick={addExperience} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-sm">
                        <Plus size={16} /> Ajouter
                    </button>
                </div>

                {errors.experiences && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{errors.experiences}</div>}

                <div className="grid gap-6">
                    <AnimatePresence>
                        {experiences.map((exp) => (
                            <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative p-5 bg-card border border-border rounded-2xl shadow-sm">
                                <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => toggleExperience(exp.id)} className="text-muted-foreground hover:text-foreground transition">
                                            {expandedExperiences[exp.id] !== false ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <h5 className="font-medium">{exp.poste || exp.entreprise ? `${exp.poste} chez ${exp.entreprise}` : 'Nouvelle Expérience'}</h5>
                                    </div>
                                    <button type="button" onClick={() => removeExperience(exp.id)} className="p-2 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>

                                {expandedExperiences[exp.id] !== false && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium flex items-center gap-2"><Building2 size={14} className="text-muted-foreground" /> Entreprise</label>
                                                <input type="text" placeholder="Ex: Cabinet Benjelloun" value={exp.entreprise} onChange={(e) => updateExperience(exp.id, 'entreprise', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium flex items-center gap-2"><FileText size={14} className="text-muted-foreground" /> Type d'expérience</label>
                                                <select value={exp.type} onChange={(e) => updateExperience(exp.id, 'type', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm">
                                                    <option value="">Sélectionner un type</option>
                                                    {typesExperience.map((t) => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium flex items-center gap-2"><Briefcase size={14} className="text-muted-foreground" /> Poste</label>
                                                <select value={exp.poste} onChange={(e) => updateExperience(exp.id, 'poste', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm">
                                                    <option value="">Sélectionner un poste</option>
                                                    {postes.map((p) => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium flex items-center gap-2"><Calendar size={14} className="text-muted-foreground" /> Début</label>
                                                    <input type="month" value={exp.debut} onChange={(e) => updateExperience(exp.id, 'debut', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium flex items-center gap-2"><Calendar size={14} className="text-muted-foreground" /> Fin</label>
                                                    <input type="month" value={exp.fin} onChange={(e) => updateExperience(exp.id, 'fin', e.target.value)} className="w-full p-2.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {experiences.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed rounded-2xl border-border">
                            <p className="text-sm text-muted-foreground">Aucune expérience ajoutée</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CandidatDetails;

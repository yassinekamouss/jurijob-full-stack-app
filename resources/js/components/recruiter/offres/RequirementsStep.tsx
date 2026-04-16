import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Trash2, Info, ListFilter, Zap } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Requirement } from '@/types/offre';

interface Props {
    data: {
        requirements: Requirement[];
    };
    setData: (key: string, value: any) => void;
    errors: any;
    onNext: () => void;
    onPrev: () => void;
    taxonomies: any;
}

const categories = [
    { label: 'Localisations', key: 'villes', type: 'ville' },
    { label: 'Spécialisations', key: 'specialisations', type: 'specialisation' },
    { label: 'Langues souhaitées', key: 'langues', type: 'langue' },
    { label: 'Domaines d\'expérience', key: 'domaineExperiences', type: 'domaine_experience' },
    { label: 'Formations Juridiques', key: 'formationJuridiques', type: 'formation_juridique' },
];

const importanceLevels = [
    { label: 'Indispensable', value: 'indispensable', color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' },
    { label: 'Important', value: 'important', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
    { label: 'Souhaitable', value: 'souhaitable', color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { label: 'Facultatif', value: 'facultatif', color: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100' },
];

export default function RequirementsStep({ data, setData, errors, onNext, onPrev, taxonomies }: Props) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

    const addRequirement = (taxId: number, taxType: string) => {
        if (data.requirements.find((r: any) => r.taxonomy_id === taxId && r.taxonomy_type === taxType)) {
            return;
        }

        // Maintain existing operator if type already has requirements
        const existingForType = data.requirements.find(r => r.taxonomy_type === taxType);
        const operator = existingForType?.operator || 'OR';

        const newReq: Requirement = {
            taxonomy_id: taxId,
            taxonomy_type: taxType as any,
            importance: 'important',
            operator: operator as 'AND' | 'OR',
            requirements_data: taxType === 'langue' 
                ? { niveau_langue_id: taxonomies.niveauLangues[0]?.id || null } 
                : {}
        };

        setData('requirements', [...data.requirements, newReq]);
    };

    const removeRequirement = (taxId: number, taxType: string) => {
        setData('requirements', data.requirements.filter((r: any) => !(r.taxonomy_id === taxId && r.taxonomy_type === taxType)));
    };

    const updateImportance = (taxId: number, taxType: string, importance: string) => {
        setData('requirements', data.requirements.map((r: any) => 
            (r.taxonomy_id === taxId && r.taxonomy_type === taxType) 
            ? { ...r, importance } 
            : r
        ));
    };

    const updateOperator = (taxType: string, operator: 'AND' | 'OR') => {
        setData('requirements', data.requirements.map((r: any) => 
            r.taxonomy_type === taxType ? { ...r, operator } : r
        ));
    };

    const updateLevel = (taxId: number, taxType: string, niveauId: number) => {
        setData('requirements', data.requirements.map((r: any) => 
            (r.taxonomy_id === taxId && r.taxonomy_type === taxType) 
            ? { ...r, requirements_data: { ...r.requirements_data, niveau_langue_id: niveauId } } 
            : r
        ));
    };

    const getTaxonomyName = (taxId: number, categoryKey: string) => {
        const item = taxonomies[categoryKey]?.find((t: any) => t.id === taxId);
        return item?.nom || 'Inconnu';
    };

    // Group requirements by their category label
    const groupedRequirements = useMemo(() => {
        return categories.map(cat => ({
            ...cat,
            items: data.requirements.filter(r => r.taxonomy_type === cat.type)
        })).filter(g => g.items.length > 0);
    }, [data.requirements]);

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Selection Panel */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <ListFilter className="h-4 w-4 text-primary" />
                            </div>
                            <Label className="text-xl font-black tracking-tight text-[#1a1f1e]">1. Catégories</Label>
                        </div>
                        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                            {categories.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => setSelectedCategory(cat.key)}
                                    className={cn(
                                        "relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group",
                                        selectedCategory === cat.key 
                                        ? "bg-white shadow-sm ring-1 ring-slate-200 text-primary font-bold" 
                                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                                    )}
                                >
                                    <span className="text-[13px] font-bold uppercase tracking-wider">{cat.label}</span>
                                    {data.requirements.filter(r => r.taxonomy_type === cat.type).length > 0 && (
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-black h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                            {data.requirements.filter(r => r.taxonomy_type === cat.type).length}
                                        </Badge>
                                    )}
                                    {selectedCategory === cat.key && (
                                        <motion.div layoutId="activeCat" className="absolute left-0 w-1 h-6 bg-primary rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                <Zap className="h-4 w-4 text-orange-600" />
                            </div>
                            <Label className="text-xl font-black tracking-tight text-[#1a1f1e]">2. Valeurs</Label>
                        </div>
                        <div className="group">
                            <Select onValueChange={(val) => {
                                const cat = categories.find(c => c.key === selectedCategory);
                                if (cat) addRequirement(Number(val), cat.type);
                            }}>
                                <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-white shadow-sm hover:border-primary/50 transition-colors">
                                    <SelectValue placeholder={`Rechercher ${categories.find(c => c.key === selectedCategory)?.label}...`} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl p-2">
                                    {taxonomies[selectedCategory]?.map((item: any) => (
                                        <SelectItem key={item.id} value={String(item.id)} className="rounded-lg py-2.5">
                                            {item.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium px-2">
                            <Info className="h-3 w-3 inline mr-1 -mt-0.5" />
                            Cliquez sur une valeur pour l'ajouter à vos critères.
                        </p>
                    </section>
                </div>

                {/* Requirements Display */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-baseline justify-between mb-4">
                        <Label className="text-xl font-black tracking-tight text-[#1a1f1e]">Critères Actifs</Label>
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            Algorithme de Matching v2.0
                        </span>
                    </div>
                    
                    {data.requirements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[460px] border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50 p-12 text-center group transition-all duration-500 hover:bg-slate-50 hover:border-slate-200">
                            <div className="h-20 w-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ListFilter className="h-8 w-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-serif italic font-bold text-slate-900 mb-2">Construisez votre profil idéal</h3>
                            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                                Sélectionnez des compétences, des lieux ou des langues pour filtrer les meilleurs talents juridiques.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <AnimatePresence mode="popLayout">
                                {groupedRequirements.map((group) => (
                                    <motion.div 
                                        key={group.key}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="relative p-6 rounded-[32px] border border-slate-100 bg-white shadow-lg shadow-slate-200/50 space-y-6"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/10">
                                                    <span className="text-[10px] font-black">{group.items.length}</span>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">{group.label}</h4>
                                                    <p className="text-[11px] font-medium text-slate-400 italic">Configuration de la logique de groupe</p>
                                                </div>
                                            </div>

                                            {/* Logic Toggle */}
                                            {group.items.length > 1 && (
                                                <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                                                    {(['OR', 'AND'] as const).map((op) => (
                                                        <button
                                                            key={op}
                                                            onClick={() => updateOperator(group.type, op)}
                                                            className={cn(
                                                                "px-6 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all",
                                                                group.items[0].operator === op 
                                                                ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" 
                                                                : "text-slate-400 hover:text-slate-600"
                                                            )}
                                                        >
                                                            {op === 'OR' ? 'MATCH ANY (OR)' : 'MATCH ALL (AND)'}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            {group.items.map((req, idx) => (
                                                <motion.div 
                                                    key={`${req.taxonomy_type}-${req.taxonomy_id}`}
                                                    layout
                                                    className="group/item flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-serif text-lg font-bold text-slate-900 truncate">
                                                            {getTaxonomyName(req.taxonomy_id, group.key)}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        {req.taxonomy_type === 'langue' && (
                                                            <Select 
                                                                value={String(req.requirements_data?.niveau_langue_id)} 
                                                                onValueChange={(val) => updateLevel(req.taxonomy_id, req.taxonomy_type, Number(val))}
                                                            >
                                                                <SelectTrigger className="h-10 w-[110px] text-[11px] font-black uppercase tracking-wider rounded-xl bg-white border-slate-200">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent className="rounded-xl">
                                                                    {taxonomies.niveauLangues.map((level: any) => (
                                                                        <SelectItem key={level.id} value={String(level.id)} className="text-[11px] font-bold">
                                                                            {level.nom}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        )}

                                                        <Select 
                                                            value={req.importance} 
                                                            onValueChange={(val) => updateImportance(req.taxonomy_id, req.taxonomy_type, val)}
                                                        >
                                                            <SelectTrigger className={cn(
                                                                "h-10 w-[140px] text-[11px] font-black uppercase tracking-wider rounded-xl transition-colors",
                                                                importanceLevels.find(i => i.value === req.importance)?.color
                                                            )}>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-xl">
                                                                {importanceLevels.map((level) => (
                                                                    <SelectItem key={level.value} value={level.value} className="text-[11px] font-bold">
                                                                        {level.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-10 w-10 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                                                            onClick={() => removeRequirement(req.taxonomy_id, req.taxonomy_type)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between pt-10 border-t border-slate-100">
                <Button 
                    variant="ghost" 
                    onClick={onPrev} 
                    className="h-14 px-8 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                >
                    <ArrowLeft className="mr-3 h-4 w-4" /> Retour
                </Button>
                <Button 
                    onClick={onNext} 
                    className="h-14 px-12 text-base font-black bg-slate-900 text-white rounded-[20px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50" 
                    disabled={data.requirements.length === 0}
                >
                    Suivant : Récapitulatif
                </Button>
            </div>
        </div>
    );
}

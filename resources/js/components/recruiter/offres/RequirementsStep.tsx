import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Trash2, Plus, ChevronDown, ChevronRight, X, GripVertical } from 'lucide-react';
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
    onNext?: () => void;
    onPrev?: () => void;
    taxonomies: any;
    isEditMode?: boolean;
}

const categories = [
    { label: 'Spécialisations', key: 'specialisations', type: 'specialisation', icon: '⚖️' },
    { label: 'Langues', key: 'langues', type: 'langue', icon: '🌐' },
    { label: 'Domaines d\'expérience', key: 'domaineExperiences', type: 'domaine_experience', icon: '📂' },
    { label: 'Formations Juridiques', key: 'formationJuridiques', type: 'formation_juridique', icon: '🎓' },
];

const importanceLevels = [
    { label: 'Indispensable', value: 'indispensable', dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
    { label: 'Important', value: 'important', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Souhaitable', value: 'souhaitable', dot: 'bg-sky-500', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
    { label: 'Facultatif', value: 'facultatif', dot: 'bg-slate-400', badge: 'bg-slate-50 text-slate-600 border-slate-200' },
];

export default function RequirementsStep({ data, setData, errors, onNext, onPrev, taxonomies, isEditMode }: Props) {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        categories.forEach(cat => { initial[cat.key] = true; });
        return initial;
    });

    const addRequirement = (taxId: number, taxType: string) => {
        if (data.requirements.find((r: any) => r.taxonomy_id === taxId && r.taxonomy_type === taxType)) {
            return;
        }

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

    const toggleGroup = (key: string) => {
        setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const groupedRequirements = useMemo(() => {
        return categories.map(cat => ({
            ...cat,
            items: data.requirements.filter(r => r.taxonomy_type === cat.type)
        }));
    }, [data.requirements]);

    const totalRequirements = data.requirements.length;

    const getImportanceLevel = (value: string) => importanceLevels.find(i => i.value === value);

    const availableItems = (categoryKey: string, categoryType: string) => {
        return taxonomies[categoryKey]?.filter((item: any) =>
            !data.requirements.find(r => r.taxonomy_id === item.id && r.taxonomy_type === categoryType)
        ) || [];
    };

    return (
        <div className="space-y-6">
            {/* Compact summary bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        {importanceLevels.map(level => {
                            const count = data.requirements.filter(r => r.importance === level.value).length;
                            if (count === 0) return null;
                            return (
                                <span key={level.value} className="flex items-center gap-1 text-xs text-slate-500">
                                    <span className={cn("h-2 w-2 rounded-full", level.dot)} />
                                    {count}
                                </span>
                            );
                        })}
                    </div>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-600">
                        {totalRequirements} critère{totalRequirements !== 1 ? 's' : ''} configuré{totalRequirements !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* All categories in a single compact list */}
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {groupedRequirements.map((group) => (
                    <div key={group.key} className="bg-white">
                        {/* Category header — always visible */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50">
                            <button
                                type="button"
                                onClick={() => toggleGroup(group.key)}
                                className="flex items-center gap-2.5 text-left flex-1 min-w-0"
                            >
                                <span className="text-base">{group.icon}</span>
                                <span className="text-sm font-semibold text-slate-900">{group.label}</span>
                                {group.items.length > 0 && (
                                    <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 text-[10px] font-bold bg-slate-200 text-slate-700 border-none rounded-full">
                                        {group.items.length}
                                    </Badge>
                                )}
                                {expandedGroups[group.key] ? (
                                    <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-auto shrink-0" />
                                ) : (
                                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 ml-auto shrink-0" />
                                )}
                            </button>

                            <div className="flex items-center gap-2 ml-3">
                                {/* Operator toggle — compact */}
                                {group.items.length > 1 && (
                                    <div className="inline-flex p-0.5 rounded-md bg-slate-100 border border-slate-200">
                                        {(['OR', 'AND'] as const).map((op) => (
                                            <button
                                                key={op}
                                                type="button"
                                                onClick={() => updateOperator(group.type, op)}
                                                className={cn(
                                                    "px-2 py-0.5 rounded text-[10px] font-bold tracking-wide transition-all",
                                                    group.items[0]?.operator === op
                                                    ? "bg-white text-slate-900 shadow-sm"
                                                    : "text-slate-400 hover:text-slate-600"
                                                )}
                                            >
                                                {op}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Add button */}
                                <Select onValueChange={(val) => addRequirement(Number(val), group.type)}>
                                    <SelectTrigger className="h-7 w-7 p-0 border-slate-200 bg-white rounded-md [&>svg]:hidden flex items-center justify-center hover:bg-slate-50 transition-colors">
                                        <Plus className="h-3.5 w-3.5 text-slate-500" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-lg max-h-64">
                                        {availableItems(group.key, group.type).length === 0 ? (
                                            <div className="px-3 py-2 text-xs text-slate-400 italic">
                                                Toutes les valeurs sont déjà ajoutées
                                            </div>
                                        ) : (
                                            availableItems(group.key, group.type).map((item: any) => (
                                                <SelectItem key={item.id} value={String(item.id)} className="text-sm">
                                                    {item.nom}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Expanded content — compact table rows */}
                        <AnimatePresence initial={false}>
                            {expandedGroups[group.key] && group.items.length > 0 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="overflow-hidden"
                                >
                                    <div className="divide-y divide-slate-50">
                                        {group.items.map((req) => {
                                            const importance = getImportanceLevel(req.importance);
                                            return (
                                                <div
                                                    key={`${req.taxonomy_type}-${req.taxonomy_id}`}
                                                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50/50 transition-colors group/row"
                                                >
                                                    {/* Importance dot */}
                                                    <span className={cn("h-2 w-2 rounded-full shrink-0", importance?.dot)} />

                                                    {/* Name */}
                                                    <span className="text-sm font-medium text-slate-800 flex-1 min-w-0 truncate">
                                                        {getTaxonomyName(req.taxonomy_id, group.key)}
                                                    </span>

                                                    {/* Language level selector */}
                                                    {req.taxonomy_type === 'langue' && (
                                                        <Select
                                                            value={String(req.requirements_data?.niveau_langue_id)}
                                                            onValueChange={(val) => updateLevel(req.taxonomy_id, req.taxonomy_type, Number(val))}
                                                        >
                                                            <SelectTrigger className="h-7 w-[90px] text-[11px] font-medium rounded-md bg-slate-50 border-slate-200 px-2">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-lg">
                                                                {taxonomies.niveauLangues.map((level: any) => (
                                                                    <SelectItem key={level.id} value={String(level.id)} className="text-xs">
                                                                        {level.nom}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}

                                                    {/* Importance selector */}
                                                    <Select
                                                        value={req.importance}
                                                        onValueChange={(val) => updateImportance(req.taxonomy_id, req.taxonomy_type, val)}
                                                    >
                                                        <SelectTrigger className={cn(
                                                            "h-7 w-[110px] text-[11px] font-semibold rounded-md border px-2",
                                                            importance?.badge
                                                        )}>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-lg">
                                                            {importanceLevels.map((level) => (
                                                                <SelectItem key={level.value} value={level.value} className="text-xs">
                                                                    <span className="flex items-center gap-1.5">
                                                                        <span className={cn("h-1.5 w-1.5 rounded-full", level.dot)} />
                                                                        {level.label}
                                                                    </span>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    {/* Remove */}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRequirement(req.taxonomy_id, req.taxonomy_type)}
                                                        className="h-6 w-6 flex items-center justify-center rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors opacity-0 group-hover/row:opacity-100"
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Empty state inside expanded group */}
                        {expandedGroups[group.key] && group.items.length === 0 && (
                            <div className="px-4 py-3 text-center">
                                <p className="text-xs text-slate-400">
                                    Aucun critère — utilisez <Plus className="h-3 w-3 inline -mt-0.5" /> pour ajouter
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!isEditMode && (
                <div className="flex justify-between pt-6 border-t border-slate-100">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onPrev}
                        className="h-11 px-6 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                    <Button
                        type="button"
                        onClick={onNext}
                        className="h-11 px-8 text-sm font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 disabled:opacity-50"
                        disabled={data.requirements.length === 0}
                    >
                        Suivant : Récapitulatif
                    </Button>
                </div>
            )}
        </div>
    );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    data: any;
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
    { label: 'Modes de Travail', key: 'modeTravails', type: 'mode_travail' },
    { label: 'Domaines d\'expérience', key: 'domaineExperiences', type: 'domaine_experience' },
    { label: 'Formations Juridiques', key: 'formationJuridiques', type: 'formation_juridique' },
];

const importanceLevels = [
    { label: 'Indispensable', value: 'indispensable', color: 'bg-red-100 text-red-700 border-red-200' },
    { label: 'Important', value: 'important', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { label: 'Souhaitable', value: 'souhaitable', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { label: 'Facultatif', value: 'facultatif', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

export default function RequirementsStep({ data, setData, errors, onNext, onPrev, taxonomies }: Props) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

    const addRequirement = (taxId: number, taxType: string) => {
        // Prevent duplicates
        if (data.requirements.find((r: any) => r.taxonomy_id === taxId && r.taxonomy_type === taxType)) {
            return;
        }

        const newReq = {
            taxonomy_id: taxId,
            taxonomy_type: taxType,
            importance: 'important',
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

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Select Category & Item */}
                <div className="md:col-span-1 space-y-6">
                    <div className="space-y-4">
                        <Label className="text-lg font-bold">1. Catégorie</Label>
                        <div className="flex flex-col gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => setSelectedCategory(cat.key)}
                                    className={`text-left px-4 py-3 rounded-lg border transition-all duration-300 font-sans ${
                                        selectedCategory === cat.key 
                                        ? 'bg-primary/5 border-primary text-primary font-bold shadow-sm' 
                                        : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed border-gray-100">
                        <Label className="text-lg font-bold">2. Choisir des valeurs</Label>
                        <Select onValueChange={(val) => {
                            const cat = categories.find(c => c.key === selectedCategory);
                            if (cat) addRequirement(Number(val), cat.type);
                        }}>
                            <SelectTrigger className="h-12">
                                <SelectValue placeholder={`Ajouter ${categories.find(c => c.key === selectedCategory)?.label}...`} />
                            </SelectTrigger>
                            <SelectContent>
                                {taxonomies[selectedCategory]?.map((item: any) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Column 2 & 3: List Selected Requirements with Importance */}
                <div className="md:col-span-2 space-y-6">
                    <Label className="text-lg font-bold">Critères sélectionnés & Importance</Label>
                    
                    {data.requirements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50 md:p-12 text-center">
                            <p className="text-muted-foreground font-sans">Aucun critère sélectionné pour le moment.</p>
                            <p className="text-xs mt-2 font-sans">Sélectionnez des compétences, localisations ou langues pour bâtir votre profil idéal.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.requirements.map((req: any, index: number) => {
                                const cat = categories.find(c => c.type === req.taxonomy_type);
                                return (
                                    <div 
                                        key={`${req.taxonomy_type}-${req.taxonomy_id}`}
                                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow group"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold bg-primary/5 text-primary border-primary/20">
                                                    {cat?.label || 'Autre'}
                                                </Badge>
                                            </div>
                                            <p className="font-serif text-lg font-bold text-gray-900">
                                                {getTaxonomyName(req.taxonomy_id, cat?.key || '')}
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0 flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                            {req.taxonomy_type === 'langue' && (
                                                <Select 
                                                    value={String(req.requirements_data?.niveau_langue_id)} 
                                                    onValueChange={(val) => updateLevel(req.taxonomy_id, req.taxonomy_type, Number(val))}
                                                >
                                                    <SelectTrigger className="h-9 w-full sm:w-[120px] text-xs font-medium rounded-full bg-white border-gray-200">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {taxonomies.niveauLangues.map((level: any) => (
                                                            <SelectItem key={level.id} value={String(level.id)} className="text-xs">
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
                                                <SelectTrigger className={`h-9 w-full sm:w-[140px] text-xs font-bold rounded-full ${importanceLevels.find(i => i.value === req.importance)?.color}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {importanceLevels.map((level) => (
                                                        <SelectItem key={level.value} value={level.value} className="text-xs">
                                                            {level.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={() => removeRequirement(req.taxonomy_id, req.taxonomy_type)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between pt-10 border-t border-[#1a1f1e]/5">
                <Button variant="ghost" onClick={onPrev} className="h-14 px-8 text-sm font-bold text-[#1a1f1e]/40 hover:text-[#1a1f1e] hover:bg-transparent">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                <Button 
                    onClick={onNext} 
                    className="h-14 px-12 text-base font-bold bg-[#1a1f1e] text-white rounded-full hover:scale-105 transition-all shadow-xl shadow-[#1a1f1e]/10" 
                    disabled={data.requirements.length === 0}
                >
                    Suivant : Récapitulatif
                </Button>
            </div>
        </div>
    );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Award, Users, AlertTriangle } from 'lucide-react';

interface Props {
    data: any;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onPrev: () => void;
    taxonomies: any;
    isEdit?: boolean;
}

const importanceLevels: { [key: string]: { label: string, color: string } } = {
    indispensable: { label: 'Indispensable', color: 'bg-red-100 text-red-700' },
    important: { label: 'Important', color: 'bg-orange-100 text-orange-700' },
    souhaitable: { label: 'Souhaitable', color: 'bg-blue-100 text-blue-700' },
    facultatif: { label: 'Facultatif', color: 'bg-gray-100 text-gray-700' },
};

export default function ReviewStep({ data, processing, onSubmit, onPrev, taxonomies, isEdit = false }: Props) {
    const getTaxonomyName = (taxId: number, type: string) => {
        const keyMap: { [key: string]: string } = {
            ville: 'villes',
            SPECIALISATION: 'specialisations',
            LANGUE: 'langues',
            mode_travail: 'modeTravails',
            formation_juridique: 'formationJuridiques',
            salaire: 'salaires',
            urgence: 'urgences',
        };
        const key = keyMap[type];
        const item = taxonomies[key]?.find((t: any) => t.id === taxId);
        return item?.nom || 'Inconnu';
    };

    const getPosteName = () => taxonomies.postes?.find((p: any) => p.id === Number(data.poste_id))?.nom || 'Non spécifié';
    const getTypeTravailName = () => taxonomies.typeTravails?.find((p: any) => p.id === Number(data.type_travail_id))?.nom || 'Non spécifié';
    const getNiveauExperienceName = () => taxonomies.niveauExperiences?.find((p: any) => p.id === Number(data.niveau_experience_id))?.nom || 'Non spécifié';
    const getFormationJuridiqueName = () => data.formation_juridique_id ? taxonomies.formationJuridiques?.find((p: any) => p.id === Number(data.formation_juridique_id))?.nom : null;
    const getSalaireName = () => data.salaire_id ? taxonomies.salaires?.find((p: any) => p.id === Number(data.salaire_id))?.nom : 'Confidentiel';
    const getUrgenceName = () => data.urgence_id ? taxonomies.urgences?.find((p: any) => p.id === Number(data.urgence_id))?.nom : 'Non spécifié';

    return (
        <div className="space-y-10">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <Info className="h-6 w-6 text-blue-600 mt-1" />
                <div className="text-sm">
                    <p className="font-bold text-blue-900">Vérifiez bien votre annonce avant de publier.</p>
                    <p className="text-blue-700 mt-1">
                        Les critères d'importances permettront à notre algorithme de matching de vous proposer les meilleurs candidats.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Informations principales</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-2xl font-serif font-bold text-gray-900">{data.titre}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-900">{getPosteName()}</Badge>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-900">{getTypeTravailName()}</Badge>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">{getNiveauExperienceName()}</Badge>
                                {getFormationJuridiqueName() && (
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">{getFormationJuridiqueName()}</Badge>
                                )}
                            </div>
                            
                            <div className="flex flex-col gap-2 mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Salaire proposé :</span>
                                    <span className="font-semibold text-slate-800">{getSalaireName()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Degré d'urgence :</span>
                                    <span className="font-semibold flex items-center gap-1.5 text-slate-800">
                                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                                        {getUrgenceName()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Nombre de CV souhaité :</span>
                                    <span className="font-semibold flex items-center gap-1.5 text-slate-800">
                                        <Users className="h-3.5 w-3.5 text-indigo-500" />
                                        {data.nombre_cv || 1} CV(s)
                                    </span>
                                </div>
                            </div>
                            
                            {data.notes_complementaires && (
                                <div className="mt-4 p-4 bg-yellow-50/50 border border-yellow-100 rounded-lg">
                                    <h4 className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1">Notes pour l'équipe</h4>
                                    <p className="text-sm text-yellow-900/80">{data.notes_complementaires}</p>
                                </div>
                            )}

                            <div className="prose prose-sm max-w-none text-gray-600 font-sans line-clamp-6 mt-4">
                                {data.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Critères de Matching</h3>
                        <div className="space-y-3">
                            {data.requirements.length === 0 ? (
                                <div className="p-4 rounded-lg border border-dashed border-gray-200 text-center text-sm text-gray-500">
                                    Aucun critère spécifique défini
                                </div>
                            ) : (
                                data.requirements.map((req: any, index: number) => {
                                    const importanceValue = req.metadata?.importance || 'important';
                                    const importance = importanceLevels[importanceValue] || importanceLevels.important;
                                    const levelName = req.taxonomy_type === 'LANGUE' 
                                        ? taxonomies.niveauLangues?.find((l: any) => l.id === Number(req.metadata?.niveau_langue_id))?.nom 
                                        : null;

                                    return (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-50 bg-white">
                                            <div className="flex items-center gap-3">
                                                <Award className={`h-4 w-4 ${importanceValue === 'indispensable' ? 'text-red-500' : 'text-gray-300'}`} />
                                                <div className="flex flex-col">
                                                    <span className="font-sans font-medium text-gray-800 text-sm">
                                                        {getTaxonomyName(req.taxonomy_id, req.taxonomy_type)}
                                                    </span>
                                                    {levelName && (
                                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                                                            Niveau: {levelName}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge className={`text-[10px] font-bold ${importance.color} border-none`}>
                                                {importance.label}
                                            </Badge>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-12 border-t border-[#1a1f1e]/5">
                <Button variant="ghost" onClick={onPrev} className="h-14 px-8 text-sm font-bold text-[#1a1f1e]/40 hover:text-[#1a1f1e] hover:bg-transparent">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                <div className="flex items-center gap-4">
                    <Button 
                        onClick={onSubmit} 
                        disabled={processing}
                        className="h-16 px-14 text-lg font-serif font-bold bg-[#1a1f1e] text-white rounded-full shadow-2xl shadow-[#1a1f1e]/20 hover:scale-105 active:scale-95 transition-all italic"
                    >
                        {processing ? (isEdit ? 'Mise à jour...' : 'Publication...') : (isEdit ? "Mettre à jour l'Offre" : 'Publier mon Offre')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

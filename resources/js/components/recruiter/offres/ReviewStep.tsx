import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Award } from 'lucide-react';

interface Props {
    data: any;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onPrev: () => void;
    taxonomies: any;
}

const importanceLevels: { [key: string]: { label: string, color: string } } = {
    indispensable: { label: 'Indispensable', color: 'bg-red-100 text-red-700' },
    important: { label: 'Important', color: 'bg-orange-100 text-orange-700' },
    souhaitable: { label: 'Souhaitable', color: 'bg-blue-100 text-blue-700' },
    facultatif: { label: 'Facultatif', color: 'bg-gray-100 text-gray-700' },
};

export default function ReviewStep({ data, processing, onSubmit, onPrev, taxonomies }: Props) {
    const getTaxonomyName = (taxId: number, type: string) => {
        const keyMap: { [key: string]: string } = {
            ville: 'villes',
            specialisation: 'specialisations',
            langue: 'langues',
            mode_travail: 'modeTravails',
            domaine_experience: 'domaineExperiences',
            formation_juridique: 'formationJuridiques',
        };
        const key = keyMap[type];
        const item = taxonomies[key]?.find((t: any) => t.id === taxId);
        return item?.nom || 'Inconnu';
    };

    const getPosteName = () => {
        return taxonomies.postes.find((p: any) => p.id === Number(data.poste_id))?.nom || 'Non spécifié';
    };

    const getTypeTravailName = () => {
        return taxonomies.typeTravails.find((p: any) => p.id === Number(data.type_travail_id))?.nom || 'Non spécifié';
    };

    const getNiveauExperienceName = () => {
        return taxonomies.niveauExperiences.find((p: any) => p.id === Number(data.niveau_experience_id))?.nom || 'Non spécifié';
    };

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
                            </div>
                            <div className="prose prose-sm max-w-none text-gray-600 font-sans line-clamp-6">
                                {data.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Critères de Matching</h3>
                        <div className="space-y-3">
                                {data.requirements.map((req: any, index: number) => {
                                    const importance = importanceLevels[req.importance];
                                    const levelName = req.taxonomy_type === 'langue' 
                                        ? taxonomies.niveauLangues.find((l: any) => l.id === Number(req.requirements_data?.niveau_langue_id))?.nom 
                                        : null;

                                    return (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-50 bg-white">
                                            <div className="flex items-center gap-3">
                                                <Award className={`h-4 w-4 ${req.importance === 'indispensable' ? 'text-red-500' : 'text-gray-300'}`} />
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
                                })}
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
                        {processing ? 'Publication...' : 'Publier mon Offre'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

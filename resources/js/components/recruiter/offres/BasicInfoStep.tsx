import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler } from 'react';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext: () => void;
    taxonomies: any;
}

export default function BasicInfoStep({ data, setData, errors, onNext, taxonomies }: Props) {
    const handleNext: FormEventHandler = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleNext} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="titre" className="text-base font-bold text-gray-700">Titre de l'annonce</Label>
                    <Input
                        id="titre"
                        value={data.titre}
                        onChange={(e) => setData('titre', e.target.value)}
                        placeholder="Ex: Avocat en droit du travail H/F"
                        className="mt-2 text-lg h-12"
                    />
                    {errors.titre && <p className="mt-1 text-sm text-red-500">{errors.titre}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <Label htmlFor="poste_id" className="text-base font-bold text-gray-700">Le métier visé</Label>
                        <div className="mt-2">
                            <Select 
                                value={String(data.poste_id)} 
                                onValueChange={(val) => setData('poste_id', val)}
                            >
                                <SelectTrigger className="h-12 border-gray-200">
                                    <SelectValue placeholder="Sélectionnez un poste" />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.postes.map((poste: any) => (
                                        <SelectItem key={poste.id} value={String(poste.id)}>
                                            {poste.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.poste_id && <p className="mt-1 text-sm text-red-500">{errors.poste_id}</p>}
                    </div>

                    <div>
                        <Label htmlFor="type_travail_id" className="text-base font-bold text-gray-700">Type de contrat</Label>
                        <div className="mt-2">
                            <Select 
                                value={String(data.type_travail_id)} 
                                onValueChange={(val) => setData('type_travail_id', val)}
                            >
                                <SelectTrigger className="h-12 border-gray-200">
                                    <SelectValue placeholder="CDI, CDD..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.typeTravails.map((type: any) => (
                                        <SelectItem key={type.id} value={String(type.id)}>
                                            {type.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.type_travail_id && <p className="mt-1 text-sm text-red-500">{errors.type_travail_id}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <Label htmlFor="niveau_experience_id" className="text-base font-bold text-gray-700">Niveau d'expérience requis</Label>
                        <div className="mt-2">
                            <Select 
                                value={String(data.niveau_experience_id)} 
                                onValueChange={(val) => setData('niveau_experience_id', val)}
                            >
                                <SelectTrigger className="h-12 border-gray-200">
                                    <SelectValue placeholder="Junior, Senior..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.niveauExperiences.map((level: any) => (
                                        <SelectItem key={level.id} value={String(level.id)}>
                                            {level.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.niveau_experience_id && <p className="mt-1 text-sm text-red-500">{errors.niveau_experience_id}</p>}
                    </div>
                </div>

                <div>
                    <Label htmlFor="description" className="text-base font-bold text-gray-700">Description de l'offre</Label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={10}
                        placeholder="Présentez les missions, le profil recherché et l'entreprise..."
                        className="mt-2 flex min-h-[200px] w-full rounded-md border border-gray-200 bg-transparent px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <Button 
                    type="submit" 
                    className="h-14 px-12 text-base font-bold bg-[#1a1f1e] text-white rounded-full hover:scale-105 transition-all shadow-xl shadow-[#1a1f1e]/10"
                    disabled={!data.titre || !data.poste_id || !data.type_travail_id || !data.description}
                >
                    Suivant : Définir les critères
                </Button>
            </div>
        </form>
    );
}

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEventHandler } from 'react';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    taxonomies: any;
    isEditMode?: boolean;
}

export default function BasicInfoStep({ data, setData, errors, onNext, taxonomies, isEditMode }: Props) {
    const handleNext: FormEventHandler = (e) => {
        e.preventDefault();
        if (onNext) onNext();
    };

    const Wrapper = isEditMode ? 'div' : 'form';
    const wrapperProps = isEditMode ? { className: "space-y-6" } : { onSubmit: handleNext, className: "space-y-6" };

    return (
        <Wrapper {...wrapperProps}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="titre" className="text-sm font-semibold text-slate-900">Titre de l'annonce</Label>
                    <Input
                        id="titre"
                        value={data.titre}
                        onChange={(e) => setData('titre', e.target.value)}
                        placeholder="Ex: Avocat en droit du travail H/F"
                        className="mt-1.5 text-base h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus-visible:ring-primary/20"
                    />
                    {errors.titre && <p className="mt-1.5 text-sm text-red-500">{errors.titre}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <Label htmlFor="poste_id" className="text-sm font-semibold text-slate-900">Le métier visé</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.poste_id || '')} 
                                onValueChange={(val) => setData('poste_id', val)}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
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
                        {errors.poste_id && <p className="mt-1.5 text-sm text-red-500">{errors.poste_id}</p>}
                    </div>

                    <div>
                        <Label htmlFor="niveau_experience_id" className="text-sm font-semibold text-slate-900">Expérience requise</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.niveau_experience_id || '')} 
                                onValueChange={(val) => setData('niveau_experience_id', val)}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
                                    <SelectValue placeholder="Junior, Senior..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.niveauExperiences.map((niveau: any) => (
                                        <SelectItem key={niveau.id} value={String(niveau.id)}>
                                            {niveau.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.niveau_experience_id && <p className="mt-1.5 text-sm text-red-500">{errors.niveau_experience_id}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                        <Label htmlFor="type_travail_id" className="text-sm font-semibold text-slate-900">Type de contrat</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.type_travail_id || '')} 
                                onValueChange={(val) => setData('type_travail_id', val)}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
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
                        {errors.type_travail_id && <p className="mt-1.5 text-sm text-red-500">{errors.type_travail_id}</p>}
                    </div>

                    <div>
                        <Label htmlFor="mode_travail_id" className="text-sm font-semibold text-slate-900">Mode de travail</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.mode_travail_id || '')} 
                                onValueChange={(val) => {
                                    setData('mode_travail_id', val);
                                    if (val === '2') setData('ville_id', '');
                                }}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
                                    <SelectValue placeholder="Télétravail, Bureau..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.modeTravails.map((mode: any) => (
                                        <SelectItem key={mode.id} value={String(mode.id)}>
                                            {mode.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.mode_travail_id && <p className="mt-1.5 text-sm text-red-500">{errors.mode_travail_id}</p>}
                    </div>

                    <div>
                        <Label htmlFor="ville_id" className="text-sm font-semibold text-slate-900">Lieu de travail</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.ville_id || '')} 
                                onValueChange={(val) => setData('ville_id', val)}
                                disabled={data.mode_travail_id === '2'} 
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
                                    <SelectValue placeholder={data.mode_travail_id === '2' ? "Non applicable" : "Sélectionnez une ville"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.villes.map((ville: any) => (
                                        <SelectItem key={ville.id} value={String(ville.id)}>
                                            {ville.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.ville_id && <p className="mt-1.5 text-sm text-red-500">{errors.ville_id}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <Label htmlFor="formation_juridique_id" className="text-sm font-semibold text-slate-900">Formation Juridique</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.formation_juridique_id || '')} 
                                onValueChange={(val) => setData('formation_juridique_id', val)}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
                                    <SelectValue placeholder="Non spécifié" />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.formationJuridiques?.map((formation: any) => (
                                        <SelectItem key={formation.id} value={String(formation.id)}>
                                            {formation.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.formation_juridique_id && <p className="mt-1.5 text-sm text-red-500">{errors.formation_juridique_id}</p>}
                    </div>

                    <div>
                        <Label htmlFor="salaire_id" className="text-sm font-semibold text-slate-900">Salaire proposé</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.salaire_id || '')} 
                                onValueChange={(val) => setData('salaire_id', val === 'confidentiel' ? '' : val)}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
                                    <SelectValue placeholder="Budget confidentiel" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="confidentiel">Budget confidentiel</SelectItem>
                                    {taxonomies.salaires?.map((salaire: any) => (
                                        <SelectItem key={salaire.id} value={String(salaire.id)}>
                                            {salaire.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.salaire_id && <p className="mt-1.5 text-sm text-red-500">{errors.salaire_id}</p>}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <Label htmlFor="urgence_id" className="text-sm font-semibold text-slate-900">Degré d'urgence</Label>
                        <div className="mt-1.5">
                            <Select 
                                value={String(data.urgence_id || '')} 
                                onValueChange={(val) => setData('urgence_id', val)}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:ring-primary/20">
                                    <SelectValue placeholder="Sélectionnez une urgence" />
                                </SelectTrigger>
                                <SelectContent>
                                    {taxonomies.urgences?.map((urgence: any) => (
                                        <SelectItem key={urgence.id} value={String(urgence.id)}>
                                            {urgence.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors.urgence_id && <p className="mt-1.5 text-sm text-red-500">{errors.urgence_id}</p>}
                    </div>

                    <div>
                        <Label htmlFor="nombre_cv" className="text-sm font-semibold text-slate-900">Nombre de CV souhaité</Label>
                        <Input
                            id="nombre_cv"
                            type="number"
                            min="1"
                            max="20"
                            value={data.nombre_cv}
                            onChange={(e) => setData('nombre_cv', e.target.value)}
                            className="mt-1.5 text-base h-11 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors focus-visible:ring-primary/20"
                        />
                        {errors.nombre_cv && <p className="mt-1.5 text-sm text-red-500">{errors.nombre_cv}</p>}
                    </div>
                </div>

                <div>
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-900">Description de l'offre</Label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={6}
                        placeholder="Présentez les missions, le profil recherché et l'entreprise..."
                        className="mt-1.5 flex w-full rounded-md border border-slate-200 bg-slate-50/50 px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50 transition-colors"
                    />
                    {errors.description && <p className="mt-1.5 text-sm text-red-500">{errors.description}</p>}
                </div>
                
                <div>
                    <Label htmlFor="notes_complementaires" className="text-sm font-semibold text-slate-900">Notes complémentaires pour l'équipe (Optionnel)</Label>
                    <textarea
                        id="notes_complementaires"
                        value={data.notes_complementaires || ''}
                        onChange={(e) => setData('notes_complementaires', e.target.value)}
                        rows={3}
                        placeholder="Ex: Nous cherchons idéalement quelqu'un disponible de suite..."
                        className="mt-1.5 flex w-full rounded-md border border-slate-200 bg-slate-50/50 px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50 transition-colors"
                    />
                    {errors.notes_complementaires && <p className="mt-1.5 text-sm text-red-500">{errors.notes_complementaires}</p>}
                </div>
            </div>

            {!isEditMode && (
                <div className="flex justify-end pt-8">
                    <Button 
                        type="submit" 
                        className="h-12 px-8 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10"
                        disabled={!data.titre || !data.poste_id || !data.type_travail_id || !data.mode_travail_id || (data.mode_travail_id !== '2' && !data.ville_id) || !data.niveau_experience_id || !data.description || !data.urgence_id}
                    >
                        Suivant : Définir les critères
                    </Button>
                </div>
            )}
        </Wrapper>
    );
}

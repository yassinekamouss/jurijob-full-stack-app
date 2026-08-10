import { useMemo } from 'react';
import { CandidatFormData } from '@/types';
import { useTaxonomies, useLoadingTaxonomy } from '@/hooks/use-taxonomies';

type FormCandidatSpecialisationsProps = {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: unknown) => void;
    errors: Partial<Record<keyof CandidatFormData, string>>;
    className?: string;
};

export default function FormCandidatSpecialisations({
    formData,
    onFieldChange,
    errors = {},
    className = '',
}: FormCandidatSpecialisationsProps) {
    const { specialisations } = useTaxonomies();
    const selected = formData.specialisations || [];

    const groupedSpecialisations = useMemo(() => {
        const groups: Record<string, typeof specialisations> = {};

        specialisations.forEach((item) => {
            const domaine = item.domaine || 'Autre';
            if (!groups[domaine]) {
                groups[domaine] = [];
            }
            groups[domaine].push(item);
        });

        return Object.entries(groups).map(([domaine, items]) => ({ domaine, items }));
    }, [specialisations]);

    const toggleSpecialisation = (id: number) => {
        const isSelected = selected.includes(id);
        onFieldChange(
            'specialisations',
            isSelected ? selected.filter((item) => item !== id) : [...selected, id],
        );
    };

    return (
        <div className={`space-y-8 ${className}`}>
            <div className="mb-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-slate-900">Spécialisations</h3>
                <p className="text-sm text-slate-500">
                    Sélectionnez une ou plusieurs spécialisations par catégorie
                </p>
            </div>

            {useLoadingTaxonomy(specialisations) ? (
                <p className="py-8 text-center text-sm text-slate-500">Chargement des spécialisations...</p>
            ) : (
                <div className="space-y-8">
                    {groupedSpecialisations.map((group) => {
                        const selectedInGroup = group.items.filter((item) => selected.includes(item.id)).length;

                        return (
                            <section key={group.domaine} className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h4 className="text-base font-bold text-slate-900">{group.domaine}</h4>
                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
                                        {group.items.length}
                                    </span>
                                    {selectedInGroup > 0 && (
                                        <span className="text-xs font-semibold text-[#C06041]">
                                            {selectedInGroup} choisie{selectedInGroup > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2.5">
                                    {group.items.map((item) => {
                                        const isSelected = selected.includes(item.id);

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => toggleSpecialisation(item.id)}
                                                className={`inline-flex max-w-full items-center rounded-2xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-all ${
                                                    isSelected
                                                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                                                }`}
                                            >
                                                <span className="leading-snug break-words">{item.nom}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}

            {errors.specialisations && (
                <p className="text-xs font-medium text-red-500">{errors.specialisations}</p>
            )}

            {selected.length > 0 && (
                <p className="text-xs font-semibold text-slate-500">
                    {selected.length} spécialisation{selected.length > 1 ? 's' : ''} sélectionnée
                    {selected.length > 1 ? 's' : ''}
                </p>
            )}
        </div>
    );
}

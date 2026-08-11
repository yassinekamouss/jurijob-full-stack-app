import { useEffect, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTaxonomies, useLoadingTaxonomy } from '@/hooks/use-taxonomies';
import { sync } from '@/routes/candidate/specialisations';

interface Props {
    specialisations: Array<{ id: number; specialisation_id: number }>;
}

export default function SpecialisationSection({ specialisations }: Props) {
    const { specialisations: specialisationOptions } = useTaxonomies();

    const initialSelectedIds = useMemo(
        () => specialisations.map((item) => item.specialisation_id),
        [specialisations],
    );

    const form = useForm<{ specialisation_ids: number[] }>({
        specialisation_ids: initialSelectedIds,
    });

    useEffect(() => {
        form.setData('specialisation_ids', initialSelectedIds);
    }, [initialSelectedIds]);

    const groupedSpecialisations = useMemo(() => {
        const groups: Record<string, typeof specialisationOptions> = {};

        specialisationOptions.forEach((item) => {
            const domaine = item.domaine || 'Autre';
            if (!groups[domaine]) {
                groups[domaine] = [];
            }
            groups[domaine].push(item);
        });

        return Object.entries(groups).map(([domaine, items]) => ({ domaine, items }));
    }, [specialisationOptions]);

    const toggleSpecialisation = (id: number) => {
        const selected = form.data.specialisation_ids;
        const isSelected = selected.includes(id);

        form.setData(
            'specialisation_ids',
            isSelected ? selected.filter((item) => item !== id) : [...selected, id],
        );

        if (form.errors.specialisation_ids) {
            form.clearErrors('specialisation_ids');
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.data.specialisation_ids.length === 0) {
            form.setError('specialisation_ids', 'Veuillez sélectionner au moins une spécialisation.');
            return;
        }

        form.put(sync().url, {
            preserveScroll: true,
            onSuccess: () => form.clearErrors(),
        });
    };

    const selectedCount = form.data.specialisation_ids.length;
    const isDirty =
        JSON.stringify([...form.data.specialisation_ids].sort((a, b) => a - b)) !==
        JSON.stringify([...initialSelectedIds].sort((a, b) => a - b));

    return (
        <section className="space-y-6">
            <div>
                <h3 className="mb-1 font-serif text-xl font-bold italic">Spécialisations</h3>
                <p className="text-sm font-medium text-[#1a1f1e]/50">
                    Sélectionnez une ou plusieurs expertises juridiques par catégorie.
                </p>
            </div>

            <motion.form
                onSubmit={submit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm"
            >
                {useLoadingTaxonomy(specialisationOptions) ? (
                    <p className="py-8 text-center text-sm text-[#1a1f1e]/40">
                        Chargement des spécialisations...
                    </p>
                ) : (
                    <div className="space-y-8">
                        {groupedSpecialisations.map((group) => {
                            const selectedInGroup = group.items.filter((item) =>
                                form.data.specialisation_ids.includes(item.id),
                            ).length;

                            return (
                                <section key={group.domaine} className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <h4 className="text-base font-bold text-[#1a1f1e]">
                                            {group.domaine}
                                        </h4>
                                        <span className="rounded-full border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 px-2.5 py-1 text-[10px] font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                            {group.items.length}
                                        </span>
                                        {selectedInGroup > 0 && (
                                            <span className="text-xs font-semibold text-[#C06041]">
                                                {selectedInGroup} choisie
                                                {selectedInGroup > 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2.5">
                                        {group.items.map((item) => {
                                            const isSelected = form.data.specialisation_ids.includes(
                                                item.id,
                                            );

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => toggleSpecialisation(item.id)}
                                                    className={`inline-flex max-w-full items-center rounded-2xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-all ${
                                                        isSelected
                                                            ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white shadow-sm'
                                                            : 'border-[#1a1f1e]/10 bg-[#FDFCF8] text-[#1a1f1e]/70 hover:border-[#1a1f1e]/30'
                                                    }`}
                                                >
                                                    <span className="leading-snug break-words">
                                                        {item.nom}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}

                {form.errors.specialisation_ids && (
                    <p className="text-xs font-bold text-red-500">
                        {form.errors.specialisation_ids}
                    </p>
                )}

                <div className="flex items-center justify-between border-t border-[#1a1f1e]/5 pt-4">
                    <p className="text-xs font-semibold text-[#1a1f1e]/40">
                        {selectedCount > 0
                            ? `${selectedCount} spécialisation${selectedCount > 1 ? 's' : ''} sélectionnée${selectedCount > 1 ? 's' : ''}`
                            : 'Aucune spécialisation sélectionnée'}
                    </p>

                    <button
                        type="submit"
                        disabled={form.processing || !isDirty}
                        className="rounded-xl bg-[#1a1f1e] px-8 py-3 text-sm font-black tracking-widest text-white uppercase transition-all hover:bg-[#343a38] disabled:opacity-50"
                    >
                        Enregistrer
                    </button>
                </div>
            </motion.form>
        </section>
    );
}

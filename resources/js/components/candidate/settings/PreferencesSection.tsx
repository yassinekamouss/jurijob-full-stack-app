import { useEffect, useMemo, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import { sync } from '@/routes/candidate/preferences';

interface Props {
    villeTravails: Array<{ id: number; ville_id: number }>;
    modeTravails: Array<{ id: number; mode_travail_id: number }>;
    typeTravails: Array<{ id: number; type_travail_id: number }>;
}

type ChipOption = { id: number; nom: string };

function ChipGroup({
    options,
    selected,
    onToggle,
    loading,
}: {
    options: ChipOption[];
    selected: number[];
    onToggle: (id: number) => void;
    loading?: boolean;
}) {
    if (loading) {
        return <p className="py-4 text-sm font-medium text-[#1a1f1e]/40">Chargement...</p>;
    }

    return (
        <div className="flex flex-wrap gap-2.5">
            {options.map((option) => {
                const isSelected = selected.includes(option.id);

                return (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => onToggle(option.id)}
                        className={`inline-flex items-center rounded-2xl border px-3.5 py-2.5 text-sm font-semibold transition-all ${
                            isSelected
                                ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white shadow-sm'
                                : 'border-[#1a1f1e]/10 bg-white text-[#1a1f1e]/70 hover:border-[#1a1f1e]/30'
                        }`}
                    >
                        {getTaxonomyLabel(option)}
                    </button>
                );
            })}
        </div>
    );
}

export default function PreferencesSection({
    villeTravails,
    modeTravails,
    typeTravails,
}: Props) {
    const { pays, villes, modeTravails: modeOptions, typeTravails: typeOptions } = useTaxonomies();

    const initialVilleIds = useMemo(
        () => villeTravails.map((item) => item.ville_id),
        [villeTravails],
    );
    const initialModeIds = useMemo(
        () => modeTravails.map((item) => item.mode_travail_id),
        [modeTravails],
    );
    const initialTypeIds = useMemo(
        () => typeTravails.map((item) => item.type_travail_id),
        [typeTravails],
    );

    const initialPaysId = useMemo(() => {
        if (initialVilleIds.length === 0 || villes.length === 0) {
            return '';
        }

        const firstCity = villes.find((ville) => initialVilleIds.includes(ville.id));

        return firstCity?.pays_id ? String(firstCity.pays_id) : '';
    }, [initialVilleIds, villes]);

    const [selectedPaysId, setSelectedPaysId] = useState<string>(initialPaysId);

    const form = useForm<{
        ville_ids: number[];
        mode_travail_ids: number[];
        type_travail_ids: number[];
    }>({
        ville_ids: initialVilleIds,
        mode_travail_ids: initialModeIds,
        type_travail_ids: initialTypeIds,
    });

    useEffect(() => {
        form.setData({
            ville_ids: initialVilleIds,
            mode_travail_ids: initialModeIds,
            type_travail_ids: initialTypeIds,
        });
        setSelectedPaysId(initialPaysId);
    }, [initialVilleIds, initialModeIds, initialTypeIds, initialPaysId]);

    const citiesForCountry = useMemo(() => {
        if (!selectedPaysId) {
            return [];
        }

        return villes.filter((ville) => String(ville.pays_id) === String(selectedPaysId));
    }, [selectedPaysId, villes]);

    const toggleId = (field: 'ville_ids' | 'mode_travail_ids' | 'type_travail_ids', id: number) => {
        const selected = form.data[field];
        const isSelected = selected.includes(id);

        form.setData(
            field,
            isSelected ? selected.filter((item) => item !== id) : [...selected, id],
        );

        if (form.errors[field]) {
            form.clearErrors(field);
        }
    };

    const handleCountryChange = (paysId: string) => {
        setSelectedPaysId(paysId);
        form.setData('ville_ids', []);
        if (form.errors.ville_ids) {
            form.clearErrors('ville_ids');
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        let hasErrors = false;

        if (!selectedPaysId) {
            form.setError('ville_ids', 'Veuillez sélectionner un pays.');
            hasErrors = true;
        } else if (form.data.ville_ids.length === 0) {
            form.setError('ville_ids', 'Veuillez sélectionner au moins une ville.');
            hasErrors = true;
        }

        if (form.data.mode_travail_ids.length === 0) {
            form.setError('mode_travail_ids', 'Veuillez sélectionner au moins un mode de travail.');
            hasErrors = true;
        }

        if (form.data.type_travail_ids.length === 0) {
            form.setError('type_travail_ids', 'Veuillez sélectionner au moins un type de travail.');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        form.put(sync().url, {
            preserveScroll: true,
            onSuccess: () => form.clearErrors(),
        });
    };

    const isDirty =
        JSON.stringify([...form.data.ville_ids].sort((a, b) => a - b)) !==
            JSON.stringify([...initialVilleIds].sort((a, b) => a - b)) ||
        JSON.stringify([...form.data.mode_travail_ids].sort((a, b) => a - b)) !==
            JSON.stringify([...initialModeIds].sort((a, b) => a - b)) ||
        JSON.stringify([...form.data.type_travail_ids].sort((a, b) => a - b)) !==
            JSON.stringify([...initialTypeIds].sort((a, b) => a - b));

    return (
        <section className="space-y-8">
            <div>
                <h3 className="mb-1 font-serif text-xl font-bold italic">Préférences de recherche</h3>
                <p className="text-sm font-medium text-[#1a1f1e]/50">
                    Pays, villes, modes et types de travail recherchés.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-8">
                <div className="space-y-4 rounded-[28px] border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-6">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#C06041]" />
                        <h4 className="text-sm font-black tracking-widest text-[#1a1f1e]/50 uppercase">
                            Localisation
                        </h4>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-[#1a1f1e]/40 uppercase">
                            Pays
                        </label>
                        <select
                            value={selectedPaysId}
                            onChange={(e) => handleCountryChange(e.target.value)}
                            className="w-full rounded-2xl border border-[#1a1f1e]/10 bg-white px-5 py-4 text-sm font-bold outline-none transition-all focus:border-[#C06041]"
                        >
                            <option value="">Sélectionnez un pays</option>
                            {useLoadingTaxonomy(pays) ? (
                                <option disabled>Chargement...</option>
                            ) : (
                                pays.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {getTaxonomyLabel(country)}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-[#1a1f1e]/40 uppercase">
                            Villes
                        </label>
                        {!selectedPaysId ? (
                            <p className="rounded-2xl border border-dashed border-[#1a1f1e]/10 bg-white px-4 py-5 text-sm text-[#1a1f1e]/45">
                                Sélectionnez d&apos;abord un pays pour afficher ses villes.
                            </p>
                        ) : (
                            <ChipGroup
                                options={citiesForCountry}
                                selected={form.data.ville_ids}
                                onToggle={(id) => toggleId('ville_ids', id)}
                                loading={useLoadingTaxonomy(villes)}
                            />
                        )}
                        {form.errors.ville_ids && (
                            <p className="text-xs font-bold text-red-500">{form.errors.ville_ids}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4 rounded-[28px] border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-6">
                    <h4 className="text-sm font-black tracking-widest text-[#1a1f1e]/50 uppercase">
                        Mode de travail
                    </h4>
                    <ChipGroup
                        options={modeOptions}
                        selected={form.data.mode_travail_ids}
                        onToggle={(id) => toggleId('mode_travail_ids', id)}
                        loading={useLoadingTaxonomy(modeOptions)}
                    />
                    {form.errors.mode_travail_ids && (
                        <p className="text-xs font-bold text-red-500">{form.errors.mode_travail_ids}</p>
                    )}
                </div>

                <div className="space-y-4 rounded-[28px] border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-6">
                    <h4 className="text-sm font-black tracking-widest text-[#1a1f1e]/50 uppercase">
                        Type de travail
                    </h4>
                    <ChipGroup
                        options={typeOptions}
                        selected={form.data.type_travail_ids}
                        onToggle={(id) => toggleId('type_travail_ids', id)}
                        loading={useLoadingTaxonomy(typeOptions)}
                    />
                    {form.errors.type_travail_ids && (
                        <p className="text-xs font-bold text-red-500">{form.errors.type_travail_ids}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={form.processing || !isDirty}
                        className="rounded-full bg-[#1a1f1e] px-8 py-3 text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-[#343a38] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {form.processing ? 'Enregistrement...' : 'Enregistrer les préférences'}
                    </button>
                </div>
            </form>
        </section>
    );
}

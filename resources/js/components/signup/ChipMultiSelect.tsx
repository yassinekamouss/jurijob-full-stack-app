type TaxonomyOption = {
    id: number;
    nom: string;
};

type ChipMultiSelectProps = {
    options: TaxonomyOption[];
    selected: (string | number)[];
    onChange: (value: (string | number)[]) => void;
    error?: string;
    loading?: boolean;
};

export default function ChipMultiSelect({
    options,
    selected,
    onChange,
    error,
    loading = false,
}: ChipMultiSelectProps) {
    const isLoading = loading || options.length === 0;

    const toggle = (id: number) => {
        const isSelected = selected.includes(id);
        onChange(isSelected ? selected.filter((item) => item !== id) : [...selected, id]);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2.5">
                {isLoading ? (
                    <p className="w-full py-4 text-center text-sm text-slate-500">Chargement des options...</p>
                ) : (
                    options.map((option) => {
                        const isSelected = selected.includes(option.id);

                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => toggle(option.id)}
                                className={`inline-flex items-center rounded-2xl border px-3.5 py-2.5 text-sm font-semibold transition-all ${
                                    isSelected
                                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                                }`}
                            >
                                {option.nom}
                            </button>
                        );
                    })
                )}
            </div>
            {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
        </div>
    );
}

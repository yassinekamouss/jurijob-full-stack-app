import { router } from '@inertiajs/react';
import {
    Globe,
    GraduationCap,
    Plus,
    SlidersHorizontal,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Requirement = {
    taxonomy_id: number;
    taxonomy_type: 'LANGUE' | 'SPECIALISATION';
    label?: string;
    metadata?: {
        importance?: string;
        niveau_langue_id?: number | null;
        niveau_nom?: string;
    };
};

type OffreItem = {
    id: number;
    titre: string;
    statut: string;
    poste?: { id?: number; nom?: string };
    niveau_experience?: { id?: number; nom?: string };
    formation_juridique?: { id?: number; nom?: string };
    salaire?: { id?: number; nom?: string };
    ville?: { id?: number; nom?: string };
    type_travail?: { id?: number; nom?: string };
    mode_travail?: { id?: number; nom?: string };
    requirements?: Requirement[];
};

type Taxonomy = { id: number; nom: string; domaine?: string };

type Taxonomies = {
    postes: Taxonomy[];
    niveauExperiences: Taxonomy[];
    formationJuridiques: Taxonomy[];
    salaires: Taxonomy[];
    villes: Taxonomy[];
    typeTravails: Taxonomy[];
    modeTravails: Taxonomy[];
    langues: Taxonomy[];
    niveauLangues: Taxonomy[];
    specialisations: Taxonomy[];
};

type HardFilterKey =
    | 'poste'
    | 'niveau_experience'
    | 'formation_juridique'
    | 'salaire'
    | 'ville'
    | 'type_travail'
    | 'mode_travail';

type HardFilterState = { enabled: boolean; value: number | null };

type LangueRequirement = {
    taxonomy_id: number | null;
    importance: string;
    niveau_langue_id: number | null;
};
type SpecialisationRequirement = { taxonomy_id: number | null };

const relationKey: Record<HardFilterKey, string> = {
    poste: 'poste',
    niveau_experience: 'niveau_experience',
    formation_juridique: 'formation_juridique',
    salaire: 'salaire',
    ville: 'ville',
    type_travail: 'type_travail',
    mode_travail: 'mode_travail',
};

const hardFilters: {
    key: HardFilterKey;
    labelKey: string;
    taxonomiesKey: keyof Taxonomies;
}[] = [
    {
        key: 'poste',
        labelKey: 'admin_offers.custom_matching.filters.poste',
        taxonomiesKey: 'postes',
    },
    {
        key: 'niveau_experience',
        labelKey: 'admin_offers.custom_matching.filters.niveau_experience',
        taxonomiesKey: 'niveauExperiences',
    },
    {
        key: 'formation_juridique',
        labelKey: 'admin_offers.custom_matching.filters.formation_juridique',
        taxonomiesKey: 'formationJuridiques',
    },
    {
        key: 'salaire',
        labelKey: 'admin_offers.custom_matching.filters.salaire',
        taxonomiesKey: 'salaires',
    },
    {
        key: 'ville',
        labelKey: 'admin_offers.custom_matching.filters.ville',
        taxonomiesKey: 'villes',
    },
    {
        key: 'type_travail',
        labelKey: 'admin_offers.custom_matching.filters.type_travail',
        taxonomiesKey: 'typeTravails',
    },
    {
        key: 'mode_travail',
        labelKey: 'admin_offers.custom_matching.filters.mode_travail',
        taxonomiesKey: 'modeTravails',
    },
];

const importanceLevels = (t: (key: string) => string) => [
    {
        value: 'indispensable',
        label: t('admin_offers.custom_matching.importance.indispensable'),
        className: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
        value: 'important',
        label: t('admin_offers.custom_matching.importance.important'),
        className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
        value: 'souhaitable',
        label: t('admin_offers.custom_matching.importance.souhaitable'),
        className: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
        value: 'facultatif',
        label: t('admin_offers.custom_matching.importance.facultatif'),
        className: 'bg-slate-50 text-slate-600 border-slate-200',
    },
];

function initFilters(offre: OffreItem): Record<HardFilterKey, HardFilterState> {
    const state = {} as Record<HardFilterKey, HardFilterState>;

    for (const { key } of hardFilters) {
        const relation = (
            offre as unknown as Record<string, { id?: number } | undefined>
        )[relationKey[key]];
        state[key] = {
            enabled: relation?.id != null,
            value: relation?.id ?? null,
        };
    }

    return state;
}

function initLangues(offre: OffreItem): LangueRequirement[] {
    return (offre.requirements ?? [])
        .filter((requirement) => requirement.taxonomy_type === 'LANGUE')
        .map((requirement) => ({
            taxonomy_id: requirement.taxonomy_id,
            importance: requirement.metadata?.importance ?? 'important',
            niveau_langue_id: requirement.metadata?.niveau_langue_id ?? null,
        }));
}

function initSpecialisations(offre: OffreItem): SpecialisationRequirement[] {
    return (offre.requirements ?? [])
        .filter((requirement) => requirement.taxonomy_type === 'SPECIALISATION')
        .map((requirement) => ({ taxonomy_id: requirement.taxonomy_id }));
}

export default function MatchingCriteriaModal({
    open,
    onOpenChange,
    offre,
    taxonomies,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    offre: OffreItem;
    taxonomies: Taxonomies;
}) {
    const { t } = useTranslation();

    const [filters, setFilters] = useState<
        Record<HardFilterKey, HardFilterState>
    >(() => initFilters(offre));
    const [langues, setLangues] = useState<LangueRequirement[]>(() =>
        initLangues(offre),
    );
    const [specialisations, setSpecialisations] = useState<
        SpecialisationRequirement[]
    >(() => initSpecialisations(offre));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const firstOption = (key: keyof Taxonomies): number | null =>
        taxonomies[key]?.[0]?.id ?? null;

    const toggleFilter = (key: HardFilterKey) => {
        setFilters((current) => {
            const filter = current[key];
            const enabled = !filter.enabled;

            return {
                ...current,
                [key]: {
                    enabled,
                    value:
                        enabled && filter.value == null
                            ? firstOption(
                                  hardFilters.find((item) => item.key === key)!
                                      .taxonomiesKey,
                              )
                            : filter.value,
                },
            };
        });
    };

    const setFilterValue = (key: HardFilterKey, value: string) => {
        setFilters((current) => ({
            ...current,
            [key]: {
                ...current[key],
                value: value === 'none' ? null : Number(value),
            },
        }));
    };

    const addLangue = () => {
        setLangues((current) => [
            ...current,
            {
                taxonomy_id: null,
                importance: 'important',
                niveau_langue_id: null,
            },
        ]);
    };

    const updateLangue = (
        index: number,
        updates: Partial<LangueRequirement>,
    ) => {
        setLangues((current) =>
            current.map((item, i) =>
                i === index ? { ...item, ...updates } : item,
            ),
        );
    };

    const removeLangue = (index: number) => {
        setLangues((current) => current.filter((_, i) => i !== index));
    };

    const addSpecialisation = () => {
        setSpecialisations((current) => [...current, { taxonomy_id: null }]);
    };

    const updateSpecialisation = (index: number, taxonomyId: number | null) => {
        setSpecialisations((current) =>
            current.map((item, i) =>
                i === index ? { ...item, taxonomy_id: taxonomyId } : item,
            ),
        );
    };

    const removeSpecialisation = (index: number) => {
        setSpecialisations((current) => current.filter((_, i) => i !== index));
    };

    const handleLaunch = () => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        router.post(
            `/admin/offres/${offre.id}/matching/custom`,
            {
                poste_id: filters.poste.enabled ? filters.poste.value : null,
                niveau_experience_id: filters.niveau_experience.enabled
                    ? filters.niveau_experience.value
                    : null,
                formation_juridique_id: filters.formation_juridique.enabled
                    ? filters.formation_juridique.value
                    : null,
                salaire_id: filters.salaire.enabled
                    ? filters.salaire.value
                    : null,
                ville_id: filters.ville.enabled ? filters.ville.value : null,
                type_travail_id: filters.type_travail.enabled
                    ? filters.type_travail.value
                    : null,
                mode_travail_id: filters.mode_travail.enabled
                    ? filters.mode_travail.value
                    : null,
                requirements: [
                    ...langues
                        .filter((langue) => langue.taxonomy_id != null)
                        .map((langue) => ({
                            taxonomy_type: 'LANGUE',
                            taxonomy_id: langue.taxonomy_id,
                            metadata: {
                                importance: langue.importance,
                                niveau_langue_id: langue.niveau_langue_id,
                            },
                        })),
                    ...specialisations
                        .filter(
                            (specialisation) =>
                                specialisation.taxonomy_id != null,
                        )
                        .map((specialisation) => ({
                            taxonomy_type: 'SPECIALISATION',
                            taxonomy_id: specialisation.taxonomy_id,
                            metadata: {},
                        })),
                ],
            },
            {
                preserveScroll: true,
                onSuccess: () => onOpenChange(false),
                onError: (errors) => {
                    setError(
                        errors.offre ||
                            Object.values(errors)[0] ||
                            t('admin_offers.custom_matching.error_generic'),
                    );
                },
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-none border-[#1a1f1e]/10 sm:max-w-2xl">
                <DialogHeader className="text-left">
                    <DialogTitle
                        className="text-2xl font-light text-[#1a1f1e]"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        {t('admin_offers.custom_matching.modal_title')}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#1a1f1e]/60">
                        {t('admin_offers.custom_matching.modal_description')}
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[65vh] space-y-8 overflow-y-auto pr-1">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 border-b border-[#1a1f1e]/8 pb-2">
                            <SlidersHorizontal className="h-4 w-4 text-[#C06041]" />
                            <h3 className="text-xs font-medium tracking-[0.2em] text-[#1a1f1e]/50 uppercase">
                                {t(
                                    'admin_offers.custom_matching.filters_title',
                                )}
                            </h3>
                        </div>

                        <p className="text-[11px] text-[#1a1f1e]/45">
                            {t('admin_offers.custom_matching.filters_hint')}
                        </p>

                        <div className="divide-y divide-[#1a1f1e]/6 border border-[#1a1f1e]/8 bg-white">
                            {hardFilters.map(
                                ({ key, labelKey, taxonomiesKey }) => {
                                    const filter = filters[key];
                                    const options =
                                        taxonomies[taxonomiesKey] ?? [];

                                    return (
                                        <div
                                            key={key}
                                            className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <label className="flex items-center gap-2.5">
                                                <input
                                                    type="checkbox"
                                                    checked={filter.enabled}
                                                    onChange={() =>
                                                        toggleFilter(key)
                                                    }
                                                    className="h-4 w-4 accent-[#1a1f1e]"
                                                />
                                                <span className="text-sm text-[#1a1f1e]/80">
                                                    {t(labelKey)}
                                                </span>
                                            </label>

                                            <Select
                                                value={
                                                    filter.value != null
                                                        ? String(filter.value)
                                                        : 'none'
                                                }
                                                onValueChange={(value) =>
                                                    setFilterValue(key, value)
                                                }
                                                disabled={!filter.enabled}
                                            >
                                                <SelectTrigger
                                                    size="sm"
                                                    className={`w-full rounded-none border-[#1a1f1e]/15 bg-white text-xs sm:w-56 ${
                                                        !filter.enabled
                                                            ? 'opacity-40'
                                                            : ''
                                                    }`}
                                                >
                                                    <SelectValue
                                                        placeholder={t(
                                                            'admin_offers.custom_matching.select_placeholder',
                                                        )}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none">
                                                    <SelectItem value="none">
                                                        {t(
                                                            'admin_offers.custom_matching.none',
                                                        )}
                                                    </SelectItem>
                                                    {options.map((option) => (
                                                        <SelectItem
                                                            key={option.id}
                                                            value={String(
                                                                option.id,
                                                            )}
                                                        >
                                                            {option.nom}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#1a1f1e]/8 pb-2">
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-[#C06041]" />
                                <h3 className="text-xs font-medium tracking-[0.2em] text-[#1a1f1e]/50 uppercase">
                                    {t(
                                        'admin_offers.custom_matching.languages_title',
                                    )}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={addLangue}
                                className="inline-flex items-center gap-1 text-[11px] tracking-wider text-[#C06041] uppercase hover:underline"
                            >
                                <Plus className="h-3 w-3" />
                                {t('admin_offers.custom_matching.add_language')}
                            </button>
                        </div>

                        {langues.length === 0 ? (
                            <p className="border border-dashed border-[#1a1f1e]/12 px-4 py-5 text-center text-xs text-[#1a1f1e]/35">
                                {t(
                                    'admin_offers.custom_matching.languages_empty',
                                )}
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {langues.map((langue, index) => (
                                    <div
                                        key={index}
                                        className="border border-[#1a1f1e]/8 bg-white p-4"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <Select
                                                value={
                                                    langue.taxonomy_id != null
                                                        ? String(
                                                              langue.taxonomy_id,
                                                          )
                                                        : 'none'
                                                }
                                                onValueChange={(value) =>
                                                    updateLangue(index, {
                                                        taxonomy_id:
                                                            value === 'none'
                                                                ? null
                                                                : Number(value),
                                                    })
                                                }
                                            >
                                                <SelectTrigger
                                                    size="sm"
                                                    className="w-full rounded-none border-[#1a1f1e]/15 bg-white text-xs sm:w-52"
                                                >
                                                    <SelectValue
                                                        placeholder={t(
                                                            'admin_offers.custom_matching.select_placeholder',
                                                        )}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none">
                                                    <SelectItem value="none">
                                                        {t(
                                                            'admin_offers.custom_matching.none',
                                                        )}
                                                    </SelectItem>
                                                    {(
                                                        taxonomies.langues ?? []
                                                    ).map((option) => (
                                                        <SelectItem
                                                            key={option.id}
                                                            value={String(
                                                                option.id,
                                                            )}
                                                        >
                                                            {option.nom}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Select
                                                value={
                                                    langue.niveau_langue_id !=
                                                    null
                                                        ? String(
                                                              langue.niveau_langue_id,
                                                          )
                                                        : 'none'
                                                }
                                                onValueChange={(value) =>
                                                    updateLangue(index, {
                                                        niveau_langue_id:
                                                            value === 'none'
                                                                ? null
                                                                : Number(value),
                                                    })
                                                }
                                            >
                                                <SelectTrigger
                                                    size="sm"
                                                    className="w-full rounded-none border-[#1a1f1e]/15 bg-white text-xs sm:w-40"
                                                >
                                                    <SelectValue
                                                        placeholder={t(
                                                            'admin_offers.custom_matching.languages_level',
                                                        )}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none">
                                                    <SelectItem value="none">
                                                        {t(
                                                            'admin_offers.custom_matching.none',
                                                        )}
                                                    </SelectItem>
                                                    {(
                                                        taxonomies.niveauLangues ??
                                                        []
                                                    ).map((option) => (
                                                        <SelectItem
                                                            key={option.id}
                                                            value={String(
                                                                option.id,
                                                            )}
                                                        >
                                                            {option.nom}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeLangue(index)
                                                }
                                                className="text-[#1a1f1e]/35 transition-colors hover:text-rose-600"
                                                aria-label={t(
                                                    'admin_offers.custom_matching.remove',
                                                )}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {importanceLevels(t).map(
                                                (importance) => (
                                                    <button
                                                        key={importance.value}
                                                        type="button"
                                                        onClick={() =>
                                                            updateLangue(
                                                                index,
                                                                {
                                                                    importance:
                                                                        importance.value,
                                                                },
                                                            )
                                                        }
                                                        className={`rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                                                            langue.importance ===
                                                            importance.value
                                                                ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                                                : importance.className
                                                        }`}
                                                    >
                                                        {importance.label}
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#1a1f1e]/8 pb-2">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-[#C06041]" />
                                <h3 className="text-xs font-medium tracking-[0.2em] text-[#1a1f1e]/50 uppercase">
                                    {t(
                                        'admin_offers.custom_matching.specialisations_title',
                                    )}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={addSpecialisation}
                                className="inline-flex items-center gap-1 text-[11px] tracking-wider text-[#C06041] uppercase hover:underline"
                            >
                                <Plus className="h-3 w-3" />
                                {t(
                                    'admin_offers.custom_matching.add_specialisation',
                                )}
                            </button>
                        </div>

                        {specialisations.length === 0 ? (
                            <p className="border border-dashed border-[#1a1f1e]/12 px-4 py-5 text-center text-xs text-[#1a1f1e]/35">
                                {t(
                                    'admin_offers.custom_matching.specialisations_empty',
                                )}
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {specialisations.map(
                                    (specialisation, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-3 border border-[#1a1f1e]/8 bg-white p-4"
                                        >
                                            <Select
                                                value={
                                                    specialisation.taxonomy_id !=
                                                    null
                                                        ? String(
                                                              specialisation.taxonomy_id,
                                                          )
                                                        : 'none'
                                                }
                                                onValueChange={(value) =>
                                                    updateSpecialisation(
                                                        index,
                                                        value === 'none'
                                                            ? null
                                                            : Number(value),
                                                    )
                                                }
                                            >
                                                <SelectTrigger
                                                    size="sm"
                                                    className="w-full rounded-none border-[#1a1f1e]/15 bg-white text-xs"
                                                >
                                                    <SelectValue
                                                        placeholder={t(
                                                            'admin_offers.custom_matching.select_placeholder',
                                                        )}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none">
                                                    <SelectItem value="none">
                                                        {t(
                                                            'admin_offers.custom_matching.none',
                                                        )}
                                                    </SelectItem>
                                                    {(
                                                        taxonomies.specialisations ??
                                                        []
                                                    ).map((option) => (
                                                        <SelectItem
                                                            key={option.id}
                                                            value={String(
                                                                option.id,
                                                            )}
                                                        >
                                                            {option.domaine
                                                                ? `${option.domaine} · ${option.nom}`
                                                                : option.nom}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSpecialisation(index)
                                                }
                                                className="shrink-0 text-[#1a1f1e]/35 transition-colors hover:text-rose-600"
                                                aria-label={t(
                                                    'admin_offers.custom_matching.remove',
                                                )}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {error}
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-2">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                        className="border border-[#1a1f1e]/15 px-4 py-2 text-xs font-medium tracking-wider text-[#1a1f1e]/60 uppercase transition-colors hover:border-[#1a1f1e]/40 hover:text-[#1a1f1e]"
                    >
                        {t('admin_offers.custom_matching.cancel')}
                    </button>
                    <button
                        type="button"
                        onClick={handleLaunch}
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 bg-[#1a1f1e] px-5 py-2 text-xs font-medium tracking-wider text-white uppercase transition-opacity disabled:opacity-40"
                    >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        {isSubmitting
                            ? t('admin_offers.custom_matching.launching')
                            : t('admin_offers.custom_matching.launch')}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

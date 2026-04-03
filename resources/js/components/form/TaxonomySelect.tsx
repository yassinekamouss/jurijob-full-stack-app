import { getTaxonomyLabel, useLoadingTaxonomy } from '@/hooks/use-taxonomies';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface Taxonomy {
    id: number;
    nom: string;
}

interface TaxonomySelectProps {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    taxonomies: Taxonomy[] | undefined;
    placeholder?: string;
    icon?: LucideIcon;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}

export default function TaxonomySelect({
    label,
    value,
    onChange,
    taxonomies,
    placeholder = 'Sélectionner une option',
    icon: Icon,
    error,
    required = false,
    disabled = false,
    children,
}: TaxonomySelectProps) {
    const isLoading = useLoadingTaxonomy(taxonomies);

    return (
        <div className="space-y-2">
            <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30 pointer-events-none" />
                )}
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled || isLoading}
                    required={required}
                    className={`w-full cursor-pointer appearance-none rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] ${
                        Icon ? 'pl-12' : 'px-5'
                    } py-4 pr-10 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0 ${
                        error ? 'border-red-500 border-2' : ''
                    } ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <option value="">{placeholder}</option>
                    {isLoading ? (
                        <option disabled>Chargement...</option>
                    ) : (
                        taxonomies?.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.nom}
                            </option>
                        ))
                    )}
                    {children}
                </select>
                {/* Chevron */}
                <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
                    <svg
                        className="h-4 w-4 text-[#1a1f1e]/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
            {error && (
                <p className="ml-1 text-xs font-bold text-red-500">{error}</p>
            )}
        </div>
    );
}

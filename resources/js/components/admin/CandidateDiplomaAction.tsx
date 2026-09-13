import { useTranslation } from 'react-i18next';
import { FileText, ExternalLink, ChevronDown } from 'lucide-react';
import { diploma as adminDiploma } from '@/routes/admin/candidates';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface FormationDiplomaItem {
    id: number;
    has_diploma?: boolean;
    formation_juridique?: {
        id?: number;
        nom?: string;
    } | null;
    ecole?: {
        id?: number;
        nom?: string;
    } | null;
    autre_ecole?: string | null;
    annee_fin?: number | string | null;
}

interface CandidateDiplomaActionProps {
    formations?: FormationDiplomaItem[];
    className?: string;
    stopPropagation?: boolean;
}

export default function CandidateDiplomaAction({
    formations,
    className = '',
    stopPropagation = false,
}: CandidateDiplomaActionProps) {
    const { t } = useTranslation();

    const diplomas = (formations || []).filter((f) => f.has_diploma);

    // Case 0: No diploma attached
    if (diplomas.length === 0) {
        return (
            <span
                className={`inline-flex items-center gap-1.5 border border-[#1a1f1e]/15 bg-[#1a1f1e]/5 px-2.5 py-1.5 text-xs font-medium tracking-wider text-[#1a1f1e]/40 uppercase select-none rounded-sm ${className}`}
                title={t('admin_candidates.actions.no_diploma')}
                onClick={(e) => {
                    if (stopPropagation) {
                        e.stopPropagation();
                    }
                }}
            >
                <FileText className="h-3.5 w-3.5 opacity-40 shrink-0" />
                <span className="truncate">{t('admin_candidates.actions.no_diploma')}</span>
            </span>
        );
    }

    // Case 1: Exactly one diploma
    if (diplomas.length === 1) {
        const form = diplomas[0];

        return (
            <a
                href={adminDiploma(form.id).url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    if (stopPropagation) {
                        e.stopPropagation();
                    }
                }}
                className={`inline-flex items-center gap-1.5 border border-[#C06041] bg-[#C06041]/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-[#C06041] uppercase transition-all duration-150 hover:bg-[#C06041] hover:text-white rounded-sm shadow-xs ${className}`}
                title={t('admin_candidates.actions.view_diploma')}
            >
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{t('admin_candidates.actions.view_diploma')}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-80" />
            </a>
        );
    }

    // Case 2+: Multiple diplomas (using portalled Radix DropdownMenu to prevent any clipping)
    return (
        <div
            className={`inline-block ${className}`}
            onClick={(e) => {
                if (stopPropagation) {
                    e.stopPropagation();
                }
            }}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        onClick={(e) => {
                            if (stopPropagation) {
                                e.stopPropagation();
                            }
                        }}
                        className="inline-flex items-center gap-2 border border-[#C06041] bg-[#C06041]/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-[#C06041] uppercase transition-all duration-150 hover:bg-[#C06041] hover:text-white rounded-sm shadow-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C06041]/40"
                        title={t('admin_candidates.actions.view_diplomas', {
                            count: diplomas.length,
                        })}
                    >
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span>
                            {t('admin_candidates.actions.view_diplomas', {
                                count: diplomas.length,
                            })}
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-80 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    side="top"
                    sideOffset={8}
                    className="w-80 border border-[#1a1f1e]/15 bg-white p-1.5 shadow-2xl rounded-md z-50 text-[#1a1f1e]"
                    onClick={(e) => {
                        if (stopPropagation) {
                            e.stopPropagation();
                        }
                    }}
                >
                    <DropdownMenuLabel className="px-2.5 py-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1a1f1e] uppercase">
                                <FileText className="h-3.5 w-3.5 text-[#C06041]" />
                                {t('admin_candidates.actions.diplomas_list_title')}
                            </span>
                            <span className="rounded-full bg-[#C06041]/10 px-2 py-0.5 text-[10px] font-bold text-[#C06041]">
                                {diplomas.length} PDF
                            </span>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-1 bg-[#1a1f1e]/8" />

                    <div className="space-y-1 py-1">
                        {diplomas.map((form) => (
                            <DropdownMenuItem
                                key={form.id}
                                asChild
                                className="p-0 focus:bg-transparent"
                            >
                                <a
                                    href={adminDiploma(form.id).url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        if (stopPropagation) {
                                            e.stopPropagation();
                                        }
                                    }}
                                    className="group flex items-center justify-between gap-3 rounded-sm border border-transparent p-2.5 text-xs text-[#1a1f1e] transition-colors hover:border-[#C06041]/30 hover:bg-[#C06041]/5 hover:text-[#C06041] cursor-pointer"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-semibold text-[#1a1f1e] group-hover:text-[#C06041]">
                                            {form.formation_juridique?.nom ||
                                                t('admin_candidates.details.education')}
                                        </p>
                                        <p className="truncate text-[11px] text-[#1a1f1e]/60">
                                            {form.ecole?.nom ||
                                                form.autre_ecole ||
                                                ''}
                                            {form.annee_fin
                                                ? ` (${form.annee_fin})`
                                                : ''}
                                        </p>
                                    </div>
                                    <span className="inline-flex shrink-0 items-center gap-1 border border-[#C06041]/40 bg-[#C06041]/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-[#C06041] uppercase group-hover:bg-[#C06041] group-hover:text-white transition-colors">
                                        PDF
                                        <ExternalLink className="h-3 w-3" />
                                    </span>
                                </a>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

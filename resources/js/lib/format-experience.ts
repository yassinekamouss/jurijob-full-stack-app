export function formatExactExperience(
    months: number,
    t: (key: string, options?: any) => string,
): string {
    if (months === 0) {
        return t('recruiter.profiles.exact_experience.no_experience');
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const parts: string[] = [];
    if (years > 0) {
        parts.push(
            t('recruiter.profiles.exact_experience.years', { count: years }),
        );
    }
    if (remainingMonths > 0) {
        parts.push(
            t('recruiter.profiles.exact_experience.months', {
                count: remainingMonths,
            }),
        );
    }

    return (
        parts.join(t('recruiter.profiles.exact_experience.and')) +
        t('recruiter.profiles.exact_experience.of_experience')
    );
}

export function formatCandidateExperienceLabel(
    niveauExperienceNom: string | null | undefined,
    exactExperienceMonths: number | null | undefined,
    t: (key: string, options?: any) => string,
): string | null {
    if (!niveauExperienceNom) {
        return null;
    }

    const baseTitle = niveauExperienceNom.split('(')[0].trim();

    if (
        exactExperienceMonths !== undefined &&
        exactExperienceMonths !== null
    ) {
        return `${baseTitle} (${formatExactExperience(exactExperienceMonths, t)})`;
    }

    return niveauExperienceNom;
}

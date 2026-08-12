<?php

namespace App\Models\Taxonomy\Concerns;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait HasLocalizedTaxonomyLabel
{
    public function localizedNom(?string $locale = null): string
    {
        $locale ??= app()->getLocale();

        if ($locale === 'en') {
            return filled($this->attributes['nom_en'] ?? null)
                ? (string) $this->attributes['nom_en']
                : (string) ($this->attributes['nom_fr'] ?? '');
        }

        return (string) ($this->attributes['nom_fr'] ?? '');
    }

    protected function nom(): Attribute
    {
        return Attribute::get(fn (): string => $this->localizedNom());
    }

    public function initializeHasLocalizedTaxonomyLabel(): void
    {
        $this->append('nom');
    }
}

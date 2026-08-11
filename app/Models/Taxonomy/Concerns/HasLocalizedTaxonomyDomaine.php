<?php

namespace App\Models\Taxonomy\Concerns;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait HasLocalizedTaxonomyDomaine
{
    public function localizedDomaine(?string $locale = null): ?string
    {
        $locale ??= app()->getLocale();

        if ($locale === 'en') {
            return filled($this->attributes['domaine_en'] ?? null)
                ? (string) $this->attributes['domaine_en']
                : ($this->attributes['domaine_fr'] ?? null);
        }

        return $this->attributes['domaine_fr'] ?? null;
    }

    protected function domaine(): Attribute
    {
        return Attribute::get(fn (): ?string => $this->localizedDomaine());
    }
}

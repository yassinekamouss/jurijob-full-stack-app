<?php

if (! function_exists('__t')) {
    /**
     * Get translation key from JSON file supporting dot notation.
     */
    function __t(string $key, array $replace = [], ?string $locale = null): string
    {
        static $translations = [];

        $locale = $locale ?? app()->getLocale();

        if (! isset($translations[$locale])) {
            $path = lang_path("{$locale}.json");
            $translations[$locale] = file_exists($path)
                ? (json_decode((string) file_get_contents($path), true) ?? [])
                : [];
        }

        $value = data_get($translations[$locale], $key, $key);

        if (is_array($value)) {
            return $key;
        }

        foreach ($replace as $k => $v) {
            $value = str_replace(":{$k}", (string) $v, (string) $value);
        }

        return (string) $value;
    }
}

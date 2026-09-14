<?php

namespace App\Services;

use App\Models\Taxonomy\Pays;
use libphonenumber\PhoneNumberUtil;
use Throwable;

class PhoneCountryResolver
{
    /**
     * Cached map of ISO country codes to Pays IDs.
     *
     * @var array<string, int>|null
     */
    protected static ?array $countryCodeMap = null;

    /**
     * Default country ID (Morocco).
     */
    protected static ?int $defaultPaysId = null;

    /**
     * Resolve the Pays ID corresponding to a given phone number.
     */
    public static function resolveId(?string $phone): int
    {
        self::ensureCountryMapLoaded();

        if (empty($phone)) {
            return self::$defaultPaysId ?? 1;
        }

        $clean = self::sanitizePhoneNumber($phone);
        if (empty($clean)) {
            return self::$defaultPaysId ?? 1;
        }

        try {
            $phoneUtil = PhoneNumberUtil::getInstance();
            $parsed = $phoneUtil->parse($clean, 'MA');

            if ($phoneUtil->isValidNumber($parsed) || $phoneUtil->isPossibleNumber($parsed)) {
                $regionCode = $phoneUtil->getRegionCodeForNumber($parsed);

                if ($regionCode && isset(self::$countryCodeMap[$regionCode])) {
                    return self::$countryCodeMap[$regionCode];
                }
            }
        } catch (Throwable) {
            // Fallback on error
        }

        return self::$defaultPaysId ?? 1;
    }

    /**
     * Clean and normalize a raw telephone string for parsing.
     */
    public static function sanitizePhoneNumber(string $phone): string
    {
        $clean = preg_replace('/[^\d+]/', '', trim($phone));

        if (empty($clean)) {
            return '';
        }

        if (str_starts_with($clean, '00')) {
            $clean = '+'.substr($clean, 2);
        } elseif (! str_starts_with($clean, '+')) {
            // Moroccan local format: 05, 06, 07 followed by 8 digits
            if (preg_match('/^0[5-7]\d{8}$/', $clean)) {
                $clean = '+212'.substr($clean, 1);
            } else {
                $clean = '+'.$clean;
            }
        }

        return $clean;
    }

    /**
     * Refresh the cached countries map in memory.
     */
    public static function resetCache(): void
    {
        self::$countryCodeMap = null;
        self::$defaultPaysId = null;
    }

    /**
     * Ensure the country code to ID lookup map is cached in memory.
     */
    protected static function ensureCountryMapLoaded(): void
    {
        if (self::$countryCodeMap === null) {
            self::$countryCodeMap = Pays::pluck('id', 'code')
                ->map(fn ($id) => (int) $id)
                ->toArray();

            self::$defaultPaysId = self::$countryCodeMap['MA'] ?? 1;
        }
    }
}

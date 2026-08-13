<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberUtil;

class ValidPhoneNumber implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === null || $value === '') {
            return;
        }

        if (! str_starts_with($value, '+')) {
            $fail('Le numéro de téléphone doit inclure l\'indicatif pays (ex : +212...).');

            return;
        }

        $phoneUtil = PhoneNumberUtil::getInstance();

        try {
            $number = $phoneUtil->parse($value, 'MA');
        } catch (NumberParseException) {
            $fail('Le numéro de téléphone est invalide.');

            return;
        }

        if (! $phoneUtil->isValidNumber($number)) {
            $fail('Le numéro de téléphone est invalide.');
        }
    }
}

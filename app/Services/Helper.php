<?php

namespace App\Services;

use Illuminate\Support\Str;
use Propaganistas\LaravelPhone\PhoneNumber;

class Helper{
    public static function create_filename($extension){
        return Str::lower(hash('xxh64', Str::random(10)) . "." . $extension);
    }

    public static function nice_display($string){
        return Str::title(str_replace("_", " ", $string));
    }

    public static function format_phone($contact_number)
    {
        $contact_number = new PhoneNumber($contact_number);

        if (is_null($contact_number->getCountry())) {
            $contact_number = new PhoneNumber($contact_number, "PH");
        }

        $contact_number = $contact_number->formatE164();

        return $contact_number;
    }

    public static function money_format($amount)
    {
        $amount = str_replace(',', '', $amount);

        if ($amount) {
            return number_format($amount, 2, '.', ',');
        }

        return number_format(0, 2, '.', ',');;
    }

    public static function db_amount($number, $sepator = '')
    {
        $amount = str_replace(',', '', $number);

        return number_format($amount, 2, '.', $sepator);
    }
}
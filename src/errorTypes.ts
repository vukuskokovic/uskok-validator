export type ErrorCodes = 
    "not_provided" | "wrong_type" | "is_null" | "validator_failed" | //general
    "string_too_long" | "string_too_short" | "string_not_valid_value" | "string_regex_failed" | //strings
    "number_too_big" | "number_too_small" | "number_not_int" | //numbers
    "array_too_short" | "array_too_long"; //array
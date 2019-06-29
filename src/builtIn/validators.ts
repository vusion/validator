import { Validator } from '../types';

const stringify = (value: any): string => value === undefined || value === null ? '' : String(value);

const validators = {
    required: (value: any): boolean => !!stringify(value),
    filled: (value: any): boolean => !!stringify(value).trim(),
    empty: (value: any): boolean => !stringify(value),
    min: (value: any, min: any): boolean => value >= min,
    max: (value: any, max: any): boolean => value <= max,
    range: (value: any, min: any, max: any): boolean => min <= value && value <= max,
    minLength: (value: any, min: any): boolean => stringify(value).length >= min,
    maxLength: (value: any, max: any): boolean => stringify(value).length <= max,
    regexp: (value: any, re: string | RegExp): boolean => new RegExp(re).test(value),
    equal: (value: any, arg: any): boolean => value === arg,
} as { [prop: string]: Validator };

validators.pattern = validators.regexp;

export default validators;

// oneOf: (value: any, )
// type: (value: any, )

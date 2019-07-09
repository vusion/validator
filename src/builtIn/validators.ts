import { Validator } from '../types';
import * as _ from 'validator';

const stringify = (value: any): string => value === undefined || value === null ? '' : String(value);

const validators = {
    required: (value: any): boolean => !!stringify(value),
    filled: (value: any): boolean => !!stringify(value).trim(),
    // array
    empty: (value: any): boolean => !stringify(value),
    pattern: (value: any, re: string | RegExp): boolean => new RegExp(re).test(value),
    minLength: (value: any, min: any): boolean => stringify(value).length >= min,
    maxLength: (value: any, max: any): boolean => stringify(value).length <= max,
    rangeLength: (value: any, min: any, max: any): boolean => {
        const length = stringify(value).length;
        return  min <= length && length <= max;
    },
    min: (value: any, min: any): boolean => value >= min,
    max: (value: any, max: any): boolean => value <= max,
    range: (value: any, min: any, max: any): boolean => min <= value && value <= max,
    string: (value: any): boolean => typeof value === 'string',
    number: (value: any): boolean => typeof value === 'number',
    numeric: (value: any): boolean => _.isNumeric(stringify(value)),
    alpha: (value: any): boolean => _.isAlpha(stringify(value)),
    alphaNumeric: (value: any): boolean => _.isAlphanumeric(stringify(value)),
    integer: (value: any): boolean => _.isInt(stringify(value)),
    decimal: (value: any): boolean => _.isDecimal(stringify(value)),
    email: (value: any): boolean => _.isEmail(stringify(value)),
    ip: (value: any, version: number): boolean => _.isIP(stringify(value), version),
    // ipRange: (value: any): boolean => _.isIPRange(stringify(value)),
    port: (value: any) => _.isPort(stringify(value)),
    url: (value: any) => _.isURL(stringify(value)),
    macAddress: (value: any): boolean => _.isMACAddress(stringify(value)),
    md5: (value: any): boolean => _.isMD5(stringify(value)),
    equals: (value: any, arg: any): boolean => value === arg,
    '^az': (value: any): boolean => /^[a-z]/.test(value),
    '^az09': (value: any): boolean => /^[a-z0-9]/.test(value),
    '^az09-_': (value: any): boolean => /^[a-z0-9-_]/.test(value),
    '^az09.': (value: any): boolean => /^[a-z0-9.]/.test(value),
    '^azAZ': (value: any): boolean => /^[a-zA-Z]/.test(value),
    '^azAZ09_': (value: any): boolean => /^[a-z0-9-_]/.test(value),
    'az09$': (value: any): boolean => /^[a-z0-9]/.test(value),
    'azAZ09$': (value: any): boolean => /^[a-zA-Z0-9]/.test(value),
    '^09$': (value: any): boolean => /^[0-9]$/.test(value),
    '^az09-$': (value: any): boolean => /^[a-z0-9-]$/.test(value),
    '^az09-.$': (value: any): boolean => /^[a-z0-9-.]$/.test(value),
    '^azAZ09$': (value: any): boolean => /^[a-zA-Z0-9]$/.test(value),
    '^azAZ09-$': (value: any): boolean => /^[a-zA-Z0-9-]$/.test(value),
    '^azAZ09_$': (value: any): boolean => /^[a-zA-Z0-9_]$/.test(value),
    '^azAZ09-_$': (value: any): boolean => /^[a-zA-Z0-9-_]$/.test(value),
    '^azAZ09-_.$': (value: any): boolean => /^[a-zA-Z0-9-_.]$/.test(value),
    'without--': (value: any): boolean => !/-{2,}/.test(value),
    'without__': (value: any): boolean => !/_{2,}/.test(value),
} as { [prop: string]: Validator };

validators.pattern = validators.regexp;

export default validators;

// oneOf: (value: any, )
// type: (value: any, )

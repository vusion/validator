import { Validator } from '../types';
const isPlainObject = require('lodash/isPlainObject');
const isEqual = require('lodash/isEqual');
import * as $ from 'validator';

const isNil = (value: any): boolean => value === undefined || value === null || value === '';
const isEmpty = (value: any): boolean => {
    if (isNil(value))
        return true;
    else if (Array.isArray(value))
        return !value.length;
    else if (value instanceof Object)
        return !Object.keys(value).length;
    else
        return false;
}
const stringify = (value: any): string => {
    if (isNil(value))
        return '';
    else if (Array.isArray(value))
        return `[${value}]`;
    else
        return String(value);
}

// 非必填验证不需要为空判断，验证时会自动通过
const validators = {
    required: (value: any): boolean => !isNil(value),
    filled: (value: any): boolean => !!stringify(value).trim(),
    notEmpty: (value: any): boolean => !isEmpty(value),
    empty: (value: any): boolean => isEmpty(value),
    minLength: (value: any, min: number): boolean => value.length >= min,
    maxLength: (value: any, max: number): boolean => value.length <= max,
    rangeLength: (value: any, min: number, max: number): boolean => {
        const length = value.length;
        return  min <= length && length <= max;
    },
    min: (value: any, min: any): boolean => value >= min,
    max: (value: any, max: any): boolean => value <= max,
    range: (value: any, min: any, max: any): boolean => min <= value && value <= max,
    pattern: (value: any, re: string | RegExp): boolean => new RegExp(re).test(value),
    is: (value: any, arg: any): boolean => value === arg,
    isNot: (value: any, arg: any): boolean => value !== arg,
    equals: (value: any, arg: any): boolean => isEqual(value, arg),
    notEquals: (value: any, arg: any): boolean => !isEqual(value, arg),
    includes: (value: any, ...args: any[]): boolean => args.every((arg) => value.includes(arg)),
    excludes: (value: any, ...args: any[]): boolean => !args.some((arg) => value.includes(arg)),
    included: (value: any, ...args: any[]): boolean => args.includes(value),
    excluded: (value: any, ...args: any[]): boolean => !args.includes(value),
    string: (value: any): boolean => typeof value === 'string',
    number: (value: any): boolean => typeof value === 'number',
    numeric: (value: any, noSymbols?: boolean): boolean => $.isNumeric(stringify(value), {
        no_symbols: noSymbols,
    }),
    integer: (value: any): boolean => $.isInt(stringify(value)),
    decimal: (value: any, force?: boolean, digits?: string): boolean => $.isDecimal(stringify(value), {
        force_decimal: force,
        decimal_digits: digits,
    }),
    boolean: (value: any): boolean => typeof value === 'boolean',
    function: (value: any): boolean => typeof value === 'function',
    object: (value: any): boolean => typeof value === 'object',
    plainObject: (value: any): boolean => isPlainObject(value),
    array: (value: any): boolean => Array.isArray(value),
    alpha: (value: any): boolean => $.isAlpha(stringify(value)),
    alphaNum: (value: any): boolean => $.isAlphanumeric(stringify(value)),
    email: (value: any): boolean => $.isEmail(stringify(value)),
    ip: (value: any, version: number): boolean => $.isIP(stringify(value), version),
    // ipRange: (value: any): boolean => $.isIPRange(stringify(value)),
    port: (value: any) => $.isPort(stringify(value)),
    url: (value: any) => $.isURL(stringify(value)),
    macAddress: (value: any): boolean => $.isMACAddress(stringify(value)),
    md5: (value: any): boolean => $.isMD5(stringify(value)),
    '^az': (value: any): boolean => /^[a-z]/.test(value),
    '^az09': (value: any): boolean => /^[a-z0-9]/.test(value),
    '^az09_': (value: any): boolean => /^[a-z0-9_]/.test(value),
    '^azAZ': (value: any): boolean => /^[a-zA-Z]/.test(value),
    '^azAZ09': (value: any): boolean => /^[a-zA-Z0-9]/.test(value),
    '^azAZ09_': (value: any): boolean => /^[a-z0-9_]/.test(value),
    'az09$': (value: any): boolean => /[a-z0-9]$/.test(value),
    'azAZ09$': (value: any): boolean => /[a-zA-Z0-9]$/.test(value),
    '^09$': (value: any): boolean => /^[0-9]+$/.test(value),
    '^az09$': (value: any): boolean => /^[a-z0-9]+$/.test(value),
    '^az09-$': (value: any): boolean => /^[a-z0-9-]+$/.test(value),
    '^az09-.$': (value: any): boolean => /^[a-z0-9-.]+$/.test(value),
    '^azAZ09$': (value: any): boolean => /^[a-zA-Z0-9]+$/.test(value),
    '^azAZ09-$': (value: any): boolean => /^[a-zA-Z0-9-]+$/.test(value),
    '^azAZ09_$': (value: any): boolean => /^[a-zA-Z0-9_]+$/.test(value),
    '^azAZ09-_$': (value: any): boolean => /^[a-zA-Z0-9-_]+$/.test(value),
    'without--': (value: any): boolean => !/-{2,}/.test(value),
    'without__': (value: any): boolean => !/_{2,}/.test(value),
} as { [prop: string]: Validator };

export default validators;

// oneOf: (value: any, )
// type: (value: any, )

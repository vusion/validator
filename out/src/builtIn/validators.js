"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject = require('lodash/isPlainObject');
const $ = require("validator");
const isNil = (value) => value === undefined || value === null || value === '';
const isEmpty = (value) => {
    if (isNil(value))
        return true;
    else if (Array.isArray(value))
        return !value.length;
    else if (value instanceof Object)
        return !Object.keys(value).length;
    else
        return false;
};
const stringify = (value) => {
    if (isNil(value))
        return '';
    else if (Array.isArray(value))
        return `[${value}]`;
    else
        return String(value);
};
// 非必填验证不需要为空判断，验证时会自动通过
const validators = {
    required: (value) => !isNil(value),
    filled: (value) => !!stringify(value).trim(),
    notEmpty: (value) => !isEmpty(value),
    empty: (value) => isEmpty(value),
    minLength: (value, min) => value.length >= min,
    maxLength: (value, max) => value.length <= max,
    rangeLength: (value, min, max) => {
        const length = value.length;
        return min <= length && length <= max;
    },
    min: (value, min) => value >= min,
    max: (value, max) => value <= max,
    range: (value, min, max) => min <= value && value <= max,
    pattern: (value, re) => new RegExp(re).test(value),
    equals: (value, arg) => value === arg,
    includes: (value, ...args) => args.every((arg) => value.includes(arg)),
    excludes: (value, ...args) => !args.some((arg) => value.includes(arg)),
    included: (value, ...args) => args.includes(value),
    excluded: (value, ...args) => !args.includes(value),
    string: (value) => typeof value === 'string',
    number: (value) => typeof value === 'number',
    numeric: (value, noSymbols) => $.isNumeric(stringify(value), {
        no_symbols: noSymbols,
    }),
    integer: (value) => $.isInt(stringify(value)),
    decimal: (value, force, digits) => $.isDecimal(stringify(value), {
        force_decimal: force,
        decimal_digits: digits,
    }),
    boolean: (value) => typeof value === 'boolean',
    function: (value) => typeof value === 'function',
    object: (value) => typeof value === 'object',
    plainObject: (value) => isPlainObject(value),
    array: (value) => Array.isArray(value),
    alpha: (value) => $.isAlpha(stringify(value)),
    alphaNumeric: (value) => $.isAlphanumeric(stringify(value)),
    email: (value) => $.isEmail(stringify(value)),
    ip: (value, version) => $.isIP(stringify(value), version),
    // ipRange: (value: any): boolean => $.isIPRange(stringify(value)),
    port: (value) => $.isPort(stringify(value)),
    url: (value) => $.isURL(stringify(value)),
    macAddress: (value) => $.isMACAddress(stringify(value)),
    md5: (value) => $.isMD5(stringify(value)),
    '^az': (value) => /^[a-z]/.test(value),
    '^az09': (value) => /^[a-z0-9]/.test(value),
    '^az09_': (value) => /^[a-z0-9_]/.test(value),
    '^azAZ': (value) => /^[a-zA-Z]/.test(value),
    '^azAZ09': (value) => /^[a-zA-Z0-9]/.test(value),
    '^azAZ09_': (value) => /^[a-z0-9_]/.test(value),
    'az09$': (value) => /^[a-z0-9]/.test(value),
    'azAZ09$': (value) => /^[a-zA-Z0-9]/.test(value),
    '^09$': (value) => /^[0-9]+$/.test(value),
    '^az09$': (value) => /^[a-z0-9]+$/.test(value),
    '^az09-$': (value) => /^[a-z0-9-]+$/.test(value),
    '^az09-.$': (value) => /^[a-z0-9-.]+$/.test(value),
    '^azAZ09$': (value) => /^[a-zA-Z0-9]+$/.test(value),
    '^azAZ09-$': (value) => /^[a-zA-Z0-9-]+$/.test(value),
    '^azAZ09_$': (value) => /^[a-zA-Z0-9_]+$/.test(value),
    '^azAZ09-_$': (value) => /^[a-zA-Z0-9-_]+$/.test(value),
    'without--': (value) => !/-{2,}/.test(value),
    'without__': (value) => !/_{2,}/.test(value),
};
exports.default = validators;
// oneOf: (value: any, )
// type: (value: any, )
//# sourceMappingURL=validators.js.map
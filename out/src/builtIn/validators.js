"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("validator");
const stringify = (value) => value === undefined || value === null ? '' : String(value);
const validators = {
    required: (value) => !!stringify(value),
    filled: (value) => !!stringify(value).trim(),
    // array
    empty: (value) => !stringify(value),
    pattern: (value, re) => new RegExp(re).test(value),
    minLength: (value, min) => stringify(value).length >= min,
    maxLength: (value, max) => stringify(value).length <= max,
    rangeLength: (value, min, max) => {
        const length = stringify(value).length;
        return min <= length && length <= max;
    },
    min: (value, min) => value >= min,
    max: (value, max) => value <= max,
    range: (value, min, max) => min <= value && value <= max,
    string: (value) => typeof value === 'string',
    number: (value) => typeof value === 'number',
    numeric: (value) => _.isNumeric(stringify(value)),
    alpha: (value) => _.isAlpha(stringify(value)),
    alphaNumeric: (value) => _.isAlphanumeric(stringify(value)),
    integer: (value) => _.isInt(stringify(value)),
    decimal: (value) => _.isDecimal(stringify(value)),
    email: (value) => _.isEmail(stringify(value)),
    ip: (value, version) => _.isIP(stringify(value), version),
    // ipRange: (value: any): boolean => _.isIPRange(stringify(value)),
    port: (value) => _.isPort(stringify(value)),
    url: (value) => _.isURL(stringify(value)),
    macAddress: (value) => _.isMACAddress(stringify(value)),
    md5: (value) => _.isMD5(stringify(value)),
    equals: (value, arg) => value === arg,
    includes: (value, ...args) => args.every((arg) => value.includes(arg)),
    excludes: (value, ...args) => !args.some((arg) => value.includes(arg)),
    included: (value, ...args) => args.includes(value),
    excluded: (value, ...args) => !args.includes(value),
    '^az': (value) => /^[a-z]/.test(value),
    '^az09': (value) => /^[a-z0-9]/.test(value),
    '^az09-_': (value) => /^[a-z0-9-_]/.test(value),
    '^az09.': (value) => /^[a-z0-9.]/.test(value),
    '^azAZ': (value) => /^[a-zA-Z]/.test(value),
    '^azAZ09_': (value) => /^[a-z0-9-_]/.test(value),
    'az09$': (value) => /^[a-z0-9]/.test(value),
    'azAZ09$': (value) => /^[a-zA-Z0-9]/.test(value),
    '^09$': (value) => /^[0-9]+$/.test(value),
    '^az09-$': (value) => /^[a-z0-9-]+$/.test(value),
    '^az09-.$': (value) => /^[a-z0-9-.]+$/.test(value),
    '^azAZ09$': (value) => /^[a-zA-Z0-9]+$/.test(value),
    '^azAZ09-$': (value) => /^[a-zA-Z0-9-]+$/.test(value),
    '^azAZ09_$': (value) => /^[a-zA-Z0-9_]+$/.test(value),
    '^azAZ09-_$': (value) => /^[a-zA-Z0-9-_]+$/.test(value),
    '^azAZ09-_.$': (value) => /^[a-zA-Z0-9-_.]+$/.test(value),
    'without--': (value) => !/-{2,}/.test(value),
    'without__': (value) => !/_{2,}/.test(value),
};
exports.default = validators;
// oneOf: (value: any, )
// type: (value: any, )
//# sourceMappingURL=validators.js.map
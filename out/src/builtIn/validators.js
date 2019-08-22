"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject = require('lodash/isPlainObject');
var uniqArray = require('lodash/uniq');
var $ = require("validator");
var isNil = function (value) { return value === undefined || value === null || value === ''; };
var isEmpty = function (value) {
    if (isNil(value))
        return true;
    else if (Array.isArray(value))
        return !value.length;
    else if (value instanceof Object)
        return !Object.keys(value).length;
    else
        return false;
};
var isDuplicated = function (value) {
    return !(value.length === uniqArray(value).length);
};
var stringify = function (value) {
    if (isNil(value))
        return '';
    else if (Array.isArray(value))
        return "[" + value + "]";
    else
        return String(value);
};
// 非必填验证不需要为空判断，验证时会自动通过
var validators = {
    required: function (value) { return !isNil(value); },
    filled: function (value) { return !!stringify(value).trim(); },
    notEmpty: function (value) { return !isEmpty(value); },
    empty: function (value) { return isEmpty(value); },
    minLength: function (value, min) { return value.length >= min; },
    maxLength: function (value, max) { return value.length <= max; },
    rangeLength: function (value, min, max) {
        var length = value.length;
        return min <= length && length <= max;
    },
    min: function (value, min) { return value >= min; },
    max: function (value, max) { return value <= max; },
    range: function (value, min, max) { return min <= value && value <= max; },
    pattern: function (value, re) { return new RegExp(re).test(value); },
    equals: function (value, arg) { return value === arg; },
    includes: function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return args.every(function (arg) { return value.includes(arg); });
    },
    excludes: function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return !args.some(function (arg) { return value.includes(arg); });
    },
    included: function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return args.includes(value);
    },
    excluded: function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return !args.includes(value);
    },
    noDuplicated: function (value) { return !isDuplicated(value); },
    string: function (value) { return typeof value === 'string'; },
    number: function (value) { return typeof value === 'number'; },
    numeric: function (value, noSymbols) { return $.isNumeric(stringify(value), {
        no_symbols: noSymbols,
    }); },
    integer: function (value) { return $.isInt(stringify(value)); },
    decimal: function (value, force, digits) { return $.isDecimal(stringify(value), {
        force_decimal: force,
        decimal_digits: digits,
    }); },
    boolean: function (value) { return typeof value === 'boolean'; },
    function: function (value) { return typeof value === 'function'; },
    object: function (value) { return typeof value === 'object'; },
    plainObject: function (value) { return isPlainObject(value); },
    array: function (value) { return Array.isArray(value); },
    alpha: function (value) { return $.isAlpha(stringify(value)); },
    alphaNumeric: function (value) { return $.isAlphanumeric(stringify(value)); },
    email: function (value) { return $.isEmail(stringify(value)); },
    ip: function (value, version) { return $.isIP(stringify(value), version); },
    // ipRange: (value: any): boolean => $.isIPRange(stringify(value)),
    port: function (value) { return $.isPort(stringify(value)); },
    url: function (value) { return $.isURL(stringify(value)); },
    macAddress: function (value) { return $.isMACAddress(stringify(value)); },
    md5: function (value) { return $.isMD5(stringify(value)); },
    '^az': function (value) { return /^[a-z]/.test(value); },
    '^az09': function (value) { return /^[a-z0-9]/.test(value); },
    '^az09_': function (value) { return /^[a-z0-9_]/.test(value); },
    '^azAZ': function (value) { return /^[a-zA-Z]/.test(value); },
    '^azAZ09': function (value) { return /^[a-zA-Z0-9]/.test(value); },
    '^azAZ09_': function (value) { return /^[a-z0-9_]/.test(value); },
    'az09$': function (value) { return /[a-z0-9]$/.test(value); },
    'azAZ09$': function (value) { return /[a-zA-Z0-9]$/.test(value); },
    '^09$': function (value) { return /^[0-9]+$/.test(value); },
    '^az09$': function (value) { return /^[a-z0-9]+$/.test(value); },
    '^az09-$': function (value) { return /^[a-z0-9-]+$/.test(value); },
    '^az09-.$': function (value) { return /^[a-z0-9-.]+$/.test(value); },
    '^azAZ09$': function (value) { return /^[a-zA-Z0-9]+$/.test(value); },
    '^azAZ09-$': function (value) { return /^[a-zA-Z0-9-]+$/.test(value); },
    '^azAZ09_$': function (value) { return /^[a-zA-Z0-9_]+$/.test(value); },
    '^azAZ09-_$': function (value) { return /^[a-zA-Z0-9-_]+$/.test(value); },
    'without--': function (value) { return !/-{2,}/.test(value); },
    'without__': function (value) { return !/_{2,}/.test(value); },
};
exports.default = validators;
// oneOf: (value: any, )
// type: (value: any, )
//# sourceMappingURL=validators.js.map
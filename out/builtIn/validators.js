var isPlainObject = require('lodash/isPlainObject');
var isEqual = require('lodash/isEqual');
import * as $ from 'validator';
/**
 * 判断是否为空值（简单类型），undefined、null 或 ''
 * @param value
 */
var isNil = function (value) { return value === undefined || value === null || value === ''; };
/**
 * 判断是否为空值（简单类型+复杂类型），除了 undefined、null 或 ''，还包括空 [] 或 {}
 * @param value
 */
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
var hasDuplicates = function (value) { return value.length !== new Set(value).size; };
var isChinese = function (value) {
    return /^[\u4e00-\u9fa5]+$/gi.test(value);
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
    is: function (value, arg) { return value === arg; },
    isNot: function (value, arg) { return value !== arg; },
    equals: function (value, arg) { return isEqual(value, arg); },
    notEquals: function (value, arg) { return !isEqual(value, arg); },
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
    noDuplicates: function (value) { return !hasDuplicates(value); },
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
    alphaNum: function (value) { return $.isAlphanumeric(stringify(value)); },
    alphaDash: function (value) { return /^[a-zA-Z_]+$/.test(value); },
    alphaNumDash: function (value) { return /^[a-zA-Z0-9_]+$/.test(value); },
    alphaSpaces: function (value) { return /^[a-zA-Z\s]+$/.test(value); },
    lowerCase: function (value) { return $.isLowercase(stringify(value)); },
    upperCase: function (value) { return $.isUppercase(stringify(value)); },
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
    email: function (value) { return $.isEmail(stringify(value)); },
    ip: function (value, version) { return $.isIP(stringify(value), version); },
    // ipRange: (value: any): boolean => $.isIPRange(stringify(value)),
    port: function (value) { return $.isPort(stringify(value)); },
    url: function (value) { return $.isURL(stringify(value)); },
    macAddress: function (value) { return $.isMACAddress(stringify(value)); },
    md5: function (value) { return $.isMD5(stringify(value)); },
    ascii: function (value) { return $.isAscii(stringify(value)); },
    // base32: (value: any): boolean => $.isBase32(stringify(value)), // type丢失
    base64: function (value) { return $.isBase64(stringify(value)); },
    byteLength: function (value, min, max) { return $.isByteLength(stringify(value), min, max); },
    dataURI: function (value) { return $.isDataURI(stringify(value)); },
    // magnetURI: (value: any): boolean => $.isMagnetURI(stringify(value)), // type丢失
    divisibleBy: function (value, divisor) { return $.isDivisibleBy(stringify(value), divisor); },
    halfWidth: function (value) { return !$.isFullWidth(stringify(value)); },
    fullWidth: function (value) { return !$.isHalfWidth(stringify(value)); },
    hash: function (value, algorithm) { return $.isHash(stringify(value), algorithm); },
    hexColor: function (value) { return $.isHexColor(stringify(value)); },
    hex: function (value) { return $.isHexadecimal(stringify(value)); },
    // identityCard: (value: any, locale: any) => $.isIdentityCard(stringify(value), locale ? locale : 'any'),
    creditCard: function (value) { return $.isCreditCard(stringify(value)); },
    fqdn: function (value) { return $.isFQDN(stringify(value)); },
    // ipRange: (value: any): boolean => $.isIPRange(stringify(value)),
    ipOrFQDN: function (value) { return $.isFQDN(stringify(value)) || $.isIP(stringify(value)); },
    isbn: function (value, version) { return $.isISBN(stringify(value), version); },
    issn: function (value) { return $.isISSN(stringify(value)); },
    isin: function (value) { return $.isISIN(stringify(value)); },
    iso8601: function (value, strict) { return $.isISO8601(stringify(value), { strict: strict }); },
    // rfc3339: (value: any): boolean => $.isRFC3339(stringify(value)),
    iso31661Alpha2: function (value) { return $.isISO31661Alpha2(stringify(value)); },
    iso31661Alpha3: function (value) { return $.isISO31661Alpha3(stringify(value)); },
    json: function (value) { return $.isJSON(stringify(value)); },
    jwt: function (value) { return $.isJWT(stringify(value)); },
    latLong: function (value) { return $.isLatLong(stringify(value)); },
    mobile: function (value, locale, strict) { return $.isMobilePhone(stringify(value), locale, { strictMode: strict }); },
    mongoId: function (value) { return $.isMongoId(stringify(value)); },
    postalCode: function (value, locale) { return $.isPostalCode(stringify(value), locale); },
    uuid: function (value, version) { return $.isUUID(stringify(value), version ? version : 'all'); },
    chinese: function (value) { return isChinese(stringify(value)); }
};
export default validators;
//# sourceMappingURL=validators.js.map
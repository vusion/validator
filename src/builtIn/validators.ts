import { Validator } from '../types';
const isPlainObject = require('lodash/isPlainObject');
const isEqual = require('lodash/isEqual');
import $ from 'validator';

/**
 * 判断是否为空值（简单类型），undefined、null 或 ''
 * @param value
 */
const isNil = (value: any): boolean => value === undefined || value === null || value === '';

/**
 * 判断是否为空值（简单类型+复杂类型），除了 undefined、null 或 ''，还包括空 [] 或 {}
 * @param value
 */
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

const hasDuplicates = (value: Array<any>): boolean => value.length !== new Set(value).size;

const isChinese = (value: any) => {
    return /^[\u4e00-\u9fa5]+$/gi.test(value);
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
    includes: (value: any, arr: any[]): boolean => arr.every((arg) => value.includes(arg)),
    excludes: (value: any, arr: any[]): boolean => !arr.some((arg) => value.includes(arg)),
    included: (value: any, arr: any[]): boolean => arr.includes(value),
    excluded: (value: any, arr: any[]): boolean => !arr.includes(value),
    noDuplicates: (value: Array<any>): boolean => !hasDuplicates(value),
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
    alphaDash: (value: any): boolean => /^[a-zA-Z_]+$/.test(value),
    alphaNumDash: (value: any): boolean => /^[a-zA-Z0-9_]+$/.test(value),
    alphaSpaces: (value: any): boolean => /^[a-zA-Z\s]+$/.test(value),
    lowerCase: (value: any): boolean => $.isLowercase(stringify(value)),
    upperCase: (value: any): boolean => $.isUppercase(stringify(value)),
    '^az': (value: any): boolean => /^[a-z]/.test(value),
    '^az09': (value: any): boolean => /^[a-z0-9]/.test(value),
    '^az09_': (value: any): boolean => /^[a-z0-9_]/.test(value),
    '^azAZ': (value: any): boolean => /^[a-zA-Z]/.test(value),
    '^azAZ09': (value: any): boolean => /^[a-zA-Z0-9]/.test(value),
    '^azAZ09_': (value: any): boolean => /^[a-zA-Z0-9_]/.test(value),
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
    '^az09-_$': (value: any): boolean => /^[a-z0-9-_]+$/.test(value),
    'without--': (value: any): boolean => !/-{2,}/.test(value),
    'without__': (value: any): boolean => !/_{2,}/.test(value),
    email: (value: any): boolean => $.isEmail(stringify(value)),
    ip: (value: any, version: $.IPVersion): boolean => $.isIP(stringify(value), version),
    ipRange: (value: any, version: $.IPVersion): boolean => $.isIPRange(stringify(value), version),
    port: (value: any) => $.isPort(stringify(value)),
    url: (value: any) => $.isURL(stringify(value)),
    macAddress: (value: any): boolean => $.isMACAddress(stringify(value)),
    md5: (value: any): boolean => $.isMD5(stringify(value)),
    ascii: (value: any): boolean => $.isAscii(stringify(value)),
    // base32: (value: any): boolean => $.isBase32(stringify(value)), // type丢失
    base64: (value: any): boolean => $.isBase64(stringify(value)),
    byteLength: (value: any, min:number, max:number): boolean => $.isByteLength(stringify(value), { min, max }),
    dataURI: (value: any): boolean => $.isDataURI(stringify(value)),
    // magnetURI: (value: any): boolean => $.isMagnetURI(stringify(value)), // type丢失
    divisibleBy: (value: any, divisor: number): boolean => $.isDivisibleBy(stringify(value), divisor),
    halfWidth: (value: any): boolean => !$.isFullWidth(stringify(value)),
    fullWidth: (value: any): boolean => !$.isHalfWidth(stringify(value)),
    hash: (value: any, algorithm: any): boolean => $.isHash(stringify(value), algorithm),
    hexColor: (value: any): boolean => $.isHexColor(stringify(value)),
    hex: (value: any): boolean => $.isHexadecimal(stringify(value)),
    // identityCard: (value: any, locale: any) => $.isIdentityCard(stringify(value), locale ? locale : 'any'),
    creditCard: (value: any): boolean => $.isCreditCard(stringify(value)),
    fqdn: (value: any): boolean => $.isFQDN(stringify(value)),
    // ipRange: (value: any): boolean => $.isIPRange(stringify(value)),
    ipOrFQDN: (value: any): boolean => $.isFQDN(stringify(value)) || $.isIP(stringify(value)),
    isbn: (value: any, version: $.ISBNVersion): boolean => $.isISBN(stringify(value), version),
    issn: (value: any): boolean => $.isISSN(stringify(value)),
    isin: (value: any): boolean => $.isISIN(stringify(value)),
    iso8601: (value: any, strict: boolean): boolean => $.isISO8601(stringify(value), {strict: strict}),
    // rfc3339: (value: any): boolean => $.isRFC3339(stringify(value)),
    iso31661Alpha2: (value: any): boolean => $.isISO31661Alpha2(stringify(value)),
    iso31661Alpha3: (value: any): boolean => $.isISO31661Alpha3(stringify(value)),
    json: (value: any): boolean => $.isJSON(stringify(value)),
    jwt: (value: any): boolean => $.isJWT(stringify(value)),
    latLong: (value: any): boolean => $.isLatLong(stringify(value)),
    mobile: (value: any, locale?: any, strict?: boolean): boolean => $.isMobilePhone(stringify(value), locale, {strictMode: strict}),
    mongoId: (value: any): boolean => $.isMongoId(stringify(value)),
    postalCode: (value: any, locale: any): boolean => $.isPostalCode(stringify(value), locale),
    uuid: (value: any, version?: any): boolean => $.isUUID(stringify(value), version ? version : 'all'),
    chinese: (value: any): boolean => isChinese(stringify(value))
} as { [prop: string]: Validator };

export default validators;


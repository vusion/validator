"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify = (value) => value === undefined || value === null ? '' : String(value);
const validators = {
    required: (value) => !!stringify(value),
    filled: (value) => !!stringify(value).trim(),
    empty: (value) => !stringify(value),
    min: (value, min) => value >= min,
    max: (value, max) => value <= max,
    range: (value, min, max) => min <= value && value <= max,
    minLength: (value, min) => stringify(value).length >= min,
    maxLength: (value, max) => stringify(value).length <= max,
    regexp: (value, re) => new RegExp(re).test(value),
    equal: (value, arg) => value === arg,
};
validators.pattern = validators.regexp;
exports.default = validators;
// oneOf: (value: any, )
// type: (value: any, )
//# sourceMappingURL=validators.js.map
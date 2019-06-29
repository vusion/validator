"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify = (value) => value === undefined || value === null ? '' : String(value);
exports.default = {
    required: (value) => !!stringify(value),
    filled: (value) => !!stringify(value).trim(),
    empty: (value) => !stringify(value),
    min: (value, min) => value >= min,
    max: (value, max) => value <= max,
    range: (value, min, max) => min <= value && value <= max,
    minLength: (value, min) => stringify(value).length >= min,
    maxLength: (value, max) => stringify(value).length <= max,
    pattern: (value, re) => new RegExp(re).test(value),
    equal: (value, arg) => value === arg,
};
// oneOf: (value: any, )
// type: (value: any, )
//# sourceMappingURL=builtIn.js.map
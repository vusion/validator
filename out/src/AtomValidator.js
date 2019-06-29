"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./builtIn/validators");
const rules_1 = require("./builtIn/rules");
const parseRules_1 = require("./parseRules");
/**
 * @example
 * const atomValidator = new AtomValidator();
 * atomValidator.validate(value, 'required | max(200)')
 *     .then(() => {
 *     }).catch((error: string) => {
 *     });
 */
class AtomValidator {
    constructor(validators, rules, validatingRules) {
        this.validators = Object.create(validators || validators_1.default);
        this.rules = Object.create(rules || rules_1.default);
        let normalizedRules = [];
        if (typeof validatingRules === 'string')
            normalizedRules = this.parseRules(validatingRules);
        else {
            validatingRules.forEach((rule) => {
                if (typeof rule === 'string')
                    normalizedRules.push(...this.parseRules(rule));
                else
                    normalizedRules.push(rule);
            });
        }
        this.validatingRules = normalizedRules;
        console.log(normalizedRules);
    }
    validate(value, trigger = '', options) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatingRules = this.validatingRules.filter((rule) => !rule.ignore && (rule.trigger || '').includes(trigger));
            for (let i = 0; i < validatingRules.length; i++) {
                const rule = validatingRules[i];
                let validate;
                // @TODO: 考虑为空的情况
                if (typeof rule.validate === 'string') {
                    const validator = this.validators[rule.validate];
                    if (!validator)
                        throw new Error('[atom-validator] Cannot find validator: ' + rule.validate);
                    validate = (value, rule, options) => __awaiter(this, void 0, void 0, function* () {
                        let args = Array.isArray(rule.args) ? rule.args : [rule.args];
                        let valid = validator(value, ...args);
                        if (valid instanceof Promise)
                            valid = yield valid;
                        if (!valid)
                            return Promise.reject(rule.message);
                        else
                            return Promise.resolve();
                    });
                }
                else
                    validate = rule.validate;
                let result = validate(value, rule, options);
                if (result instanceof Promise)
                    result = yield result;
                if (typeof result === 'string')
                    return Promise.reject(result);
                else if (typeof result === 'boolean') {
                    if (result === false)
                        return Promise.reject(rule.message);
                }
            }
            return Promise.resolve();
        });
    }
    parseRules(exp) {
        const parsedRules = parseRules_1.default(exp);
        const triggerCases = {
            'i': 'input',
            'b': 'blur',
            'ib': 'input+blur',
            'bi': 'blur+input',
        };
        parsedRules.forEach((rule) => {
            if (rule.validate) {
            }
            if (rule.trigger) {
                if (triggerCases[rule.trigger])
                    rule.trigger = triggerCases[rule.trigger];
            }
        });
        return parsedRules;
    }
}
exports.default = AtomValidator;
//# sourceMappingURL=AtomValidator.js.map
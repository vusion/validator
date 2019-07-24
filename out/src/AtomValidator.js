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
    constructor(validators, rules, validatingRules = [], context) {
        this.validators = Object.create(validators || validators_1.default);
        this.rules = Object.create(rules || rules_1.default);
        this.context = context;
        let normalizedRules = [];
        if (typeof validatingRules === 'string')
            normalizedRules = this.parseRules(validatingRules);
        else if (Array.isArray(validatingRules)) {
            validatingRules.forEach((rule) => {
                if (typeof rule === 'string')
                    normalizedRules.push(...this.parseRules(rule));
                else
                    normalizedRules.push(rule);
            });
        }
        this.validatingRules = normalizedRules;
    }
    validate(value, trigger = '', options) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatingRules = this.validatingRules.filter((rule) => !rule.ignore && (rule.trigger || '').includes(trigger));
            for (let i = 0; i < validatingRules.length; i++) {
                const rule = validatingRules[i];
                let validate;
                if (typeof rule.validate === 'string') {
                    const validator = this.validators[rule.validate];
                    if (!validator)
                        throw new Error('[atom-validator] Cannot find validator: ' + rule.validate);
                    validate = (value, rule, options) => __awaiter(this, void 0, void 0, function* () {
                        let args = rule.args;
                        if (typeof args === 'function')
                            args = args();
                        if (args instanceof Promise)
                            args = yield args;
                        if (!Array.isArray(args))
                            args = args !== undefined ? [args] : [];
                        let valid = validator(value, ...args);
                        if (valid instanceof Promise)
                            valid = yield valid;
                        options = Object.assign({}, options, args);
                        if (!valid)
                            return Promise.reject(this.formatMessage(rule.message || '', options));
                        else
                            return Promise.resolve();
                    });
                }
                else
                    validate = rule.validate;
                let result;
                // @note: 如果 rule 中没有 required 字段，则自动忽略为空的情况
                if (!rule.required && !validators_1.default.required(value))
                    result = true;
                else
                    result = validate(value, rule, options);
                if (result instanceof Promise)
                    result = yield result;
                if (typeof result === 'string')
                    return Promise.reject(this.formatMessage(result, options));
                else if (typeof result === 'boolean') {
                    if (result === false)
                        return Promise.reject(this.formatMessage(rule.message || '', options));
                }
            }
            return Promise.resolve();
        });
    }
    /** @TODO: i18n */
    formatMessage(message, options) {
        if (!options)
            return message;
        else
            return message.replace(/\{([a-zA-Z0-9_]+)\}/g, (m, $1) => options[$1]);
    }
    parseRules(rules) {
        const parsedRules = parseRules_1.default(rules);
        const triggerCases = {
            'i': 'input',
            'b': 'blur',
            'ib': 'input+blur',
            'bi': 'blur+input',
        };
        const resolveArgs = (args) => Function(`with (this) { return ${args} }`).bind(this.context);
        const finalRules = [];
        parsedRules.forEach((rule) => {
            // @note: 字符串中解析出来的 name，其实是规则名称，而不是验证器名
            const validate = rule.validate;
            if (!validate)
                return;
            const index = validate.indexOf('(');
            if (~index) {
                rule.validate = validate.slice(0, index);
                const args = '[' + validate.slice(index + 1, validate.length - 1) + ']';
                rule.args = resolveArgs(args);
            }
            if (rule.trigger) {
                if (triggerCases[rule.trigger])
                    rule.trigger = triggerCases[rule.trigger];
            }
            const builtInRule = this.rules[rule.validate];
            if (builtInRule) {
                if (builtInRule.validate)
                    rule.validate = builtInRule.validate;
                finalRules.push(Object.assign({}, builtInRule, rule));
            }
            else
                finalRules.push(rule);
        });
        return finalRules;
    }
}
exports.default = AtomValidator;
//# sourceMappingURL=AtomValidator.js.map
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
 *
 * @TODO: 相同环境下的 rules 应该是一样的，如何不用在每个组件中重复解析
 */
class AtomValidator {
    constructor(validators, rules, validatingRules = [], context) {
        this.context = context;
        this.validators = Object.create(validators || validators_1.default);
        this.rules = Object.create(rules || rules_1.default);
        Object.keys(this.rules).forEach((key) => {
            const rule = this.rules[key];
            const normalizedRule = this.normalizeRules(rule);
            if (normalizedRule !== rule)
                this.rules[key] = normalizedRule;
        });
        this.validatingRules = this.normalizeRules(validatingRules);
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
                        throw new Error('[atom-validator] Unknown validator: ' + rule.validate);
                    validate = (value, rule, options) => __awaiter(this, void 0, void 0, function* () {
                        let args = rule.args;
                        if (typeof args === 'function')
                            args = args.call(this.context);
                        if (args instanceof Promise)
                            args = yield args;
                        if (!Array.isArray(args))
                            args = args !== undefined ? [args] : [];
                        let valid = validator(value, ...args);
                        if (valid instanceof Promise)
                            valid = yield valid;
                        options = Object.assign({ args }, options, args);
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
                    result = validate.call(this.context, value, rule, options);
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
    normalizeRules(rules, originalName) {
        if (typeof rules === 'object' && !Array.isArray(rules))
            return rules;
        else if (typeof rules === 'string')
            return this.parseRules(rules, originalName);
        else if (Array.isArray(rules)) {
            if (rules.some((rule) => typeof rule === 'string')) {
                let normalizedRules = [];
                rules.forEach((rule) => {
                    if (typeof rule === 'string')
                        normalizedRules.push(...this.parseRules(rule, originalName));
                    else
                        normalizedRules.push(rule);
                });
                return normalizedRules;
            }
            else
                return rules;
        }
    }
    parseRules(rules, originalName) {
        const parsedRules = parseRules_1.default(rules);
        const TRIGGER_CASES = {
            'i': 'input',
            'b': 'blur',
            'ib': 'input+blur',
            'bi': 'blur+input',
        };
        const resolveArgs = (args) => Function(`with (this) { return ${args} }`).bind(this.context);
        const finalRules = [];
        parsedRules.forEach((parsedRule) => {
            const ruleName = parsedRule.rule;
            if (!parsedRule.rule)
                return;
            const index = ruleName.indexOf('(');
            if (~index) {
                parsedRule.rule = ruleName.slice(0, index);
                const args = '[' + ruleName.slice(index + 1, ruleName.length - 1) + ']';
                parsedRule.args = resolveArgs(args);
            }
            if (parsedRule.trigger) {
                if (TRIGGER_CASES[parsedRule.trigger])
                    parsedRule.trigger = TRIGGER_CASES[parsedRule.trigger];
            }
            if (originalName === parsedRule.rule)
                throw new Error('[atom-validator] Circular rule reference: ' + originalName);
            let builtInRule = this.rules[parsedRule.rule];
            if (builtInRule) {
                if (typeof builtInRule === 'string'
                    || Array.isArray(builtInRule) && builtInRule.some((rule) => typeof rule === 'string'))
                    builtInRule = this.normalizeRules(builtInRule, parsedRule.rule);
                if (Array.isArray(builtInRule)) {
                    if (parsedRule.args || parsedRule.trigger)
                        console.warn('[atom-validator]', 'Cannot apply args or trigger to composite rules!');
                    finalRules.push(...builtInRule);
                }
                else {
                    if (builtInRule.validate)
                        parsedRule.validate = builtInRule.validate;
                    else
                        parsedRule.validate = parsedRule.rule;
                    delete parsedRule.rule;
                    finalRules.push(Object.assign({}, builtInRule, parsedRule));
                }
            }
            else {
                throw new Error('[atom-validator] Unknown rule: ' + parsedRule.rule);
                // parsedRule.validate = parsedRule.rule;
                // delete parsedRule.rule;
                // finalRules.push(parsedRule);
            }
        });
        return finalRules;
    }
}
exports.default = AtomValidator;
//# sourceMappingURL=AtomValidator.js.map
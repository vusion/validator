import { Validator, Rule, ValidateResult, ValidateFunc } from './types';
import buildInValidators from './builtIn/validators';
import builtInRules from './builtIn/rules';
import parseRules from './parseRules';

/**
 * @example
 * const atomValidator = new AtomValidator();
 * atomValidator.validate(value, 'required | max(200)')
 *     .then(() => {
 *     }).catch((error: string) => {
 *     });
 */
export default class AtomValidator {
    validators: { [prop: string]: Validator };
    rules: { [prop: string]: Rule };
    validatingRules: Array<Rule>;
    context: Object;

    constructor(validators: { [prop: string]: Validator }, rules: { [prop: string]: Rule }, validatingRules: string | Array<Rule> = [], context: Object) {
        this.validators = Object.create(validators || buildInValidators);
        this.rules = Object.create(rules || builtInRules);
        this.context = context;

        let normalizedRules: Array<Rule> = [];
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

    async validate(value: any, trigger: string = '', options?: Object): Promise<string | void> {
        const validatingRules = this.validatingRules.filter((rule) => !rule.ignore && (rule.trigger || '').includes(trigger));

        for (let i = 0; i < validatingRules.length; i++) {
            const rule = validatingRules[i];
            let validate: ValidateFunc;

            if (typeof rule.validate === 'string') {
                const validator = this.validators[rule.validate];
                if (!validator)
                    throw new Error('[atom-validator] Cannot find validator: ' + rule.validate);

                validate = async (value: any, rule: Rule, options?: Object) => {
                    let args: any | Array<any> | (() => any | Array<any> | Promise<any | Array<any>>) = rule.args;
                    if (typeof args === 'function')
                        args = args();
                    if (args instanceof Promise)
                        args = await args;
                    if (!Array.isArray(args))
                        args = args !== undefined ? [args] : [];
                    let valid: boolean | Promise<boolean> = validator(value, ...args);
                    if (valid instanceof Promise)
                        valid = await valid;

                    options = Object.assign({}, options, args);
                    if (!valid)
                        return Promise.reject(this.formatMessage(rule.message || '', options));
                    else
                        return Promise.resolve();
                }
            } else
                validate = rule.validate;


            let result: ValidateResult | Promise<ValidateResult>;
            // @note: 如果 rule 中没有 required 字段，则自动忽略为空的情况
            if (!rule.required && !buildInValidators.required(value))
                result = true;
            else
                result = validate(value, rule, options);

            if (result instanceof Promise)
                result = await result;
            if (typeof result === 'string')
                return Promise.reject(this.formatMessage(result, options));
            else if (typeof result === 'boolean') {
                if (result === false)
                    return Promise.reject(this.formatMessage(rule.message || '', options));
            }
        }

        return Promise.resolve();
    }

    /** @TODO: i18n */
    formatMessage(message: string, options?: { [prop: string]: any }): string {
        if (!options)
            return message;
        else
            return message.replace(/\{([a-zA-Z0-9_]+)\}/g, (m, $1) => options[$1]);
    }

    parseRules(rules: string): Array<Rule> {
        const parsedRules = parseRules(rules);

        const triggerCases: { [prop: string]: string } = {
            'i': 'input',
            'b': 'blur',
            'ib': 'input+blur',
            'bi': 'blur+input',
        };

        const resolveArgs = (args: string) => Function(`with (this) { return ${args} }`).bind(this.context);

        const finalRules: Array<Rule> = [];
        parsedRules.forEach((rule) => {
            // @note: 字符串中解析出来的 name，其实是规则名称，而不是验证器名
            const validate: string = rule.validate as string;
            if (!validate)
                return;

            const index = validate.indexOf('(')
            if (~index) {
                rule.validate = validate.slice(0, index);
                const args = '[' + validate.slice(index + 1, validate.length - 1) + ']';
                rule.args = resolveArgs(args);
            }

            if (rule.trigger) {
                if (triggerCases[rule.trigger])
                    rule.trigger = triggerCases[rule.trigger];
            }

            const builtInRule = this.rules[rule.validate as string];
            if (builtInRule) {
                if (builtInRule.validate)
                    rule.validate = builtInRule.validate;
                finalRules.push(Object.assign({}, builtInRule, rule));
            } else
                finalRules.push(rule);
        });

        return finalRules;
    }
}

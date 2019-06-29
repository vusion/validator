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

    constructor(validators: { [prop: string]: Validator }, rules: { [prop: string]: Rule }, validatingRules: Array<Rule>) {
        this.validators = Object.create(validators || buildInValidators);
        this.rules = Object.create(rules || builtInRules);

        let normalizedRules: Array<Rule> = [];
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

    async validate(value: any, trigger: string = '', options?: Object): Promise<string | void> {

        const validatingRules = this.validatingRules.filter((rule) => !rule.ignore && (rule.trigger || '').includes(trigger));

        for (let i = 0; i < validatingRules.length; i++) {
            const rule = validatingRules[i];
            let validate: ValidateFunc;

            // @TODO: 考虑为空的情况
            if (typeof rule.validate === 'string') {
                const validator = this.validators[rule.validate];
                if (!validator)
                    throw new Error('[atom-validator] Cannot find validator: ' + rule.validate);

                validate = async (value: any, rule: Rule, options?: Object) => {
                    let args = Array.isArray(rule.args) ? rule.args : [rule.args];
                    let valid: boolean | Promise<boolean> = validator(value, ...args);
                    if (valid instanceof Promise)
                        valid = await valid;

                    if (!valid)
                        return Promise.reject(rule.message);
                    else
                        return Promise.resolve();
                }
            } else
                validate = rule.validate;

            let result: ValidateResult | Promise<ValidateResult> = validate(value, rule, options);
            if (result instanceof Promise)
                result = await result;

            if (typeof result === 'string')
                return Promise.reject(result);
            else if (typeof result === 'boolean') {
                if (result === false)
                    return Promise.reject(rule.message);
            }
        }

        return Promise.resolve();
    }

    parseRules(exp: string): Array<Rule> {
        const parsedRules = parseRules(exp);

        const triggerCases: { [prop: string]: string } = {
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

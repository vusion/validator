import { builtInRules, builtInValidators } from './out';

/**
 * @example
 * import VueAtomValidator from 'VueAtomValidator';
 * Vue.use(VueAtomValidator);
 */
export default {
    install(Vue, options) {
        Vue.config.optionMergeStrategies.rules = Vue.config.optionMergeStrategies.directives;
        Vue.options.validators = Object.create(builtInValidators);
        Vue.options.rules = Object.create(builtInRules);
        Vue.validator = function (id, definition) {
            if (!definition)
                return Vue.options.validators[id];
            else
                Vue.options.validators[id] = definition;
        };
        Vue.rule = function (id, definition) {
            if (!definition)
                return Vue.options.rules[id];
            else
                Vue.options.rules[id] = definition;
        };
    },
};

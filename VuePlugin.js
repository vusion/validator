import { AtomValidator, builtInRules, builtInValidators } from './out';

/**
 * @example
 * import VueAtomValidator from 'VueAtomValidator';
 * Vue.use(VueAtomValidator);
 */
export default {
    install(Vue, options) {
        Vue.config.optionMergeStrategies.rules = Vue.config.optionMergeStrategies.directives;
        Vue.options.validators = builtInValidators;
        Vue.options.rules = builtInRules;
    },
};

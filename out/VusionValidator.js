var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import buildInValidators from './builtIn/validators';
// import builtInRules from './builtIn/rules';
import parseRules from './parseRules';
/**
 * @example
 * const vusionValidator = new VusionValidator();
 * vusionValidator.validate(value, 'required | max(200)')
 *     .then(() => {
 *     }).catch((error: string) => {
 *     });
 *
 * @TODO: 相同环境下的 rules 应该是一样的，如何不用在每个组件中重复解析
 */
var VusionValidator = /** @class */ (function () {
    function VusionValidator(validators, rules, validatingRules, context) {
        var _this = this;
        if (validatingRules === void 0) { validatingRules = []; }
        this.context = context;
        this.validators = Object.create(validators || buildInValidators);
        this.rules = Object.create(rules || {});
        Object.keys(this.rules).forEach(function (key) {
            var rule = _this.rules[key];
            var normalizedRule = _this.normalizeRules(rule);
            if (normalizedRule !== rule)
                _this.rules[key] = normalizedRule;
        });
        this.validatingRules = this.normalizeRules(validatingRules);
    }
    VusionValidator.prototype.validate = function (value, trigger, options) {
        if (trigger === void 0) { trigger = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var validatingRules, _loop_1, this_1, i, state_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validatingRules = this.validatingRules.filter(function (rule) { return !rule.ignore && (rule.trigger || '').includes(trigger); });
                        _loop_1 = function (i) {
                            var rule, validate, validator_1, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        rule = validatingRules[i];
                                        validate = void 0;
                                        if (typeof rule.validate === 'string') {
                                            validator_1 = this_1.validators[rule.validate];
                                            if (!validator_1)
                                                throw new Error('[@vusion/validator] Unknown validator: ' + rule.validate);
                                            validate = function (value, rule, options) { return __awaiter(_this, void 0, void 0, function () {
                                                var args, valid;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            args = rule.args;
                                                            if (typeof args === 'function')
                                                                args = args.call(this.context, value, rule, options);
                                                            if (!(args instanceof Promise)) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, args];
                                                        case 1:
                                                            args = _a.sent();
                                                            _a.label = 2;
                                                        case 2:
                                                            if (!Array.isArray(args))
                                                                args = args !== undefined ? [args] : [];
                                                            valid = validator_1.apply(void 0, __spreadArrays([value], args));
                                                            if (!(valid instanceof Promise)) return [3 /*break*/, 4];
                                                            return [4 /*yield*/, valid];
                                                        case 3:
                                                            valid = _a.sent();
                                                            _a.label = 4;
                                                        case 4:
                                                            options = Object.assign({ args: args }, options, args);
                                                            if (!valid)
                                                                return [2 /*return*/, Promise.reject(this.formatMessage(rule.message || '', options))];
                                                            else
                                                                return [2 /*return*/, Promise.resolve()];
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); };
                                        }
                                        else
                                            validate = rule.validate;
                                        result = void 0;
                                        // @note: 如果 rule 中没有 required 字段，则自动忽略为空的情况
                                        if (!rule.required && !buildInValidators.required(value))
                                            result = true;
                                        else
                                            result = validate.call(this_1.context, value, rule, options);
                                        if (!(result instanceof Promise)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, result];
                                    case 1:
                                        result = _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        if (typeof result === 'string')
                                            return [2 /*return*/, { value: Promise.reject(this_1.formatMessage(result, options)) }];
                                        else if (typeof result === 'boolean') {
                                            if (result === false)
                                                return [2 /*return*/, { value: Promise.reject(this_1.formatMessage(rule.message || '', options)) }];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < validatingRules.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    /** @TODO: i18n */
    VusionValidator.prototype.formatMessage = function (message, options) {
        if (!options)
            return message;
        else
            return message.replace(/\{([a-zA-Z0-9_]+)\}/g, function (m, $1) { return options[$1]; });
    };
    VusionValidator.prototype.normalizeRules = function (rules, originalName) {
        var _this = this;
        if (typeof rules === 'object' && !Array.isArray(rules))
            return rules;
        else if (typeof rules === 'string')
            return this.parseRules(rules, originalName);
        else if (Array.isArray(rules)) {
            if (rules.some(function (rule) { return typeof rule === 'string'; })) {
                var normalizedRules_1 = [];
                rules.forEach(function (rule) {
                    if (typeof rule === 'string')
                        normalizedRules_1.push.apply(normalizedRules_1, _this.parseRules(rule, originalName));
                    else
                        normalizedRules_1.push(rule);
                });
                return normalizedRules_1;
            }
            else
                return rules;
        }
    };
    VusionValidator.prototype.parseRules = function (rules, originalName) {
        var _this = this;
        var parsedRules = parseRules(rules);
        var TRIGGER_CASES = {
            'i': 'input',
            'b': 'blur',
            'ib': 'input+blur',
            'bi': 'blur+input',
        };
        var resolveArgs = function (args) { return Function("with (this) { return " + args + " }").bind(_this.context); };
        var finalRules = [];
        parsedRules.forEach(function (parsedRule) {
            var ruleName = parsedRule.rule;
            if (!parsedRule.rule)
                return;
            var index = ruleName.indexOf('(');
            if (~index) {
                parsedRule.rule = ruleName.slice(0, index);
                var args = '[' + ruleName.slice(index + 1, ruleName.length - 1) + ']';
                parsedRule.args = resolveArgs(args);
            }
            if (parsedRule.trigger) {
                if (TRIGGER_CASES[parsedRule.trigger])
                    parsedRule.trigger = TRIGGER_CASES[parsedRule.trigger];
            }
            if (originalName === parsedRule.rule)
                throw new Error('[@vusion/validator] Circular rule reference: ' + originalName);
            var builtInRule = _this.rules[parsedRule.rule];
            if (builtInRule) {
                if (typeof builtInRule === 'string'
                    || Array.isArray(builtInRule) && builtInRule.some(function (rule) { return typeof rule === 'string'; }))
                    builtInRule = _this.normalizeRules(builtInRule, parsedRule.rule);
                if (Array.isArray(builtInRule)) {
                    if (parsedRule.args || parsedRule.trigger)
                        console.warn('[@vusion/validator]', 'Cannot apply args or trigger to composite rules!');
                    finalRules.push.apply(finalRules, builtInRule);
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
                throw new Error('[@vusion/validator] Unknown rule: ' + parsedRule.rule);
                // parsedRule.validate = parsedRule.rule;
                // delete parsedRule.rule;
                // finalRules.push(parsedRule);
            }
        });
        return finalRules;
    };
    return VusionValidator;
}());
export default VusionValidator;
//# sourceMappingURL=VusionValidator.js.map
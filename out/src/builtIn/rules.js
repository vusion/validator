import en_US from '../locales/en-US';
import zh_CN from '../locales/zh-CN';
var messages = {
    'en-US': en_US,
    'zh-CN': zh_CN,
};
export default function localizeRules(locale) {
    var localized = messages[locale || 'zh-CN'];
    return {
        required: { required: true, trigger: 'blur', message: localized['required'] },
        filled: { required: true, trigger: 'blur', message: localized['filled'] },
        notEmpty: { required: true, trigger: 'input+blur', message: localized['notEmpty'] },
        empty: { trigger: 'input+blur', message: localized['empty'] },
        minLength: { trigger: 'blur', message: localized['minLength'] },
        maxLength: { trigger: 'blur', message: localized['maxLength'] },
        rangeLength: { trigger: 'blur', message: localized['rangeLength'] },
        min: { trigger: 'blur', message: localized['min'] },
        max: { trigger: 'blur', message: localized['max'] },
        range: { trigger: 'blur', message: localized['range'] },
        pattern: { trigger: 'input+blur', message: localized['pattern'] },
        is: { trigger: 'blur', message: localized['is'] },
        isNot: { trigger: 'blur', message: localized['isNot'] },
        equals: { trigger: 'blur', message: localized['equals'] },
        notEquals: { trigger: 'blur', message: localized['notEquals'] },
        confirmed: { validate: 'is', trigger: 'blur', message: localized['confirmed'] },
        includes: { trigger: 'input+blur', message: localized['includes'] },
        excludes: { trigger: 'input+blur', message: localized['excludes'] },
        included: { trigger: 'input+blur', message: localized['included'] },
        excluded: { trigger: 'input+blur', message: localized['excluded'] },
        unique: { validate: 'excluded', trigger: 'blur', message: localized['unique'] },
        string: { trigger: 'input+blur', message: localized['string'] },
        number: { trigger: 'input+blur', message: localized['number'] },
        numeric: { trigger: 'input+blur', message: localized['numeric'] },
        integer: { trigger: 'input+blur', message: localized['integer'] },
        decimal: { trigger: 'blur', message: localized['decimal'] },
        boolean: { trigger: 'input+blur', message: localized['boolean'] },
        function: { trigger: 'input+blur', message: localized['function'] },
        object: { trigger: 'input+blur', message: localized['object'] },
        plainObject: { trigger: 'input+blur', message: localized['plainObject'] },
        array: { trigger: 'input+blur', message: localized['array'] },
        alpha: { trigger: 'input+blur', message: localized['alpha'] },
        alphaNum: { trigger: 'input+blur', message: localized['alphaNum'] },
        email: { trigger: 'blur', message: localized['email'] },
        ip: { trigger: 'blur', message: localized['ip'] },
        ipRange: { trigger: 'blur', message: localized['ipRange'] },
        port: { trigger: 'blur', message: localized['port'] },
        url: { trigger: 'blur', message: localized['url'] },
        macAddress: { trigger: 'blur', message: localized['macAddress'] },
        md5: { trigger: 'blur', message: localized['md5'] },
        '^az': { trigger: 'input+blur', message: localized['^az'] },
        '^az09': { trigger: 'input+blur', message: localized['^az09'] },
        '^az09_': { trigger: 'input+blur', message: localized['^az09_'] },
        '^azAZ': { trigger: 'input+blur', message: localized['^azAZ'] },
        '^azAZ09': { trigger: 'input+blur', message: localized['^azAZ09'] },
        '^azAZ09_': { trigger: 'input+blur', message: localized['^azAZ09_'] },
        'az09$': { trigger: 'blur', message: localized['az09$'] },
        'azAZ09$': { trigger: 'blur', message: localized['azAZ09$'] },
        '^09$': { trigger: 'input+blur', message: localized['^09$'] },
        '^az09$': { trigger: 'input+blur', message: localized['^az09$'] },
        '^az09-$': { trigger: 'input+blur', message: localized['^az09-$'] },
        '^az09-.$': { trigger: 'input+blur', message: localized['^az09-.$'] },
        '^azAZ09$': { trigger: 'input+blur', message: localized['^azAZ09$'] },
        '^azAZ09-$': { trigger: 'input+blur', message: localized['^azAZ09-$'] },
        '^azAZ09_$': { trigger: 'input+blur', message: localized['^azAZ09_$'] },
        '^azAZ09-_$': { trigger: 'input+blur', message: localized['^azAZ09-_$'] },
        'without--': { trigger: 'input+blur', message: localized['without--'] },
        'without__': { trigger: 'input+blur', message: localized['without__'] },
    };
}
//# sourceMappingURL=rules.js.map
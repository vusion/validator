"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    required: { required: true, trigger: 'blur', message: '{label}不得为空' },
    filled: { required: true, trigger: 'blur', message: '{label}不得为空' },
    notEmpty: { required: true, trigger: 'input+blur', message: '{label}不得为空' },
    empty: { trigger: 'input+blur', message: '{label}必须为空' },
    minLength: { trigger: 'blur', message: '不得少于{0}个字符' },
    maxLength: { trigger: 'blur', message: '不得超过{0}个字符' },
    rangeLength: { trigger: 'blur', message: '请输入{0}-{1}个字符' },
    min: { trigger: 'blur', message: '不能小于{0}' },
    max: { trigger: 'blur', message: '不能大于{0}' },
    range: { trigger: 'blur', message: '应该在{0}-{1}之间' },
    pattern: { trigger: 'blur', message: '{label}格式不正确' },
    equals: { trigger: 'blur', message: '必须与{0}相同' },
    confirmed: { validate: 'equals', trigger: 'blur', message: '两次输入的密码不一致' },
    includes: { trigger: 'input+blur', message: '必须包含{args}' },
    excludes: { trigger: 'input+blur', message: '不能包含{args}' },
    included: { trigger: 'input+blur', message: '必须为{args}中的值' },
    excluded: { trigger: 'input+blur', message: '不能为{args}中的值' },
    unique: { validate: 'excluded', trigger: 'blur', message: '该{label}已经存在' },
    string: { trigger: 'input+blur', message: '请输入字符串' },
    number: { trigger: 'input+blur', message: '请输入数字' },
    numeric: { trigger: 'input+blur', message: '请输入数字' },
    integer: { trigger: 'input+blur', message: '请输入整数' },
    decimal: { trigger: 'blur', message: '请输入小数' },
    boolean: { trigger: 'input+blur', message: '必须为布尔类型' },
    function: { trigger: 'input+blur', message: '必须为函数' },
    object: { trigger: 'input+blur', message: '必须为对象' },
    plainObject: { trigger: 'input+blur', message: '必须为简单对象' },
    array: { trigger: 'input+blur', message: '必须为数组' },
    alpha: { trigger: 'input+blur', message: '请输入字母' },
    alphaNumeric: { trigger: 'input+blur', message: '请输入字母或数字' },
    email: { trigger: 'blur', message: '请输入正确的邮箱' },
    ip: { trigger: 'blur', message: '请输入正确的 IP' },
    ipRange: { trigger: 'blur', message: '请输入正确的 IP 段' },
    port: { trigger: 'blur', message: '请输入正确的端口' },
    url: { trigger: 'blur', message: '请输入正确的 URL' },
    macAddress: { trigger: 'blur', message: '请输入正确的 MAC 地址' },
    md5: { trigger: 'blur', message: '请输入正确的 MD5' },
    '^az': { trigger: 'input+blur', message: '以小写字母开头' },
    '^az09': { trigger: 'input+blur', message: '以小写字母或数字开头' },
    '^az09_': { trigger: 'input+blur', message: '以小写字母、数字或下划线开头' },
    '^azAZ': { trigger: 'input+blur', message: '以字母开头' },
    '^azAZ09': { trigger: 'input+blur', message: '以字母或数字开头' },
    '^azAZ09_': { trigger: 'input+blur', message: '以字母、数字或下划线开头' },
    'az09$': { trigger: 'blur', message: '以小写字母或数字结尾' },
    'azAZ09$': { trigger: 'blur', message: '以字母或数字结尾' },
    '^09$': { trigger: 'input+blur', message: '以数字组成' },
    '^az09$': { trigger: 'input+blur', message: '以小写字母或数字组成' },
    '^az09-$': { trigger: 'input+blur', message: '以小写字母、数字或中划线组成' },
    '^az09-.$': { trigger: 'input+blur', message: '以小写字母、数字、"-"或"."组成' },
    '^azAZ09$': { trigger: 'input+blur', message: '以字母或数字组成' },
    '^azAZ09-$': { trigger: 'input+blur', message: '以字母、数字或"-"组成' },
    '^azAZ09_$': { trigger: 'input+blur', message: '以字母、数字或"_"组成' },
    '^azAZ09-_$': { trigger: 'input+blur', message: '以字母、数字、"-"或"_"组成' },
    'without--': { trigger: 'input+blur', message: '不能连续出现中划线' },
    'without__': { trigger: 'input+blur', message: '不能连续出现下划线' },
};
//# sourceMappingURL=rules.js.map
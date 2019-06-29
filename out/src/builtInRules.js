"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    required: { trigger: 'blur', message: '请{action}{label}' },
    filled: { trigger: 'blur', message: '{label}不能为空' },
    empty: { trigger: 'blur', message: '{label}必须为空' },
    min: { trigger: 'blur', message: '{label}不能小于{args[0]}' },
    max: { trigger: 'blur', message: '{label}不能大于{args[0]}' },
    range: { trigger: 'blur', message: '{label}应该在{args[0]}-{args[1]}的范围内' },
    minLength: { trigger: 'blur', message: '{label}不能少于{args[0]}个字符' },
    maxLength: { trigger: 'blur', message: '{label}不能超过{args[0]}个字符' },
    pattern: { trigger: 'blur', message: '{label}格式不正确' },
};
//# sourceMappingURL=builtInRules.js.map
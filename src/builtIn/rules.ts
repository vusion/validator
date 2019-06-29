import { Validator, Rule } from "../types";


export default {
    required: { trigger: 'blur', message: '请{action}{label}' } as Rule,
    filled: { trigger: 'blur', message: '{label}不能为空' } as Rule,
    empty: { trigger: 'blur', message: '{label}必须为空' } as Rule,
    min: { trigger: 'blur', message: '{label}不能小于{args[0]}' } as Rule,
    max: { trigger: 'blur', message: '{label}不能大于{args[0]}' } as Rule,
    range: { trigger: 'blur', message: '{label}应该在{args[0]}-{args[1]}的范围内' } as Rule,
    minLength: { trigger: 'blur', message: '{label}不能少于{args[0]}个字符' } as Rule,
    maxLength: { trigger: 'blur', message: '{label}不能超过{args[0]}个字符' } as Rule,
    pattern: { trigger: 'blur', message: '{label}格式不正确' } as Rule,
} as { [prop: string]: Rule };

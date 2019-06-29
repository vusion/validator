export type Validator = (value: any, ...args: any[]) => boolean | Promise<boolean>;

export type ValidateResult = boolean | string | void;
export type ValidateFunc = (value: any, rule: Rule, options?: Object) => ValidateResult | Promise<ValidateResult>;

export interface Rule {
    validate: string | ValidateFunc,
    trigger?: string,
    message?: string,
    ignore?: boolean,
    muted?: boolean,
    [prop: string]: any,
}

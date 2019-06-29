export type Validator = (value: any, ...args: any[]) => boolean | Promise<boolean>;

export type ValidateResult = boolean | string | void;
export type ValidateFunc = (value: any, rule: Rule, options?: Object) => ValidateResult | Promise<ValidateResult>;

export interface Rule {
    validate: string | ValidateFunc,
    args?: any | Array<any> | (() => any | Array<any> | Promise<any | Array<any>>),
    trigger?: string,
    message?: string,
    ignore?: boolean,
    muted?: boolean,
    [prop: string]: any,
}

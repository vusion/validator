import { validators as v } from '../src/builtIn/validators';

function chk<T>(real : T, controlled: T) {
    if (real !== controlled) {
        console.error(`Expected ${real} to be ${controlled}`);
        throw new Error(`Expected ${real} to be ${controlled}`);
    }
}

chk(v.required(null), false);
chk(v.required(undefined), false);
chk(v.required(''), false);
chk(v.required([]), true); // 呵呵
chk(v.required({}), true); // 呵呵

//
chk(v.filled(null), false);
chk(v.filled(undefined), false);
chk(v.filled(''), false);
chk(v.filled('  \t\r\n  '), false);
chk(v.filled([]), false); // 呵呵
chk(v.filled({}), false); // 呵呵

//
chk(v.notEmpty(null), false);
chk(v.notEmpty(undefined), false);
chk(v.notEmpty(''), false);
chk(v.notEmpty([]), false);
chk(v.notEmpty(new Map()), false);
chk(v.notEmpty({}), false);
chk(v.notEmpty('    '), true);

//
chk(v.empty(null), true);
chk(v.empty(undefined), true);
chk(v.empty(''), true);
chk(v.empty([]), true);
chk(v.empty(new Map()), true);
chk(v.empty({}), true);
chk(v.empty('    '), false);

//
chk(v.maxLength('123', 2), false);
chk(v.maxLength('123', 3), true);
chk(v.maxLength('123', 4), true);
chk(v.maxLength('0123', 3), false);
chk(v.maxLength('0123', 4), true);

chk(v.maxLength(123, 4), true);
chk(v.maxLength(123, 2), false);

//
chk(v.minLength('123', 2), true);
chk(v.minLength('123', 3), true);
chk(v.minLength('123', 4), false);
chk(v.minLength('0123', 3), true);
chk(v.minLength('0123', 4), true);

chk(v.minLength(123, 4), false);
chk(v.minLength(123, 2), true);

chk(v.minLength(123, null), false);
chk(v.minLength(123, undefined), false);
chk(v.minLength(null, undefined), false);
chk(v.minLength(null, null), false);
chk(v.minLength(undefined, undefined), false);
chk(v.minLength(undefined, null), false);

chk(v.minLength(null, 3), false);
chk(v.minLength(undefined, 3), false);

//
chk(v.rangeLength('0123', 3, 4), true);
chk(v.rangeLength('0123', 3, 5), true);
chk(v.rangeLength('0123', 4, 4), true);
chk(v.rangeLength('0123', 4, 5), true);
chk(v.rangeLength('0123', 3, 4), true);
chk(v.rangeLength('0123', 3, 4), true);

chk(v.rangeLength(123, 3, 4), true);
chk(v.rangeLength(123, 3, 3), true);
chk(v.rangeLength(123, 2, 3), true);
chk(v.rangeLength(123, 1, 2), false);
chk(v.rangeLength(123, 4, 5), false);

chk(v.rangeLength(123, null, null), false);
chk(v.rangeLength(123, null, undefined), false);
chk(v.rangeLength(null, null, undefined), false);
chk(v.rangeLength(null, null, null), false);
chk(v.rangeLength(undefined, null, undefined), false);
chk(v.rangeLength(undefined, null, null), false);

//
chk(v.max(122, 123), true);
chk(v.max(123, 123), true);
chk(v.max(123, 122), false);
chk(v.max(-123, -123), true);
chk(v.max(-123, -122), true);

chk(v.max('aac', 'aad'), true);
chk(v.max('aac', 'aac'), true);
chk(v.max('aad', 'aac'), false);

chk(v.max(new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:01')), true);
chk(v.max(new Date('2024-04-15 01:01:02'), new Date('2024-04-15 01:01:01')), false);
chk(v.max(new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:02')), true);

//
chk(v.min(122, 123), false);
chk(v.min(123, 123), true);
chk(v.min(123, 122), true);
chk(v.min(-123, -123), true);
chk(v.min(-123, -122), false);

chk(v.min(1, 0), true);

chk(v.min('aac', 'aad'), false);
chk(v.min('aac', 'aac'), true);
chk(v.min('aad', 'aac'), true);
chk(v.min(new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:01')), true);
chk(v.min(new Date('2024-04-15 01:01:02'), new Date('2024-04-15 01:01:01')), true);
chk(v.min(new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:02')), false);

chk(v.min(123, undefined), false);
chk(v.min(123, null), false);
chk(v.min(0, undefined), false);
chk(v.min(0, null), false);
chk(v.min(undefined, undefined), false);
chk(v.min(undefined, null), false);
chk(v.min(null, null), false);

//
chk(v.range(123, 123, 123), true);
chk(v.range(0, -123, 123), true);
chk(v.range(-0, -123, 123), true);
chk(v.range(-100, -123, -123), false);
chk(v.min(new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:01')), true);
chk(v.min(new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:00'), new Date('2024-04-15 01:01:02')), true);
chk(v.min(new Date('2024-04-15 01:01:01'), new Date('2024-04-15 01:01:02'), new Date('2024-04-15 01:01:02')), false);

chk(v.plainObject({}), true);
chk(v.plainObject([]), false);
chk(v.plainObject(false), false);

chk(v.mobile('12345678901'), true);
chk(v.mobile('+8613245678901'), true);
chk(v.mobile('+8613245678901', 'zh-CN'), true);
chk(v.mobile('+8613245678901', 'any'), true);
chk(v.mobile('+8613245678901', ''), true);
chk(v.mobile('+8613245678901', 'en-US'), false);
chk(v.mobile('+8613245678901', ['zh-CN', 'en-US']), true);

chk(v.creditCard('438588358369716208'), true);
chk(v.creditCard('6225983201655787'), true);
chk(v.creditCard('6225983201655787', ['unionpay']), true);
chk(v.creditCard('438588358369716208', ['mastercard']), false);
chk(v.creditCard('6225983201655787', ['mastercard']), false);
chk(v.creditCard('4325983201655787', ['unionpay']), false);
chk(v.creditCard('4975129291544179', ['visa']), true);
chk(v.creditCard('4233009451751814', ['unionpay']), false);
// chk(v.creditCard('62230847926699816', ['unionpay']), true);

chk(v.pattern(123, '123', true, true), true);
chk(v.pattern('\'abcccc', '\'abc', false, true), true);

chk(v.pattern(123, '\\d+', true, true), true);
chk(v.pattern(123, '\\d+', false, true), true);
chk(v.pattern(123, '\\d', false, true), true);
chk(v.pattern(123, '\\d', true, true), false);
// chk(v.pattern('123', '\d', false, false), true);

chk(v.is(null, undefined), false);
chk(v.is(null, null), true);

chk(v.equals({}, {}), true);
chk(v.equals(null, null), true);
chk(v.equals(undefined, undefined), true);
chk(v.equals(true, undefined), false);

chk(v.notEquals(null, undefined), true);
chk(v.notEquals(undefined, null), true);
chk(v.notEquals({}, {}), false);

// 本杰的测试用例：
chk(v.minLength(undefined, 2), false);
chk(v.minLength(null, 2), false);
chk(v.minLength(true, 2), true);
chk(v.minLength(false, 2), true);
chk(v.minLength(0, 2), false);
chk(v.minLength(1, 2), false);
chk(v.minLength('', 2), false);
chk(v.minLength('aa', 2), true);
chk(v.minLength([], 2), false);
chk(v.minLength([1, 2, 3], 2), true);
chk(v.minLength({}, 2), false);
chk(v.minLength({ name: 'tom' }, 2), false);

console.log('All tests passed.');

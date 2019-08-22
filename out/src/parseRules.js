"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Inspired by vue/src/compiler/parser/filter-parser.js */
var validDivisionCharRE = /[\w).+\-_$\]]/;
function parseRules(exp) {
    var inSingle = false;
    var inDouble = false;
    var inTemplateString = false;
    var inRegex = false;
    var curly = 0;
    var square = 0;
    var paren = 0;
    var c;
    var prev;
    var i;
    var lastIndex = 0;
    var partial;
    var partialType;
    var lastRule = undefined;
    var rules = [];
    for (i = 0; i < exp.length; i++) {
        prev = c;
        c = exp.charCodeAt(i);
        if (inSingle) {
            if (c === 0x27 && prev !== 0x5C)
                inSingle = false;
        }
        else if (inDouble) {
            if (c === 0x22 && prev !== 0x5C)
                inDouble = false;
        }
        else if (inTemplateString) {
            if (c === 0x60 && prev !== 0x5C)
                inTemplateString = false;
        }
        else if (inRegex) {
            if (c === 0x2f && prev !== 0x5C)
                inRegex = false;
        }
        else if ((c === 0x40 || c === 0x23)
            && prev !== 0x5C && partialType !== 0x23
            && !curly && !square && !paren) { // @#
            partial = exp.slice(lastIndex, i).trim();
            lastIndex = i + 1;
            if (!lastRule)
                lastRule = { validate: '', rule: '' };
            if (partialType === undefined) // func
                lastRule.rule = partial;
            else if (partialType === 0x40) // @ib
                lastRule.trigger = partial;
            else // #message
                lastRule.message = partial;
            partialType = c;
        }
        else if (c === 0x7C // pipe
            && exp.charCodeAt(i + 1) !== 0x7C
            && exp.charCodeAt(i - 1) !== 0x7C
            && prev !== 0x5C
            && !curly && !square && !paren) {
            partial = exp.slice(lastIndex, i).trim();
            lastIndex = i + 1;
            if (!lastRule && partial)
                lastRule = { validate: '', rule: '' };
            if (lastRule) {
                if (partialType === undefined) // func
                    lastRule.rule = partial;
                else if (partialType === 0x40) // @ib
                    lastRule.trigger = partial;
                else // #message
                    lastRule.message = partial;
                rules.push(lastRule);
                lastRule = undefined;
            }
            partialType = undefined;
        }
        else if (!partialType) {
            switch (c) {
                case 0x22:
                    inDouble = true;
                    break; // "
                case 0x27:
                    inSingle = true;
                    break; // '
                case 0x60:
                    inTemplateString = true;
                    break; // `
                case 0x28:
                    paren++;
                    break; // (
                case 0x29:
                    paren--;
                    break; // )
                case 0x5B:
                    square++;
                    break; // [
                case 0x5D:
                    square--;
                    break; // ]
                case 0x7B:
                    curly++;
                    break; // {
                case 0x7D:
                    curly--;
                    break; // }
            }
            if (c === 0x2f) { // /
                var j = i - 1;
                var p = void 0;
                // find first non-whitespace prev char
                for (; j >= 0; j--) {
                    p = exp.charAt(j);
                    if (p !== ' ')
                        break;
                }
                if (!p || !validDivisionCharRE.test(p)) {
                    inRegex = true;
                }
            }
        }
    }
    partial = exp.slice(lastIndex, i).trim();
    lastIndex = i + 1;
    if (!lastRule && partial)
        lastRule = { validate: '', rule: '' };
    if (lastRule) {
        if (partialType === undefined) // func
            lastRule.rule = partial;
        else if (partialType === 0x40) // @ib
            lastRule.trigger = partial;
        else // #message
            lastRule.message = partial;
        rules.push(lastRule);
        lastRule = undefined;
    }
    partialType = undefined;
    return rules;
}
exports.default = parseRules;
//# sourceMappingURL=parseRules.js.map
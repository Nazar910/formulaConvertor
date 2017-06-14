'use strict';

//TODO validate recursive
function validateForBrackets(formula) {
    //count of parentheses, curly and square brackets
    let parentheses = 0, curly = 0, square = 0;

    formula.split('').forEach(elem => {
        switch(elem) {
            case '(': {
                parentheses++;
                break;
            }
            case ')': {
                parentheses--;
                break;
            }
            case '{': {
                curly++;
                break;
            }
            case '}': {
                curly--;
                break;
            }
            case '[': {
                square++;
                break;
            }
            case ']': {
                square--;
                break;
            }
        }
    });

    if (parentheses !== 0) {
        return {
            error: 'count of parentheses are not even'
        };
    }
    if (curly !== 0) {
        return {
            error: 'count of curly braces are not even'
        };
    }
    if (square !== 0) {
        return {
            error: 'count of square brackets are not even'
        };
    }

    return true;
}

function translate(options, formula) {

    //resulting string
    let result = formula;

    //check that all parentheses, curly or square brackets are closed
    const validateError = validateForBrackets(formula).error;

    if (validateError) {
        return {
            error: validateError
        };
    }

    const classic = {
        exponentiation: '$1<sup>$2</sup>',
        sin: 'sin($1)',
        cos: 'cos($1)',
        log10: 'lg($1)',
        logE: 'ln($1)',
        log2: 'log<sub>2</sub>($1)',
        sqrt: '<table style="border-spacing:0px;border-width:0px;'
        + 'font-family:verdana;"><tr><td>&nbsp;</td><td>_______</td></tr>'
        + '<tr><td style="padding:0px; font-size:larger"> &radic; </td>'
        + '<td style="padding:0px;">&nbsp;$1&nbsp;'
        + '</td></tr></table>'
    };

    Object.keys(options).forEach(elem => {

        let replace = result.replace(options[elem], classic[elem]);

        result = result.search(options[elem]) === -1 ? result : replace;
    });

    return result;
}

function translatePascalToClassic(formula) {
    const options = {
        exponentiation: /(\w*)\^\(([\w<?/sup>]*)\)/,
        sin: /Sin\((.*)\)/g,
        cos: /Cos\((.*)\)/g,
        log10: /log10\((.*)\)/g,
        logE: /ln\((.*)\)/g,
        log2: /log2\((.*)\)/g,
        sqrt: /sqrt\((.*)\)/g
    };

    const needParentheses = /(\w*)\^(?!\()(\w*)/;
    while(formula.match(needParentheses))
    {
        formula = formula.replace(needParentheses, '$1^($2)');
    }

    let result = translate(options, formula);

    if (result === formula) {
        return result;
    }

    function matchSome(result) {
        for (const key in options) {
            if (options[key].exec(result)) {
                return true;
            }
        }
        return false;
    }

    while (matchSome(result)) {
        result = translate(options, result);
    }

    const matched = result.match(/<sup>\w*<\/sup>/g);
    const k = matched ? matched.length : 0;
    if (k > 1) {
        let i = 0;
        while (i < k) {
            result = result.replace(/([\w<?/sup>]*)(<sup>.*<\/sup>)/g, '($1)$2');
            i++;
        }
    }

    return result;
}

function translateCtoClassic(formula) {
    const options = {
        exponentiation: /pow\((.*)\,(.*)\)/g,
        sin: /sin\((.*)\)/g,
        cos: /cos\((.*)\)/g,
        log10: /log10\((.*)\)/g,
        logE: /log\((.*)\)/g,
        log2: /log2\((.*)\)/g,
        sqrt: /sqrt\((.*)\)/g
    };
    return translate(options, formula);
}

function translateFortranToClassic(formula) {
    const options = {
        exponentiation: /(.*)\*\*(.*)/g,
        sin: /sin\((.*)\)/g,
        cos: /cos\((.*)\)/g,
        log10: /log10\((.*)\)/g,
        logE: /log\((.*)\)/g,
        log2: /log2\((.*)\)/g,
        sqrt: /sqrt\((.*)\)/g
    };
    return translate(options, formula);
}

module.exports.translatePascalToClassic = translatePascalToClassic;
module.exports.translateCtoClassic = translateCtoClassic;
module.exports.translateFortranToClassic = translateFortranToClassic;
module.exports.translate = translate;

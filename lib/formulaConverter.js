'use strict';

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

function recursiveReplace(result, option, classic) {

    let replace = result.replace(option, classic);

    const notFound = result.search(option) === -1;

    return notFound
        ? result
        : recursiveReplace(replace, option, classic)
}

function expToHtml(message) {

    for (let i = message.length - 1; i > 0; i--) {

        message[i - 1] = message[i - 1] + '<sup>' + message[i] + '</sup>';
    }

    return message[0];

}

function sinToHtml(message) {

    for (let i = message.length - 1; i > 0; i--) {

        message[i - 1] = message[i - 1] + 'sin(' + message[i] + ')';
    }

    return message[0];
}

function cosToHtml(message) {

    for (let i = message.length - 1; i > 0; i--) {

        message[i - 1] = message[i - 1] + 'cos(' + message[i] + ')';
    }

    return message[0];
}

function log10ToHtml(message) {

    for (let i = message.length - 1; i > 0; i--) {

        message[i - 1] = message[i - 1] + 'lg(' + message[i] + ')';
    }

    return message[0];
}

function logEToHtml(message) {

    for (let i = message.length - 1; i > 0; i--) {

        message[i - 1] = 'ln(' + message[i] + ')';
    }

    return message[0];
}

function log2ToHtml(message) {

    for (let i = message.length - 1; i > 0; i--) {

        message[i - 1] = 'log<sub>2</sub>(' + message[i] + ')';
    }

    return message[0];
}

function sqrtToHtml(message) {

    for (let i = message.length - 1; i > 0; i--) {

        message[i - 1] = message[i - 1] + 'sin(' + message[i] + ')';
    }

    return message[0];
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

    const replacement = {
        exponentiation: '$1expTo$2',
        sin: 'sin$1',
        cos: 'cos$1',
        log10: 'lg$1',
        logE: 'ln$1',
        log2: 'log2$1',
        sqrt: 'sqrt$1'
    };

    const toHtml = {
        exponentiation: expToHtml,
        sin: sinToHtml,
        cos: cosToHtml,
        log10: log10ToHtml,
        logE: logEToHtml,
        log2: log2ToHtml,
        sqrt: sqrtToHtml
    };

    Object.keys(options).forEach(elem => {

        // let replace = result.replace(options[elem], replacement[elem]);
        //
        // result = result.search(options[elem]) === -1 ? result : replace;

        result = recursiveReplace(result, options[elem], replacement[elem]);

        const separator = replacement[elem].replace(/\$\d/g, '');
        const message = result.split(separator);

        if (message.length > 1) {
            result = toHtml[elem](message);
        }

    });

    return result;
}

function translatePascalToClassic(formula) {
    const options = {
        exponentiation: /(\w*)\^\((\w*)\)/,
        sin: /Sin\((\w*)\)/g,
        cos: /Cos\((\w*)\)/g,
        log10: /log10\((\w*)\)/g,
        logE: /ln\((\w*)\)/g,
        log2: /log2\((\w*)\)/g,
        sqrt: /sqrt\((\w*)\)/g
    };
    return translate(options, formula);
}

function translateCtoClassic(formula) {
    const options = {
        exponentiation: /pow\((\w*)\,(\w*)\)/g,
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

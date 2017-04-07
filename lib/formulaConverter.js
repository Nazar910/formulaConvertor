'use strict';

function getLanguage(formula) {

}

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

    const { exponentiation } = options;

    //resulting string
    let result;

    //check that all parentheses, curly or square brackets are closed
    const validateError = validateForBrackets(formula).error;

    if (validateError) {
        return {
            error: validateError
        };
    }

    //transform all exponentiation
    result = formula.replace(exponentiation, '$1<sup>$2</sup>');

    return result;
}

function translatePascalToClassic(formula) {
    const options = {
        exponentiation: /(\w*)\^(\w*)/g
    };
    return translate(options, formula);
}

function translateCtoClassic(formula) {
    const options = {
        exponentiation: /math.pow\((\w*)\,(\w*)\)/g
    };
    return translate(options, formula);
}

function translateFortranToClassic(formula) {
    const options = {
        exponentiation: /(\w*)\*\*(\w*)/g
    };
    return translate(options, formula);
}

module.exports.translatePascalToClassic = translatePascalToClassic;
module.exports.translateCtoClassic = translateCtoClassic;
module.exports.translateFortranToClassic = translateFortranToClassic;
module.exports.translate = translate;

const expect = require('chai').expect;

const formulaConverter = require('../lib/formulaConverter');

const sqrt = '<table style="border-spacing:0px;border-width:0px;'
+ 'font-family:verdana;"><tr><td>&nbsp;</td><td>_______</td></tr>'
+ '<tr><td style="padding:0px; font-size:larger"> &radic; </td>'
+ '<td style="padding:0px;">&nbsp;x&nbsp;'
+ '</td></tr></table>';
const sqrtX2 = '<table style="border-spacing:0px;border-width:0px;'
    + 'font-family:verdana;"><tr><td>&nbsp;</td><td>_______</td></tr>'
    + '<tr><td style="padding:0px; font-size:larger"> &radic; </td>'
    + '<td style="padding:0px;">&nbsp;x<sup>2</sup>&nbsp;'
    + '</td></tr></table>';

describe('translate', ()=> {
    it('should return error "count of parentheses are not even" to (x', () => {
        const actual = formulaConverter.translatePascalToClassic('(x');
        expect(actual).to.deep.equal({
            error: 'count of parentheses are not even'
        });
    });

    it('should return error "count of curly braces are not even" to {x', () => {
        const actual = formulaConverter.translatePascalToClassic('{x');
        expect(actual).to.deep.equal({
            error: 'count of curly braces are not even'
        });
    });

    it('should return error "count of square brackets are not even" to [x', () => {
        const actual = formulaConverter.translatePascalToClassic('[x');
        expect(actual).to.deep.equal({
            error: 'count of square brackets are not even'
        });
    });
});

describe('translatePascalToClassic', () => {

    it('should return x<sup\>2</sup> to x^2', () => {
        const actual = formulaConverter.translatePascalToClassic('x^2');
        expect(actual).to.equal('x<sup\>2</sup>');
    });

    it('should return sin(x) to Sin(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('Sin(x)');
        expect(actual).to.equal('sin(x)');
    });

    it('should return cos(x) to Cos(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('Cos(x)');
        expect(actual).to.equal('cos(x)');
    });

    it('should return x<sup\>2</sup>+1 to x^2+1', () => {
        const actual = formulaConverter.translatePascalToClassic('x^2+1');
        expect(actual).to.equal('x<sup\>2</sup>+1');
    });

    it('should return x<sup\>2</sup>+cos(x) to x^2+Cos(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('x^2+Cos(x)');
        expect(actual).to.equal('x<sup\>2</sup>+cos(x)');
    });

    it('should return lg(x) to log10(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('log10(x)');
        expect(actual).to.equal('lg(x)');
    });

    it('should return ln(x) to ln(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('ln(x)');
        expect(actual).to.equal('ln(x)');
    });

    it('should return log<sub>2</sub>(x) to log2(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('log2(x)');
        expect(actual).to.equal('log<sub>2</sub>(x)');
    });

    it('should return to sqrt(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('sqrt(x)');
        expect(actual).to.equal(sqrt);
    });

    it('should return to sqrt(x^2)', () => {
        const actual = formulaConverter.translatePascalToClassic('sqrt(x^2)');
        expect(actual).to.equal(sqrtX2);
    });
});


describe('translateCtoClassic', () => {

    it('should return x<sup\>2</sup> to math.pow(x,2)', () => {
        const actual = formulaConverter.translateCtoClassic('pow(x,2)');
        expect(actual).to.equal('x<sup\>2</sup>');
    });

    it('should return sin(x) to math.sin(x)', () => {
        const actual = formulaConverter.translateCtoClassic('sin(x)');
        expect(actual).to.equal('sin(x)');
    });

    it('should return cos(x) to math.cos(x)', () => {
        const actual = formulaConverter.translateCtoClassic('cos(x)');
        expect(actual).to.equal('cos(x)');
    });

    it('should return lg(x) to log10(x)', () => {
        const actual = formulaConverter.translateCtoClassic('log10(x)');
        expect(actual).to.equal('lg(x)');
    });

    it('should return ln(x) to log(x)', () => {
        const actual = formulaConverter.translateCtoClassic('log(x)');
        expect(actual).to.equal('ln(x)');
    });

    it('should return log<sub>2</sub>(x) to log2(x)', () => {
        const actual = formulaConverter.translateCtoClassic('log2(x)');
        expect(actual).to.equal('log<sub>2</sub>(x)');
    });

    it('should return to sqrt(x)', () => {
        const actual = formulaConverter.translateCtoClassic('sqrt(x)');
        expect(actual).to.equal(sqrt);
    });

});

describe('translateFortranToClassic', () => {

    it('should return x<sup\>2</sup> to math.pow(x,2)', () => {
        const actual = formulaConverter.translateFortranToClassic('x**2');
        expect(actual).to.equal('x<sup\>2</sup>');
    });

    it('should return sin(x) to sin(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('sin(x)');
        expect(actual).to.equal('sin(x)');
    });

    it('should return cos(x) to cos(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('cos(x)');
        expect(actual).to.equal('cos(x)');
    });

    it('should return lg(x) to log10(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('log10(x)');
        expect(actual).to.equal('lg(x)');
    });

    it('should return ln(x) to log(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('log(x)');
        expect(actual).to.equal('ln(x)');
    });

    it('should return log<sub>2</sub>(x) to log2(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('log2(x)');
        expect(actual).to.equal('log<sub>2</sub>(x)');
    });

    it('should return to sqrt(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('sqrt(x)');
        expect(actual).to.equal(sqrt);
    });

});

const expect = require('chai').expect;

const formulaConverter = require('../lib/formulaConverter');

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

    it('should return sin x to Sin(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('Sin(x)');
        expect(actual).to.equal('sin x');
    });

    it('should return cos x to Cos(x)', () => {
        const actual = formulaConverter.translatePascalToClassic('Cos(x)');
        expect(actual).to.equal('cos x');
    });

});


describe('translateCtoClassic', () => {

    it('should return x<sup\>2</sup> to math.pow(x,2)', () => {
        const actual = formulaConverter.translateCtoClassic('math.pow(x,2)');
        expect(actual).to.equal('x<sup\>2</sup>');
    });

    it('should return sin x to math.sin(x)', () => {
        const actual = formulaConverter.translateCtoClassic('math.sin(x)');
        expect(actual).to.equal('sin x');
    });

    it('should return cos x to math.cos(x)', () => {
        const actual = formulaConverter.translateCtoClassic('math.cos(x)');
        expect(actual).to.equal('cos x');
    });

});

describe('translateFortranToClassic', () => {

    it('should return x<sup\>2</sup> to math.pow(x,2)', () => {
        const actual = formulaConverter.translateFortranToClassic('x**2');
        expect(actual).to.equal('x<sup\>2</sup>');
    });

    it('should return sin x to sin(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('sin(x)');
        expect(actual).to.equal('sin x');
    });

    it('should return cos x to cos(x)', () => {
        const actual = formulaConverter.translateFortranToClassic('cos(x)');
        expect(actual).to.equal('cos x');
    });

});

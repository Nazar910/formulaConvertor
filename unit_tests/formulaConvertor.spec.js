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

});


describe('translateCtoClassic', () => {

    it('should return x<sup\>2</sup> to math.pow(x,2)', () => {
        const actual = formulaConverter.translateCtoClassic('math.pow(x,2)');
        expect(actual).to.equal('x<sup\>2</sup>');
    });

});

describe('translateFortranToClassic', () => {

    it('should return x<sup\>2</sup> to math.pow(x,2)', () => {
        const actual = formulaConverter.translateFortranToClassic('x**2');
        expect(actual).to.equal('x<sup\>2</sup>');
    });

});

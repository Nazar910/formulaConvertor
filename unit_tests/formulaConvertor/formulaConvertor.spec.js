const expect = require('chai').expect;

const formulaConverter = require('../../lib/formulaConverter');

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

const sqrtX2PlusY2 = '<table style="border-spacing:0px;border-width:0px;'
    + 'font-family:verdana;"><tr><td>&nbsp;</td><td>_______</td></tr>'
    + '<tr><td style="padding:0px; font-size:larger"> &radic; </td>'
    + '<td style="padding:0px;">&nbsp;x<sup>2</sup>'
    + '+y<sup>2</sup>&nbsp;</td></tr></table>';

describe('translate', ()=> {
    it('should return error "count of parentheses are not even" to (x', () => {
        const actual = formulaConverter['pascal']('(x');
        expect(actual).to.deep.equal({
            error: 'count of parentheses are not even'
        });
    });

    it('should return error "count of curly braces are not even" to {x', () => {
        const actual = formulaConverter['pascal']('{x');
        expect(actual).to.deep.equal({
            error: 'count of curly braces are not even'
        });
    });

    it('should return error "count of square brackets are not even" to [x', () => {
        const actual = formulaConverter['pascal']('[x');
        expect(actual).to.deep.equal({
            error: 'count of square brackets are not even'
        });
    });
});

describe('translatePascalToClassic', () => {

    const data = require('./data/pascal.json');

    for (const key of Object.keys(data)) {

        it(key, () => {
            const actual = formulaConverter['pascal'](data[key].formula);
            expect(actual).to.equal(data[key].expected);
        });

    }

    it('should return to sqrt(x)', () => {
        const actual = formulaConverter['pascal']('sqrt(x)');
        expect(actual).to.equal(sqrt);
    });

    it('should return to sqrt(x^2)', () => {
        const actual = formulaConverter['pascal']('sqrt(x^2)');
        expect(actual).to.equal(sqrtX2);
    });

    it('should return to a=sqrt(x^2+y^2)', () => {
        const actual = formulaConverter['pascal']('a=sqrt(x^2+y^2)');
        expect(actual).to.equal('a=' + sqrtX2PlusY2);
    })
});


describe('translateCtoClassic', () => {

    const data = require('./data/c.json');

    for (const key of Object.keys(data)) {

        it(key, () => {
            const actual = formulaConverter['c'](data[key].formula);
            expect(actual).to.equal(data[key].expected);
        });

    }

    it('should return to sqrt(x)', () => {
        const actual = formulaConverter['c']('sqrt(x)');
        expect(actual).to.equal(sqrt);
    });

    it('should return to a=sqrt(pow(x,2)+pow(y,2))', () => {
        const actual = formulaConverter['c']('a=sqrt(pow(x,2)+pow(y,2))');
        expect(actual).to.equal('a=' + sqrtX2PlusY2);
    })

});

describe('translateFortranToClassic', () => {

    const data = require('./data/fortran.json');

    for (const key of Object.keys(data)) {

        it(key, () => {
            const actual = formulaConverter['fortran'](data[key].formula);
            expect(actual).to.equal(data[key].expected);
        });

    }

    it('should return to sqrt(x)', () => {
        const actual = formulaConverter['fortran']('sqrt(x)');
        expect(actual).to.equal(sqrt);
    });

    it('should return to a=sqrt(x**2+y**2)', () => {
        const actual = formulaConverter['fortran']('a=sqrt(x**2+y**2)');
        expect(actual).to.equal('a=' + sqrtX2PlusY2);
    })

});

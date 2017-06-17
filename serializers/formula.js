'use strict';
const _ = require('lodash');

function serializeFormula(formulaBody) {
    const props = ['body', 'classicView', 'language', 'userId', '_id'];
    const attributes = _.pick(formulaBody, props);

    return {
        type: 'formula',
        id: formulaBody._id,
        attributes
    }
}

function serializeMany(formulas) {
    return formulas.map(serializeFormula);
}

module.exports.serializeData = serializeFormula;
module.exports.serializeMany = serializeMany;

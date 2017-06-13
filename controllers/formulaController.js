const Formula = require('../models/formula');
const _ = require('lodash');

async function createFormula(formulaBody) {
  const formula = new Formula(
    _.pick(formulaBody, ['body', 'userId', 'classicView', 'language']));

  await formula.save();
}

module.exports.createFormula = createFormula;

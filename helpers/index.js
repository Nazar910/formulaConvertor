'use strict';

const User = require('../models/user');
const Formula = require('../models/formula');

function ensureUser(userBody) {
    const user = new User(userBody);
    return user.save();
}

function ensureFormula(formulaBody) {
    const formula = new Formula(formulaBody);
    return formula.save();
}

module.exports = {
    ensureUser,
    ensureFormula
};

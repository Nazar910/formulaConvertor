'use strict';

const User = require('../models/user');
const Formula = require('../models/formula');

async function ensureUser(userBody) {
    const user = new User(userBody);
    await user.save();

    return user;
}

async function ensureFormula(formulaBody) {
    const formula = new Formula(formulaBody);
    await formula.save();

    return formula;
}

module.exports = {
    ensureUser,
    ensureFormula
};

'use strict';

const User = require('../models/user');
const Formula = require('../models/formula');

function ensureUser(userBody) {
    const user = new User(userBody);
    return user.save();
}

async function deleteUserById(userId) {
    const user = await User.findById(userId);

    return user.remove();
}

function ensureFormula(formulaBody) {
    const formula = new Formula(formulaBody);
    return formula.save();
}

function findFormula(_id) {
    return Formula.findById(_id);
}

module.exports = {
    ensureUser,
    ensureFormula,
    findFormula,
    deleteUserById
};

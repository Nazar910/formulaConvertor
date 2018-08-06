'use strict';

const User = require('../models/user');
const Formula = require('../models/formula');

async function ensureUser (userBody) {
    const user = new User(userBody);
    await user.hashPassword();

    return user.save();
}

async function deleteUserById (userId) {
    const user = await User.findById(userId);

    return user.remove();
}

function ensureFormula (formulaBody) {
    const formula = new Formula(formulaBody);
    return formula.save();
}

function findFormula (_id) {
    return Formula.findById(_id);
}

function findUser (_id) {
    return User.findById(_id);
}

module.exports = {
    ensureUser,
    ensureFormula,
    findFormula,
    deleteUserById,
    findUser
};

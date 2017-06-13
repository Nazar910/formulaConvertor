'use strict';
const Formula = require('../models/formula');
const _ = require('lodash');

async function create(formulaBody) {
    const formula = new Formula(_.pick(formulaBody, ['body', 'userId', 'classicView', 'language']));

    await formula.save();
}

function getAllForUser(userId) {

    return Formula.findByUserId(userId);
}

module.exports.create = create;
module.exports.getAllForUser = getAllForUser;

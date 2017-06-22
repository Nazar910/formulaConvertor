'use strict';
const Formula = require('../models/formula');
const _ = require('lodash');
const formulaConverter = require('../lib/formulaConverter');

async function createFormula(formulaBody, userId) {
    const data = formulaBody.attributes;
    data.classicView = formulaConverter[data.language](data.body);
    data.userId = userId;

    const formula = new Formula(data);
    return formula.save();
}

async function updateFormula(id, body) {
    const formula = await Formula.findById(id);

    formula.body = body;
    formula.classicView = formulaConverter[formula.language](body);

    return formula.save();
}

async function deleteFormula(id) {
    const formula = await Formula.findById(id);

    return formula.remove();
}

function getAllForUser(userId) {
    return Formula.findByUserId(userId);
}

module.exports = {
    createFormula,
    updateFormula,
    deleteFormula,
    getAllForUser
};

'use strict';
const Formula = require('../models/formula');
const _ = require('lodash');

async function create(req, res) {
    const { userId } = req.params;

    const { formula: formulaBody } = req.body;

    if (!formulaBody) {
        res.json({
            error: ['FormulasBody is undefined!']
        });
        return;
    }

    let data = _.pick(formulaBody, ['body', 'classicView', 'language']);
    data.userId = userId;

    const formula = new Formula(data);

    const result = await formula.save();

    res.json({
        formula: result
    })
}

async function getAllForUser(req, res) {
    const { userId } = req.params;

    const formulas = await Formula.findByUserId(userId);

    res.json(formulas);
}

module.exports.create = create;
module.exports.getAllForUser = getAllForUser;

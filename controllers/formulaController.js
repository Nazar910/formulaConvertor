'use strict';
const Formula = require('../models/formula');
const _ = require('lodash');
const formulaConverter = require('../lib/formulaConverter');
const serializer = require('../serializers/formula');

//TODO add a try/catch and response with error in one occurred
async function create(req, res) {
    const { userId } = req.params;

    const { data: formulaBody } = req.body;

    if (!formulaBody) {
        return res.json({
            error: ['FormulasBody is undefined!']
        });
    }

    const data = formulaBody.attributes;
    data.classicView = formulaConverter[data.language](data.body);
    data.userId = userId;

    const formula = new Formula(data);
    await formula.save();

    const result = {
        data: serializer.serializeData(formula)
    };

    res.json(result);
}

async function getAllForUser(req, res) {
    const { userId } = req.params;

    const formulas = await Formula.findByUserId(userId);

    const result = {
        data: serializer.serializeMany(formulas)
    };

    res.json(result);
}

module.exports.create = create;
module.exports.getAllForUser = getAllForUser;

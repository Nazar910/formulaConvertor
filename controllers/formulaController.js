'use strict';
const Formula = require('../models/formula');
const _ = require('lodash');
const formulaConverter = require('../lib/formulaConverter');

async function create(req, res) {
    const { userId } = req.params;

    const { formula: formulaBody, lang: language } = req.body;

    if (!formulaBody) {
        res.json({
            error: ['FormulasBody is undefined!']
        });
        return;
    }

    let data = {};
    data.body = formulaBody;
    data.language = language;
    data.userId = userId;

    console.log(language);

    switch(language) {
        case 'pascal': {
            data.classicView = formulaConverter.translatePascalToClassic(formulaBody);
            break;
        }
        case 'fortran': {
            data.classicView = formulaConverter.translateFortranToClassic(formulaBody);
            break;
        }
        case 'c': {
            data.classicView = formulaConverter.translateCtoClassic(formulaBody);
            break;
        }
    }

    const formula = new Formula(data);

    const result = await formula.save();

    res.json({
        formula: result
    })
}

async function getAllForUser(req, res) {
    const { userId } = req.params;
    console.log('USER ID', userId);
    const formulas = await Formula.findByUserId(userId);

    res.json(formulas);
}

module.exports.create = create;
module.exports.getAllForUser = getAllForUser;

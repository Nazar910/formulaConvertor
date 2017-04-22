const router = require('express').Router;

const formulaConverter = require('../lib/formulaConverter');

function pascal(req, res, next) {
    const { formula: inputFormula } = req.body;

    const formula = formulaConverter.translatePascalToClassic(inputFormula);

    res.json({
        body: {
            formula
        }
    });
}

function c(req, res, next) {
    const { formula: inputFormula } = req.body;

    const formula = formulaConverter.translateCtoClassic(inputFormula);

    res.json({
        body: {
            formula
        }
    });
}

function fortran(req, res, next) {
    const { formula: inputFormula } = req.body;

    const formula = formulaConverter.translateFortranToClassic(inputFormula);

    res.json({
        body: {
            formula
        }
    });
}

module.exports.pascal = pascal;
module.exports.c = c;
module.exports.fortran = fortran;

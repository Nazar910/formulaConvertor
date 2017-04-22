const router = require('express').Router;

const formulaConverter = require('../lib/formulaConverter');

function translate(req, res, specificTranslate) {

    const { formula: inputFormula } = req.body;

    const formula = specificTranslate(inputFormula);

    res.json({
        body: {
            formula
        }
    });

}

function pascal(req, res, next) {
    translate(req, res, formulaConverter.translatePascalToClassic)
}

function c(req, res, next) {
    translate(req, res, formulaConverter.translateCtoClassic)
}

function fortran(req, res, next) {
    translate(req, res, formulaConverter.translateFortranToClassic)
}

module.exports.pascal = pascal;
module.exports.c = c;
module.exports.fortran = fortran;

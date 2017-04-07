const express = require('express');
const router = express.Router();

const formulaConverter = require('../lib/formulaConverter');

router.post('/', function(req, res, next) {

    const { formula: inputFormula, lang } = req.body;

    let formula;
    switch(lang) {
        case 'c/c++': {
            formula = formulaConverter.translateCtoClassic(inputFormula);
            break;
        }
        case 'pascal': {
            formula = formulaConverter.translatePascalToClassic(inputFormula);
            break;
        }
        case 'fortran': {
            formula = formulaConverter.translateFortranToClassic(inputFormula);
            break;
        }
    }

    res.json({
      body: {
          formula
      }
    });

});

module.exports = router;

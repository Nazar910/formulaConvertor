const express = require('express');
const router = express.Router();

const formulaConverter = require('../lib/formulaConverter');

router.post('/', function(req, res, next) {

    const { formula: inputFormula } = req.body;

    const formula = formulaConverter.translatePascalToClassic(inputFormula);

    res.json({
      body: {
          formula
      }
    });

});

module.exports = router;

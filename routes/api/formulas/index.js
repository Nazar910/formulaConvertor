'use strict';
const express = require('express');
const router = express.Router();

const formulaController = require('../../../controllers/formulaController');

router.get('/:userId', formulaController.getAllForUser);
router.post('/', formulaController.create);

module.exports = router;

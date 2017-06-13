'use strict';
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/formulas', require('./formulas'));

module.exports = router;

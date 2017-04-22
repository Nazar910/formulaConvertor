const express = require('express');
const router = express.Router();

const languageController = require('../controllers/language');

router.post('/pascal', languageController.pascal);
router.post('/c', languageController.c);
router.post('/fortran', languageController.fortran);

module.exports = router;

'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

const formulaController = require('../../controllers/formulaController');

router.get('/:userId', passport.authenticate('jwt', {session: false}), formulaController.getAllForUser);
router.delete('/:formulaId', passport.authenticate('jwt', {session: false}), formulaController.remove);
router.patch('/:formulaId', passport.authenticate('jwt', {session: false}), formulaController.update);
router.post('/:userId', passport.authenticate('jwt', {session: false}), formulaController.create);

module.exports = router;

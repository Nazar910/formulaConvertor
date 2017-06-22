'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userController = require('../../controllers/userController');

router.post('/authenticate', userController.authenticateUser);
router.post('/', userController.createUser);
router.patch('/:userId', passport.authenticate('jwt', {session: false}), userController.updateUser);
router.delete('/:userId', passport.authenticate('jwt', {session: false}), userController.deleteUser);

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        user: req.user
    });
});

module.exports = router;

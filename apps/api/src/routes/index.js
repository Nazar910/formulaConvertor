const express = require('express');
const router = express.Router();
const { NotFound } = require('../errors');
const logger = require('../logger');

router.use('/users', require('./users'));
router.use('/formulas', require('./formulas'));

router.use((req, res, next) => {
    if (res.data == null) {
        return next();
    }

    const data = res.data;
    const status = res.statusCode;

    const body = {
        data
    };
    return res.status(status).json(body);
});

router.use((req, res, next) => {
    if (res.data == null) {
        return next(new NotFound());
    }
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
    logger.error('Got error in the global error handler', err);
    console.error(err);
    const status = err.status || 500;
    const errors = [err.toJSON()];
    return res.status(status).json({
        errors
    });
});

module.exports = router;

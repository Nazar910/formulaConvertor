const winston = require('winston');

const info = (...args) => winston.log('info', ...args);
const error = (...args) => winston.log('error', ...args);
const debug = (...args) => winston.log('debug', ...args);

module.exports = {
    info,
    error,
    debug
};

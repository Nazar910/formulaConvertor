const config = require('../../config');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json()
});

if (config.get('NODE_ENV') !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const info = (...args) => logger.log('info', ...args);
const error = (...args) => logger.log('error', ...args);
const debug = (...args) => logger.log('debug', ...args);

module.exports = {
    info,
    error,
    debug
};

const nconf = require('nconf');
const path = require('path');
const ENVIRONMENT = process.env.NODE_ENV;

nconf.file(path.resolve(__dirname, `${ENVIRONMENT}.json`));
nconf.env();
nconf.required([
    'FRONTEND_PORT',
    'API_URI'
]);

module.exports = nconf;

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../config');
const logger = require('./logger');

const api = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./passport.js')(passport);

app.use(cors({ origin: '*' }));

app.use('/api', api);

let server;
async function main () {
    const mongoUri = config.get('MONGO_URI');
    await mongoose.connect(mongoUri, { useNewUrlParser: true });
    logger.info('Connected to MongoDB; uri = ' + mongoUri);

    const port = config.get('API_PORT');
    server = app.listen(port, () => {
        logger.info(`Server started on port ${port}`);
    });
}

process.on('SIGTERM', async () => {
    logger.info('Received SIGTERM, going to shutdown server.');
    const { connection } = mongoose;
    if (connection) {
        await connection.close();
    }

    if (server) {
        server.close();
    }
    logger.info('Exited... Buy :)');
});

if (!module.parent) {
    main();
}

module.exports.main = main;

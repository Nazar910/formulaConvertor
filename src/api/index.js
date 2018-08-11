const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../../config');
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

async function main () {
    const mongoUri = config.get('MONGO_URI');
    await mongoose.connect(mongoUri, { useNewUrlParser: true });
    logger.info('Connected to MongoDB; uri = ' + mongoUri);

    const port = config.get('API_PORT');
    app.listen(port, () => {
        logger.info(`Server started on port ${port}`);
    });
}

if (!module.parent) {
    main();
}

module.exports.main = main;

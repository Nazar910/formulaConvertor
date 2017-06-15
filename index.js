'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

const api = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./passport.js')(passport);

app.use(cors({ origin: '*' }));

app.use('/api', api);

const port = process.env.API_PORT;
app.listen(port, () => {
    console.info(`Server started on port ${port}`);
    const mongoUri = process.env.MONGO_URI;
    mongoose.connect(mongoUri).then(() => console.log('Connected to MongoDB; uri = ' + mongoUri));
});

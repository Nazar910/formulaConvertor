'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const index = require('./routes/index');
const api = require('./routes');

const app = express();

require('dotenv').config();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./passport.js')(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/api', api);

const port = process.env.API_PORT;
app.listen(port, async () => {
  console.info(`Server started on port ${port}`);
  await mongoose.connect(process.env.MONGO_URI);
});

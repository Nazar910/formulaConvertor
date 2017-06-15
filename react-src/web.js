'use strict';
const express = require('express');
const path = require('path');

const app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

const port = process.env.FRONTEND_PORT;
app.listen(port, () => {
    console.info(`Frontend started on port ${port}`);
});

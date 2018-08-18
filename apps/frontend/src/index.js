const config = require('../config');
const express = require('express');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use static directory
app.use(express.static(path.join(__dirname, 'public')));

// the most important route
app.use('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

async function main () {
    const port = config.get('FRONTEND_PORT');
    app.listen(port, () => {
        console.info(`Frontend started on port ${port}`);
    });
}

if (!module.parent) {
    main();
}

module.exports.main = main;

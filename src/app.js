const express = require('express');

const UsersRoute = require('./routes/UsersRoute');
const PenaltiesRoute = require('./routes/PenaltiesRoute');

require('./database');

const app = express();

app.use(express.json());

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, emailUser');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/user', UsersRoute);
app.use('/penalty', PenaltiesRoute);


module.exports = app;
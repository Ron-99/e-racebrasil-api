const express = require('express');

const UsersRoute = require('./routes/UsersRoute');
const PenaltiesRoute = require('./routes/PenaltiesRoute');
const TracksRoute = require('./routes/TracksRoute');
const DriversRoute = require('./routes/DriversRoute');
const TeamsRoute = require('./routes/TeamsRoute');
const RanksRoute = require('./routes/RanksRoute');
const SeasonsRoute = require('./routes/SeasonsRoute');
const ClassificationsRoute = require('./routes/ClassificationRoute');

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
app.use('/track', TracksRoute);
app.use('/driver', DriversRoute);
app.use('/team', TeamsRoute);
app.use('/rank', RanksRoute);
app.use('/season', SeasonsRoute);
app.use('/classification', ClassificationsRoute);

module.exports = app;
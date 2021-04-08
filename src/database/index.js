const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Users = require('../models/Users');
const Classifications = require('../models/Classifications');
const Drivers = require('../models/Drivers');
const Penalties = require('../models/Penalties');
const Ranks = require('../models/Ranks');
const Seasons = require('../models/Seasons');
const Teams = require('../models/Teams');
const Tracks = require('../models/Tracks');
const DriversParticipated = require('../models/DriversParticipated');
const SaleTeam = require('../models/SaleTeam');
const SaleTeamRank = require('../models/SaleTeamRank');
const TempTeams = require('../models/TempTeams');
const Posts = require('../models/Posts');

const connection = new Sequelize(dbConfig);

Users.init(connection);
Classifications.init(connection);
Drivers.init(connection);
Penalties.init(connection);
Ranks.init(connection);
Seasons.init(connection);
Teams.init(connection);
Tracks.init(connection);
DriversParticipated.init(connection);
SaleTeam.init(connection);
SaleTeamRank.init(connection);
TempTeams.init(connection);
Posts.init(connection);

Users.associate(connection.models);
Classifications.associate(connection.models);
Drivers.associate(connection.models);
Penalties.associate(connection.models);
Ranks.associate(connection.models);
Seasons.associate(connection.models);
Teams.associate(connection.models);
Tracks.associate(connection.models);
DriversParticipated.associate(connection.models);
SaleTeam.associate(connection.models);
SaleTeamRank.associate(connection.models);
TempTeams.associate(connection.models);
Posts.associate(connection.models);

module.exports = connection;
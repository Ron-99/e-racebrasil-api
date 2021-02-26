const Drivers = require('../models/Drivers');
const DriversParticipated = require('../models/DriversParticipated');
const Classifications = require('../models/Classifications');
const Tracks = require('../models/Tracks');
const Seasons = require('../models/Seasons');
const Ranks = require('../models/Ranks');
const Teams = require('../models/Teams');


module.exports = {
    
    async findAll (){
        const drivers = await Drivers.findAll();
        return drivers;
    },

    async findByName (name, season){
        const drivers = await Drivers.sequelize.query(`
        SELECT
            d.id,
            d.name AS 'driver',
            r.name AS 'rank',
            t.name AS 'team' 
        FROM 
            eracebrasil.drivers d INNER JOIN 
            eracebrasil.drivers_participated dp ON d.id = dp.driver_id INNER JOIN 
            eracebrasil.teams t ON t.id = dp.team_id INNER JOIN 
            eracebrasil.seasons s ON s.id = dp.season_id INNER JOIN 
            eracebrasil.ranks r ON r.id = s.rank_id 
        WHERE 
            d.name LIKE '${name}%' AND s.\`number\` = ${season}
        `)
        return drivers[0];
    },

    async findById (id){
        const drivers = await Drivers.sequelize.query(`
            SELECT
                d.id,
                d.name AS 'name',
                r.name AS 'rank',
                t.name AS 'team',
                p.level,
                p.color,
                p.description
            FROM 
                eracebrasil.drivers d INNER JOIN 
                eracebrasil.drivers_participated dp ON d.id = dp.driver_id INNER JOIN 
                eracebrasil.teams t ON t.id = dp.team_id INNER JOIN 
                eracebrasil.seasons s ON s.id = dp.season_id INNER JOIN 
                eracebrasil.ranks r ON r.id = s.rank_id INNER JOIN
                eracebrasil.penalties p ON p.id = d.penalty_id
            WHERE 
                d.id = ${id}
        `)
        return drivers[0];
    },

    async findDriversByTeam (team_id, season_id){
        const drivers = await Drivers.findAll({
            attributes: ['name'],
            include: {
                model: DriversParticipated,
                as: 'drivers_participated',
                required: true,
                right: true,
                attributes: ['reserve'],
                where: {
                    season_id,
                    team_id
                }
            }
        });

        return drivers;
    },

    async findTrophys (driver){
        const trophys = await Drivers.sequelize.query(`
        SELECT 
        (
            SELECT 
                COUNT(c.\`position\`) 
            FROM 
                eracebrasil.classification c
            WHERE
                c.\`position\` = 1 AND c.driver_id = ${driver}
            GROUP BY 
                c.\`position\` 
        ) AS 'first',
        (
            SELECT 
                COUNT(c.\`position\`) 
            FROM 
                eracebrasil.classification c
            WHERE
                c.\`position\` = 2 AND c.driver_id = ${driver}
            GROUP BY 
                c.\`position\` 
        ) AS 'second',
        (
            SELECT 
                COUNT(c.\`position\`) 
            FROM 
                eracebrasil.classification c
            WHERE
                c.\`position\` = 3 AND c.driver_id = ${driver}
            GROUP BY 
                c.\`position\` 
        ) AS 'third'
        `);

        return trophys[0];
    },

    async findLatestsRaces (id){
        const races = await Classifications.sequelize.query(`
        SELECT 
            c.id,
            c.\`position\`,
            c.best_time,
            c.trial_time,
            c.best_lap,
            c.points,
            t.name AS 'track',
            c.date,
            r.name AS 'rank'
            
        FROM 
            eracebrasil.classification c INNER JOIN
            eracebrasil.tracks t ON t.id = c.track_id INNER JOIN 
            eracebrasil.seasons s ON s.id = c.season_id INNER JOIN 
            eracebrasil.ranks r ON r.id = s.rank_id 
        WHERE 
            c.driver_id = ${id}
        ORDER BY
            date DESC
        `)

        return races[0];
    },

    async findTeams (id){
        const teams = await DriversParticipated.findAll({
            where: {
                driver_id: id
            },
            attributes: [],
            include: {
                model: Teams,
                as: 'teams',
                required: true,
                right: true,
                attributes: ['id', 'name']
            }
        });

        return teams;
    },

    async create (data){
        const driver = await Drivers.create(data);
        return driver;
    },

    async update(id, data){
        await Drivers.update(data, {where: {id}});
        const driver = await Drivers.findByPk(id);
        return driver;
    },

    async updateName(id, data){
        await Drivers.update(data, {where: {id}});
        const driver = await Drivers.findByPk(id);
        return driver;
    },

    async updatePenalty(id, data){
        await Drivers.update(data, {where: {id}});
        const driver = await Drivers.findByPk(id);
        return driver;
    }
}
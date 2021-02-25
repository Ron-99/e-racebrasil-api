const Classifications = require('../models/Classifications');
const Tracks = require('../models/Tracks');
const Drivers = require('../models/Drivers');
const DriversParticipated = require('../models/DriversParticipated');
const Teams = require('../models/Teams');
const Seasons = require('../models/Seasons');
const Ranks = require('../models/Ranks');
const SeasonsRepository = require('../repositories/SeasonsRepository');

module.exports = {

    async findAll(rank, season, date) {
        const {id: season_id} = await SeasonsRepository.findByRankAndSeason(rank, season);
        const classifications = await Classifications.findAll({
            where: {
                date: date,
                season_id
            },
            attributes: ['id', 'position', 'best_time', 'best_lap', 'trial_time', 'points'],
            order: ['position'],
            include: [
                {
                    model: Tracks,
                    as: 'tracks',
                    required: true,
                    right: true,
                    attributes: ['name']
                },
                {
                    model: Drivers,
                    as: 'drivers',
                    required: true,
                    right: true,
                    attributes: ['id', 'name'],
                    include:
                    {
                        model: DriversParticipated,
                        as: 'drivers_participated',
                        required: true,
                        right: true,
                        attributes: ['reserve', 'season_id'],
                        include: [
                            {
                                model: Teams,
                                as: 'teams',
                                required: true,
                                right: true,
                                attributes: ['name']

                            },
                            {
                                model: Seasons,
                                as: 'seasons',
                                required: true,
                                right: true,
                                attributes: ['number'],
                                include: {
                                    model: Ranks,
                                    as: 'ranks',
                                    required: true,
                                    right: true,
                                    attributes: ['name'],
                                    where: {
                                        name: rank
                                    }
                                },
                                where: {
                                    number: season
                                }
                            }
                        ]
                    }

                }
            ]
        });
        return classifications;
    },

    async findById(id) {
        const classification = await Classifications.findByPk(id);
        return classification;
    },

    async findDatesByRank(rank, season) {
        const classifications = await Classifications.sequelize.query(
            `SELECT
                c.\`date\` 
             FROM 
                eracebrasil.classification c INNER JOIN 
                eracebrasil.seasons s ON c.season_id = s.id INNER JOIN 
                eracebrasil.ranks r ON s.rank_id = r.id 
            WHERE 
                r.name = '${rank}' AND s.\`number\` = ${season}
            GROUP BY 
                c.\`date\` 
            ORDER BY 
                c.\`date\` DESC`)

        return classifications[0];
    },

    async findDriversPoints(rank, season){
        const classifications = await Classifications.sequelize.query(
            `
            SELECT
                d.id,
                d.name AS 'driver',
                t.name AS 'team',
                SUM(c.points) AS points
            FROM  
                eracebrasil.classification c INNER JOIN 
                eracebrasil.drivers d ON c.driver_id = d.id INNER JOIN
                eracebrasil.drivers_participated dp ON dp.driver_id = d.id INNER JOIN 
                eracebrasil.teams t ON dp.team_id = t.id INNER JOIN 
                eracebrasil.seasons s ON dp.season_id = s.id AND c.season_id = s.id INNER JOIN
                eracebrasil.ranks r ON s.rank_id = r.id
            WHERE 
                r.name = '${rank}' AND s.\`number\` = ${season}
            GROUP BY
                d.name, t.name, d.id
            ORDER BY
                points DESC`)

        return classifications[0];
    },

    async findTeamsPoints (rank, season){
        const classifications = await Classifications.sequelize.query(
            `
            SELECT
                t.id,
                t.name AS 'team',
                SUM(c.points) AS points,
                s.id AS 'season',
                t.id AS 'teamId'
            FROM  
                eracebrasil.classification c INNER JOIN 
                eracebrasil.drivers d ON c.driver_id = d.id INNER JOIN
                eracebrasil.drivers_participated dp ON dp.driver_id = d.id INNER JOIN 
                eracebrasil.teams t ON dp.team_id = t.id INNER JOIN 
                eracebrasil.seasons s ON dp.season_id = s.id AND c.season_id = s.id INNER JOIN
                eracebrasil.ranks r ON s.rank_id = r.id
            WHERE 
                r.name = '${rank}' AND s.\`number\` = ${season}
            GROUP BY
                t.name, t.id, s.id, t.id
            ORDER BY
                points DESC`)

        return classifications[0];
    },

    async create(data) {
        const classification = await Classifications.create(data);
        return classification;
    },

    async update(id, data) {
        await Classifications.update(data, { where: { id } });
        const classification = await this.findById(id);
        return classification;
    },

    async delete(id) {
        await Classifications.destroy({ where: { id } });
    }
}
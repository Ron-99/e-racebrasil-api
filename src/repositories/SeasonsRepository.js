const Seasons = require('../models/Seasons');
const Ranks = require('../models/Ranks');

module.exports = {

    async findAll () {
        const seasons = await Seasons.findAll();
        return seasons;
    },

    async findById (id){
        const season = await Seasons.findByPk(id);
        return season;
    },

    async findByRank (rank_id){
        const seasons = await Seasons.findAll({
            attributes: ['id','number'],
            include: {
                model: Ranks,
                as: 'ranks',
                right: true,
                required: true,
                where: {
                    id: rank_id
                },
                attributes: []
            },
            order: [
                [['number', 'DESC']]
            ]
        });
        return seasons;
    },

    async findByRankAndSeason (rank, seasonNumber){
        const season = await Seasons.findOne({
            attributes: ['id'],
            include: {
                model: Ranks,
                as: 'ranks',
                right: true,
                required: true,
                where: {
                    name: rank
                },
                attributes: []
            },
            where: {
                number: seasonNumber
            }
        });
        return season;
    },

    async findLastSeason (){
        const season = await Seasons.findOne({
            attributes: ['number'],
            group: ['number'],
            order: [
                [['number', 'DESC']]
            ]
        });
        return season;
    },

    async findLastSeasonByRank (rank_id){
        const season = await Seasons.findOne({
            attributes: ['number'],
            group: ['number'],
            order: [
                [['number', 'DESC']]
            ],
            where:{
                rank_id
            }
        });
        return season;
    },

    async create (data){
        const season = await Seasons.create(data);
        return season;
    },

    async update (id, data){
        await Seasons.update(data, {where: {id}});
        const season = await this.findById(id);
        return season;
    },

    async delete (id){
        await Seasons.destroy({where: {id}});
    }

}
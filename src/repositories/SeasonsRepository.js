const Seasons = require('../models/Seasons');

module.exports = {

    async findAll () {
        const seasons = await Seasons.findAll();
        return seasons;
    },

    async findById (id){
        const season = await Seasons.findByPk(id);
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
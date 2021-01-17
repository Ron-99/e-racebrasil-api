const Ranks = require('../models/Ranks');

module.exports = {
    async findAll (){
        const ranks = await Ranks.findAll();
        return ranks;
    },

    async findById (id){
        const rank = await Ranks.findByPk(id);
        return rank;
    },

    async create (data){
        const rank = await Ranks.create(data);
        return rank;
    },

    async update (id, data) {
        await Ranks.update(data, {where: {id}});
        const rank = await this.findById(id);
        return rank;
    },

    async delete (id){
        await Ranks.destroy({where: {id}});
    }
}
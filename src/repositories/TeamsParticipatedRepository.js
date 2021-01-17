const TeamsParticipated = require('../models/TeamsParticipated');

module.exports = {

    async findAll (){
        const teams = await TeamsParticipated.findAll();
        return teams;
    },

    async findById (id){
        const team = await TeamsParticipated.findByPk(id);
        return team;
    },

    async create (data){
        const team = await TeamsParticipated.create(data);
        return team;
    },

    async update (id, data){
        await TeamsParticipated.update(data, {where: {id}});
        const team = await this.findById(id);
        return team;
    },

    async delete (id){
        await TeamsParticipated.destroy({where: {id}});
    }
}
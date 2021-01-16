const { update } = require('../models/Teams');
const Teams = require('../models/Teams');

module.exports = {

    async findAll (){
        const teams = await Teams.findAll();
        return teams;
    },

    async findById (id){
        const team = await Teams.findByPk(id);
        return team;
    },

    async create (data){
        const team = await Teams.create(data);
        return team;
    },

    async update (id, data){
        await Teams.update(data, {where: {id}});
        const team = await this.findById(id);
        return team;
    },

    async delete (id){
        await Teams.destroy({where: {id}});
    }
}
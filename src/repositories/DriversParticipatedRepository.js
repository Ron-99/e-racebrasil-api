const DriversParticipated = require('../models/DriversParticipated');
const Seasons = require('../models/Seasons');
const Ranks = require('../models/Ranks');

module.exports = {

    async findAll (){
        const drivers = await DriversParticipated.findAll();
        return drivers;
    },

    async findById (id){
        const driver = await DriversParticipated.findByPk(id);
        return driver;
    },

    async findByDriver (driver_id){
        const driver = await DriversParticipated.findOne({
            attributes: [],
            where: {
                driver_id
            },  
            include: {
                model: Seasons,
                as: 'seasons',
                required: true,
                right: true,
                attributes: ['id']
            },
            order: [
                [{model: Seasons, as: 'seasons'}, 'number', 'DESC']
            ]
        });
        
        return driver;
    },

    async create (data){
        const driver = await DriversParticipated.create(data);
        return driver;
    },

    async update (id, data){
        await DriversParticipated.update(data, {where: {id}});
        const driver = await this.findById(id);
        return driver;
    },

    async delete (id){
        await DriversParticipated.destroy({where: {id}});
    }
}
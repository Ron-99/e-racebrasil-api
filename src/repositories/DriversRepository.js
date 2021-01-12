const Drivers = require('../models/Drivers');
const { Op } = require('sequelize');

module.exports = {
    
    async findAll (){
        const drivers = await Drivers.findAll();
        return drivers;
    },

    async findByName (name){
        const drivers = await Drivers.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });

        return drivers;
    },

    async findById (id){
        const driver = await Drivers.findByPk(id);
        return driver;
    },

    async create (data){
        const driver = await Drivers.create(data);
        return driver;
    },

    async update(id, data){
        await Drivers.update(data, {where: {id}});
        const driver = await Drivers.findByPk(id);
        return driver;
    }
}
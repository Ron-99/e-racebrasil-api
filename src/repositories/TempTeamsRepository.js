const TempTeams = require('../models/TempTeams');

module.exports = {

    async findAll(){
        const tempTeams = await TempTeams.sequelize.query(`
        SELECT
            tt.name,
            (SELECT d2.name FROM drivers d2 WHERE d2.id = tt.first_driver) AS 'driverOne',
            (SELECT d2.name FROM drivers d2 WHERE d2.id = tt.second_driver) AS 'driverTwo'
        FROM 
            temp_teams tt
        `);
        return tempTeams[0];
    },

    async findByName (name){
        const tempTeam = await TempTeams.findOne({
            where: {
                name
            }
        });
        return tempTeam;
    },

    async create(data){
        const tempTeams = TempTeams.create(data);
        return tempTeams;
    }
}
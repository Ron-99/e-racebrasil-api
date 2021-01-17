const { Model, DataTypes } = require('sequelize');

class TeamsParticipated extends Model {
    static init(sequelize) {
        super.init({
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'teams_participated'
        })
    }

    static associate(models){
        this.belongsTo(models.Teams, {foreignKey: 'team_id', as: 'teams'});
        this.belongsTo(models.Drivers, {foreignKey: 'driver_id', as: 'drivers'});
    }
}

module.exports = TeamsParticipated;
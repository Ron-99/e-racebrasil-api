const { Model, DataTypes } = require('sequelize');

class DriversParticipated extends Model {
    static init(sequelize) {
        super.init({
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
            reserve: DataTypes.BOOLEAN
        }, {
            sequelize,
            tableName: 'drivers_participated'
        })
    }

    static associate(models){
        this.belongsTo(models.Teams, {foreignKey: 'team_id', as: 'teams'});
        this.belongsTo(models.Drivers, {foreignKey: 'driver_id', as: 'drivers'});
        this.belongsTo(models.Seasons, {foreignKey: 'season_id', as: 'seasons'});
    }
}

module.exports = DriversParticipated;
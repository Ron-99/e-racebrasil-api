const { Model, DataTypes } = require('sequelize');

class Classifications extends Model {
    static init(sequelize) {
        super.init({
            position: DataTypes.INTEGER,
            best_time: DataTypes.STRING,
            best_lap: DataTypes.BOOLEAN,
            trial_time: DataTypes.STRING,
            date: DataTypes.DATEONLY,
            points: DataTypes.INTEGER,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'classification'
        })
    }

    static associate(models){
        this.belongsTo(models.Drivers, {foreignKey: 'driver_id', as: 'drivers'});
        this.belongsTo(models.Tracks, {foreignKey: 'track_id', as: 'tracks'});
        this.belongsTo(models.Seasons, {foreignKey: 'season_id', as: 'seasons'});
    }
}

module.exports = Classifications;
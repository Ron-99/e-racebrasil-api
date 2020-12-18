const { Model, DataTypes } = require('sequelize');

class Classifications extends Model {
    static init(sequelize) {
        super.init({
            position: DataTypes.INTEGER,
            best_time: DataTypes.STRING,
            best_lap: DataTypes.BOOLEAN,
            trial_time: DataTypes.STRING,
            date: DataTypes.DATE,
            points: DataTypes.INTEGER,
            driver_id: DataTypes.INTEGER,
            track_id: DataTypes.INTEGER,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Drivers, {foreignKey: 'driver_id', as: 'drivers'});
        this.hasOne(models.Tracks, {foreignKey: 'track_id', as: 'tracks'});
    }
}

module.exports = Classifications;
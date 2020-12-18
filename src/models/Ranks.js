const { Model, DataTypes } = require('sequelize');

class Ranks extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Seasons, { foreignKey: 'rank_id', as: 'seasons'});
        this.belongsTo(models.Drivers, { foreignKey: 'driver_id', as: 'drivers'});
    }
}

module.exports = Ranks;
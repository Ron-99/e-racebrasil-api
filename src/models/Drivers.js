const { Model, DataTypes } = require('sequelize');

class Drivers extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            coins: DataTypes.DOUBLE,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Penalties, {foreignKey: 'penalty_id', as: 'penalties'});
        this.hasOne(models.Users, {foreignKey: 'id', as: 'users'});
        this.hasMany(models.DriversParticipated, {foreignKey: 'driver_id', as: 'drivers_participated'});
        this.hasMany(models.Classifications, {foreignKey: 'driver_id', as: 'classifications'});
    }
}

module.exports = Drivers;
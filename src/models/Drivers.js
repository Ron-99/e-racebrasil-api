const { Model, DataTypes } = require('sequelize');

class Drivers extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasOne(models.Penalties, {foreignKey: 'penalty_id', as: 'penalties'});
        this.hasOne(models.Users, {foreignKey: 'user_id', as: 'users'});
        this.hasMany(models.Ranks, {foreignKey: 'driver_id', as: 'ranks'});
        this.hasMany(models.Teams, {foreignKey: 'driver_id', as: 'teams'});
        this.hasMany(models.Classifications, {foreignKey: 'driver_id', as: 'classifications'});
    }
}

module.exports = Drivers;
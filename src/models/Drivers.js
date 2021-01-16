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
        this.belongsTo(models.Penalties, {foreignKey: 'penalty_id', as: 'penalties'});
        this.hasOne(models.Penalties, {foreignKey: 'user_id', as: 'users'});
        this.hasMany(models.RanksParticipated, {foreignKey: 'driver_id', as: 'ranks_participated'});
        this.hasMany(models.TeamsParticipated, {foreignKey: 'driver_id', as: 'teams_participated'});
        this.hasMany(models.Classifications, {foreignKey: 'driver_id', as: 'classifications'});
    }
}

module.exports = Drivers;
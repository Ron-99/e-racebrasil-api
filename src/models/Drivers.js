const { Model, DataTypes } = require('sequelize');

class Drivers extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasOne(models.Penalties, { foreignKey: 'penalty_id', as: 'penalties'});
    }
}

module.exports = Drivers;
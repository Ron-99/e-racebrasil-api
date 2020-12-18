const { Model, DataTypes } = require('sequelize');

class Penalties extends Model {
    static init(sequelize) {
        super.init({
            level: DataTypes.INTEGER,
            color: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Drivers, {foreignKey: 'penalty_id', as: 'drivers'});
    }
}

module.exports = Penalties;
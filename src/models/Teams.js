const { Model, DataTypes } = require('sequelize');

class Teams extends Model {
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
        this.belongsTo(models.Drivers, {foreignKey: 'driver_id', as: 'drivers'});
    }
}

module.exports = Teams;
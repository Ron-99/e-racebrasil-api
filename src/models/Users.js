const { Model, DataTypes } = require('sequelize');

class Users extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.ENUM('user', 'admin'),
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            driver_id: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Drivers, {foreignKey: 'id', as: 'drivers'});
    }
}

module.exports = Users;

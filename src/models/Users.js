const { Model, DataTypes } = require('sequelize');

class Users extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.ENUM('user', 'admin')
        }, {
            sequelize
        })
    }

    static associate(models){
        this.hasOne(models.Drivers, { foreignKey: 'user_id', as: 'drivers'});
    }
}

module.exports = Users;
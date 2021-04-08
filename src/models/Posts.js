const { Model, DataTypes } = require('sequelize');

class Posts extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            read_time: DataTypes.STRING,
            url: DataTypes.STRING,
            text: DataTypes.TEXT
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Users, {foreignKey: 'author'});
    }
}

module.exports = Posts;
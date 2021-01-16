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
        this.hasMany(models.TeamsParticipated, { foreignKey: 'id', as: 'teams_participated'})
    }
}

module.exports = Teams;
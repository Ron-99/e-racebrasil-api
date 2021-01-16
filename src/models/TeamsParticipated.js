const { Model, DataTypes } = require('sequelize');

class TeamsParticipated extends Model {
    static init(sequelize) {
        super.init({
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Teams, {foreignKey: 'id', as: 'teams'});
        this.belongsTo(models.Ranks, {foreignKey: 'id', as: 'ranks'})
    }
}

module.exports = TeamsParticipated;
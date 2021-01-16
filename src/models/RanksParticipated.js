const { Model, DataTypes } = require('sequelize');

class RanksParticipated extends Model {
    static init(sequelize) {
        super.init({
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Drivers, {foreignKey: 'id', as: 'drivers'});
        this.belongsTo(models.Ranks, {foreignKey: 'id', as: 'ranks'})
    }
}

module.exports = RanksParticipated;
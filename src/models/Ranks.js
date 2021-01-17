const { Model, DataTypes } = require('sequelize');

class Ranks extends Model {
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
        this.hasMany(models.Seasons, { foreignKey: 'rank_id', as: 'seasons'});
        this.hasMany(models.RanksParticipated, { foreignKey: 'id', as: 'ranks_participated'})
    }
}

module.exports = Ranks;
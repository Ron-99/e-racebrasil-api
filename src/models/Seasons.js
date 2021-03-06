const { Model, DataTypes } = require('sequelize');

class Seasons extends Model {
    static init(sequelize) {
        super.init({
            number: DataTypes.NUMBER,
            initial_date: DataTypes.DATE,
            final_date: DataTypes.DATE,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Ranks, { foreignKey: 'rank_id', as: 'ranks'});
        this.hasMany(models.DriversParticipated, { foreignKey: 'id', as: 'drivers_participated'});
        this.hasMany(models.Classifications, {foreignKey: 'season_id', as:'classifications'});
    }
}

module.exports = Seasons;
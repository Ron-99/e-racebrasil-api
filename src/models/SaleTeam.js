const { Model, DataTypes } = require('sequelize');

class SaleTeam extends Model {
    static init(sequelize) {
        super.init({
            startsIn: DataTypes.DATE,
            endsIn: DataTypes.DATE,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'sale_team'
        })
    }

    static associate(models){
        this.belongsTo(models.Teams, { foreignKey: 'team'});
        this.belongsTo(models.Seasons, { foreignKey: 'season_id'});
    }
}

module.exports = SaleTeam;
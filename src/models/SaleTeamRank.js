const { Model, DataTypes } = require('sequelize');

class SaleTeamRank extends Model {
    static init(sequelize) {
        super.init({
            coins: DataTypes.DOUBLE,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'sale_team_rank'
        })
    }

    static associate(models){
        this.belongsTo(models.TempTeams, { foreignKey: 'temp_teams'});
        this.belongsTo(models.SaleTeam, { foreignKey: 'sale_team'});
    }
}

module.exports = SaleTeamRank;
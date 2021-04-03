const { Model, DataTypes } = require('sequelize');

class TempTeams extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'temp_teams'
        })
    }

    static associate(models){
        this.belongsTo(models.Drivers, { foreignKey: 'first_driver'});
        this.belongsTo(models.Drivers, { foreignKey: 'second_driver'});
    }
}

module.exports = TempTeams;
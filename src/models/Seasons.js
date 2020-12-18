const { Model, DataTypes } = require('sequelize');

class Seasons extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
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
    }
}

module.exports = Seasons;
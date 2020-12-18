const { Model, DataTypes } = require('sequelize');

class Tracks extends Model {
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
        this.belongsTo(models.Classifications, {foreignKey: 'track_id', as: 'classifications'});
    }
}

module.exports = Tracks;
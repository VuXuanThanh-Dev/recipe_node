const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configs/database');

class ingredient extends Model{}

ingredient.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1
    }
},{
    sequelize,
    modelName: 'Ingredient',
    timestamps: false
}); 

module.exports = ingredient;
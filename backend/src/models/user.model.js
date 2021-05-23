const { DataTypes, Model } = require('sequelize');
const db = require('../configs/database');

class User  extends Model{}
User.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1
    }
},
{
    db,
    modelName: 'User',
    timestamps: false
})
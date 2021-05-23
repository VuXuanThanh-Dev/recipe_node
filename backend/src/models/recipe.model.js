const { DataTypes } = require('sequelize');

const db = require('../configs/database');

const recipe = db.define('recipe', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1
    }
},
{
    timestamps: false
});

module.exports = recipe;
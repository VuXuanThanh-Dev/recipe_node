const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configs/database');
const recipe = require('./recipe.model');
const ingredient = require('./ingredient.model');

class sub_recipe extends Model{}

sub_recipe.init({
    recipeId:{
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: recipe
        }
    },
    ingredientId :{
        type: DataTypes.INTEGER,
        references: {
            model: ingredient,
            key: 'id'
        }
    },
    amount:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
{
    sequelize,
    modelName: 'sub_recipe',
    timestamps: false
});



module.exports = sub_recipe;
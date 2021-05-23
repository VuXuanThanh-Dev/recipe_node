const { QueryTypes } = require('sequelize');
const recipe = require('../models/recipe.model');
const db = require('../configs/database');

//tra ve mang neu select nen chi can result
exports.search_recipe = async (req, res, next)=> {
    let result = await db.query("select * from recipes where `status`=1 limit 5", {
        type: QueryTypes.SELECT
    });
    try{
        if(!result){
            res.json({message: "recipe_search.failed", errors:'internal server error', data: null});
        }else{
            res.json({message: 'recipe_search.success', errors:null, data: result});
        }
    }catch (err){
        console.log(err);
    }
};

// insert thi chi can trar ve result[0]
exports.createRecipe = async (req, res, next)=> {
    let sql = 'insert into recipes(`name`, `imageUrl`, `description`) values(?, ?, ?)';
    let result = await db.query(sql, {
        type: QueryTypes.INSERT,
        replacements: [req.body.name, req.body.imageUrl, req.body.description]
    });
    try{
        console.log(result);
        if(result.length == 0){
            res.json({message: "recipe_create.failed", errors:'internal server error', data: null});
        }else{
            res.json({message: "recipe_create.success", errors: null, data: result[0]});
        }
    }catch(err){
        console.log(err);
    }
};

exports.updateRecipe = async (req, res, next)=> {
    let sql = 'update recipes set `name`=:name, `imageUrl`=:imageUrl, `description`=:description where `id`=:id';
    let result = db.query(sql, {
        replacements: req.body,
        type: QueryTypes.UPDATE
    });
    try{
        if(!result){
            res.json({message: "recipe_update.failed", errors:'internal server error', data: null});
        }else{
            res.json({message: "recipe_update.success", errors: null, data: result});
        }
    }catch(err){
        console.log(err);
    }
};

exports.deleteRecipe = async (req, res, next)=>{
    let result = await db.query("update recipes set `status`=0 where `id`=:id;",
    {
        replacements: req.body,
        type: QueryTypes.UPDATE
    });
    try{
        if(!result){
            res.json({message: "recipe_delete.failed", errors:'internal server error', data: null});
        }else{
            res.json({message: "recipe_delete.success", errors: null, data: result});
        }
    }catch(err){
        console.log(err);
    }
}

exports.addIngredientInRecipe = async (req, res, next) => {
    let result =  await db.query('call AddIngredient(:ingredientId, :recipeId, :amount);',
    {
        replacements: req.body,
        type: QueryTypes.RAW
    });
    try{
            res.json({message: "recipe_update_ingredient.success", errors: null, data: result});
    }catch(err){
        console.log(err);
    }
}


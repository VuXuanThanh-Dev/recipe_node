const { QueryTypes } = require('sequelize');
const db = require('../configs/database');

exports.findAllIngredient = async (req, res, next) => {
    let sql = `Call FindIngredient(?)`;
    let result = await db.query(sql,{
        replacements: [req.body.id],
        type: QueryTypes.SELECT
    });
    try{
        if(!result){
            res.json({message:'ingredient_search.failed', errors: 'internal server error', data: null});
        }else{
            res.json({message:'ingredient.search.success', errors: null, data: result[0]});
        }
    }catch(err){
        console.log(err);
    }

}

exports.SearchIngredientByName = async (req, res, next) => {
    let result = await db.query('call searchIngredientByName(:name);',
    {
        replacements: req.body,
        type: QueryTypes.RAW
    });
    try{
        res.json({message:'ingredient.search_list_ingredient.success', errors: null, data: result});
        
    }catch(err){
        console.log(err);
    }
}
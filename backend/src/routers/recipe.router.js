const express = require('express');
const auth = require('../configs/auth.config');
const recipeController = require('../controllers/recipe.controller');
const ingredientController = require('../controllers/ingredient.controller');

const router = express.Router();

router.post('/recipe/search',auth.authen, recipeController.search_recipe);
router.post('/recipe/search_ingredient',auth.authen, ingredientController.findAllIngredient);
router.post('/recipe/create',auth.authen, recipeController.createRecipe);
router.post('/recipe/update',auth.authen, recipeController.updateRecipe);
router.post('/recipe/delete',auth.authen, recipeController.deleteRecipe);
router.post('/recipe/addIngredient',auth.authen, recipeController.addIngredientInRecipe);
router.post('/recipe/search_list_ingredient',auth.authen, ingredientController.SearchIngredientByName);
module.exports = router;
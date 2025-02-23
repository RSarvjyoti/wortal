const {Router} = require("express");
const { searchRecipes, getRecipeDetails } = require("../controllers/recipeController");


const recipeRoute = Router();

recipeRoute.get("/search", searchRecipes);
recipeRoute.get("/:id", getRecipeDetails);

module.exports = recipeRoute;
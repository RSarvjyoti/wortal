const {Router} = require("express");
const { saveRecipe, getSavedRecipes } = require("../controllers/savedRecipeController");
const authMiddleware = require("../middlewares/authMiddleware");

const saveRecipeRoute = Router();

saveRecipeRoute.post("/recipes", authMiddleware, saveRecipe);
saveRecipeRoute.get("/recipes", authMiddleware, getSavedRecipes);

module.exports = saveRecipeRoute;
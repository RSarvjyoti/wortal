const {Router} = require("express");
const { saveRecipe, getSavedRecipes, reorderSavedRecipes } = require("../controllers/savedRecipeController");
const authMiddleware = require("../middlewares/authMiddleware");

const saveRecipeRoute = Router();

saveRecipeRoute.post("/save", authMiddleware, saveRecipe);
saveRecipeRoute.get("/saved", authMiddleware, getSavedRecipes);
saveRecipeRoute.put("/reorder", authMiddleware, reorderSavedRecipes);

module.exports = saveRecipeRoute;
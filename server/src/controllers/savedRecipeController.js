const SavedRecipe = require("../models/savedRecipe.model");

// Save a Recipe
const saveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    let savedRecipes = await SavedRecipe.findOne({ userId });
    if (!savedRecipes) {
      savedRecipes = new SavedRecipe({ userId, recipes: [] });
    }

    savedRecipes.recipes.push({ recipeId, order: savedRecipes.recipes.length + 1 });
    await savedRecipes.save();

    res.status(201).json({ message: "Recipe saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving recipe" });
  }
};

// Get Saved Recipes
const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const savedRecipes = await SavedRecipe.findOne({ userId }).populate("recipes.recipeId");

    res.json(savedRecipes?.recipes || []);
  } catch (error) {
    res.status(500).json({ error: "Error fetching saved recipes" });
  }
};

// Reorder Saved Recipes
const reorderSavedRecipes = async (req, res) => {
  try {
    const { newOrder } = req.body; // Array of { recipeId, order }
    const userId = req.user.userId;

    let savedRecipes = await SavedRecipe.findOne({ userId });
    if (!savedRecipes) return res.status(404).json({ error: "No saved recipes found" });

    savedRecipes.recipes = newOrder.map((r, index) => ({
      recipeId: r.recipeId,
      order: index + 1,
    }));

    await savedRecipes.save();
    res.json({ message: "Recipe order updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating recipe order" });
  }
};

module.exports = {saveRecipe, getSavedRecipes, reorderSavedRecipes};

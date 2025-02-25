const SavedRecipe = require("../models/savedRecipe.model");
const mongoose = require("mongoose");

const saveRecipe = async (req, res) => {
  try {
    const userId = req.user?.userId; 
    const { recipeId, title, image } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    if (!recipeId || !mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid or missing recipeId" });
    }

    const objectIdRecipe = new mongoose.Types.ObjectId(recipeId);

    console.log("Saving Recipe:", { userId, recipeId });

    let savedRecipe = await SavedRecipe.findOne({ userId });

    if (!savedRecipe) {
      savedRecipe = new SavedRecipe({
        userId,
        recipes: [{ recipeId: objectIdRecipe }],
        title,
        image
      });
    } else {
      const alreadySaved = savedRecipe.recipes.some((r) =>
        r.recipeId.equals(objectIdRecipe)
      );

      if (alreadySaved) {
        return res.status(409).json({ error: "Recipe already saved" });
      }

      savedRecipe.recipes.push({ recipeId: objectIdRecipe });
    }

    await savedRecipe.save();
    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log(userId);
    

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    console.log("Fetching saved recipes for user:", userId);

    const savedRecipes = await SavedRecipe.findOne({ userId })
 
      const getAll = await savedRecipes.recipes
      console.log(getAll);
      

    if (!savedRecipes || savedRecipes.recipes.length === 0) {
      return res.status(404).json({ message: "No saved recipes found" });
    }

    res.status(200).json(savedRecipes.recipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { saveRecipe, getSavedRecipes };
const axios = require("axios");
const Recipe = require("../models/recipe.model");
require("dotenv").config();

const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
    console.log("Fetching from Spoonacular API:", apiUrl);

    const response = await axios.get(apiUrl);

    if (!response.data?.results?.length) {
      return res.status(404).json({ error: "No recipes found" });
    }

    // Loop through each recipe from the API response and save it to the database if not already saved
    for (const apiRecipe of response.data.results) {
      const existingRecipe = await Recipe.findOne({ spoonacularId: apiRecipe.id });

      if (!existingRecipe) {
        const newRecipe = new Recipe({
          spoonacularId: apiRecipe.id,
          title: apiRecipe.title,
          image: apiRecipe.image,
          sourceUrl: apiRecipe.sourceUrl || null,
        });

        await newRecipe.save();
        console.log(`Recipe saved: ${apiRecipe.title}`);
      } else {
        console.log(`Recipe already exists: ${apiRecipe.title}`);
      }
    }

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching or saving recipes:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let recipe = await Recipe.findOne({ spoonacularId: id });

    if (recipe) {
      return res.json(recipe);
    }
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    const response = await axios.get(apiUrl);
    const recipeData = response.data;

    if (!recipeData.title || !recipeData.id) {
      return res.status(400).json({ error: "Invalid recipe data" });
    }

    
    const ingredients = recipeData.extendedIngredients?.map((ing) => ing.original) || [];

    recipe = new Recipe({
      title: recipeData.title,
      image: recipeData.image,
      summary: recipeData.summary,
      ingredients,
      instructions: recipeData.instructions || "",
      nutrition: {
        calories: recipeData.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0,
        protein: recipeData.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || "0g",
        fat: recipeData.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || "0g",
        carbs: recipeData.nutrition?.nutrients?.find(n => n.name === "Carbohydrates")?.amount || "0g",
      },
      spoonacularId: recipeData.id,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);
    res.status(500).json({ error: "Error fetching recipe details" });
  }
};

module.exports = { searchRecipes, getRecipeDetails };
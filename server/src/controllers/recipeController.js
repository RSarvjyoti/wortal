const axios = require("axios");
require("dotenv").config();

// Search Recipes
const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

// Get Recipe Details
const getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe details" });
  }
};

module.exports = {searchRecipes, getRecipeDetails};
const {Schema, model} = require("mongoose");

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String },
    summary: { type: String },
    ingredients: [{ type: String }],
    instructions: { type: String },
    nutrition: {
      calories: { type: Number },
      protein: { type: String },
      fat: { type: String },
      carbs: { type: String },
    },
    spoonacularId: { type: Number, unique: true }, // To avoid duplicates
    createdAt: { type: Date, default: Date.now },
  });
  
  const Recipe = model("Recipe", RecipeSchema);

  module.exports = Recipe;
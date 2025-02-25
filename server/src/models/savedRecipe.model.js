const { Schema, model } = require("mongoose");

const SavedRecipeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true, 
    },
    recipes: [
      {
        recipeId: {
          type: Schema.Types.ObjectId,
          ref: "savedrecipes",
          required: true,
        },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
);

const SavedRecipe = model("SavedRecipe", SavedRecipeSchema);

module.exports = SavedRecipe;
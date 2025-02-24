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
          ref: "recipes",
          required: true,
        },
        order: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "savedrecipes" } 
);

SavedRecipeSchema.index({ userId: 1, "recipes.recipeId": 1 }, { unique: true });

const SavedRecipe = model("SavedRecipe", SavedRecipeSchema);

module.exports = SavedRecipe;
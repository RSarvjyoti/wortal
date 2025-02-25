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
          type: Number,
          required: true,
        },
        image : {type : String},
        title : {type : String},
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
);

const SavedRecipe = model("SavedRecipe", SavedRecipeSchema);

module.exports = SavedRecipe;
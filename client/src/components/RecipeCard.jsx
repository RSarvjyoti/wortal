import React from "react";
import { saveRecipe } from "../services/api";

const RecipeCard = ({ recipe, token, onViewDetails }) => {
  const handleSaveRecipe = async () => {

    console.log(recipe);
    
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please log in to save recipes.");
      return;
    }

    try {
      
      await  saveRecipe(recipe.id, token);
      
      // alert("Recipe saved successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-5 transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-xl font-semibold text-gray-800 mt-3 text-center">
        {recipe.title}
      </h3>
      
      <div className="mt-4 flex justify-between">
        <button
          onClick={onViewDetails}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          View Details
        </button>
        <button
          onClick={handleSaveRecipe}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
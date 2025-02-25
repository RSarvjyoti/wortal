import React, { useEffect, useState } from "react";
import { getSavedRecipes } from "../services/api";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(token);
  

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!token) {
        setError("You need to log in to view saved recipes.");
        setLoading(false);
        return;
      }

      try {
        const recipes = await getSavedRecipes(token);
        console.log(recipes);
        
        setSavedRecipes(recipes || []);
      } catch (error) {
        console.error("Error fetching saved recipes:", error.message);
        setError("Failed to load saved recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Saved Recipes</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : savedRecipes.length === 0 ? (
        <p className="text-gray-600">No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipeId._id}
              recipe={recipe.recipeId}
              token={token}
              onViewDetails={() => navigate(`/recipes/${recipe.recipeId._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
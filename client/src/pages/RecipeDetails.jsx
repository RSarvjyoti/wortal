import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../services/api";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getRecipeDetails(id);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-gray-600">Loading recipe details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!recipe) return <p className="text-gray-600">Recipe not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-md shadow-md"
      />
      <h2 className="text-3xl font-bold mt-4">{recipe.title}</h2>
      <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: recipe.summary }} />

      <h3 className="text-xl font-semibold mt-6">Ingredients:</h3>
      <ul className="list-disc list-inside mt-2">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-800">{ingredient}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-6">Instructions:</h3>
      <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

      <h3 className="text-xl font-semibold mt-6">Nutrition:</h3>
      <p className="text-gray-700">
        Calories: {recipe.nutrition.calories} kcal | Protein: {recipe.nutrition.protein} | 
        Fat: {recipe.nutrition.fat} | Carbs: {recipe.nutrition.carbs}
      </p>
    </div>
  );
};

export default RecipeDetails;
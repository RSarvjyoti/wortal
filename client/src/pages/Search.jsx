import { useState, useEffect } from "react";
import { searchRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState("");

  useEffect(() => {
    console.log("Updated Recipes State:", recipes);
  }, [recipes]);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError("Please enter a valid search query.");
      return;
    }

    if (trimmedQuery === lastQuery) return;

    setLoading(true);
    setError(null);
    setRecipes([]);
    setLastQuery(trimmedQuery);

    try {
      const response = await searchRecipes(trimmedQuery);
      console.log("Full API Response:", response.data.data);

      const data = response?.data || [];
      console.log(data);
      
      if (Array.isArray(data) && data.length > 0) {
        setRecipes(data);
      } else {
        setRecipes([]);
        setError("No recipes found. Try a different search term.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Search Recipes</h2>

      <div className="flex w-full max-w-md items-center bg-white shadow-md rounded-lg p-2">
        <input
          type="text"
          className="w-full p-2 border-none focus:outline-none text-gray-700"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 disabled:opacity-50"
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {loading && <p className="text-gray-500 mt-4">Loading recipes...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard key={recipe.id || index} recipe={recipe} />
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-500 text-lg">
              No recipes found. Try searching for something else!
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
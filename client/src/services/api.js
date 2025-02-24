import axios from "axios";

const API_URL = "http://localhost:8080/api"; 

export const registerUser = async (userData) => {
  try {
    return await axios.post(`${API_URL}/auth/signup`, userData);
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (userData) => {
  try {
    return await axios.post(`${API_URL}/auth/signin`, userData);
  } catch (error) {
    return handleApiError(error);
  }
};

export const searchRecipes = async (query) => {
  try {
    return await axios.get(`${API_URL}/recipes/search`, { params: { query } });
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRecipeDetails = async (id) => {
  try {
    return await axios.get(`${API_URL}/recipes/${id}`);
  } catch (error) {
    return handleApiError(error);
  }
};

export const saveRecipe = async (recipeId) => {
  try {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      alert("Please log in to save recipes.");
      return;
    }

    console.log("Saving Recipe ID:", recipeId);

    const response = await axios.post(
      `${API_URL}/saved/recipes`,
      { recipeId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Recipe saved successfully!");
    return response.data;
  } catch (error) {
    console.error("Error saving recipe:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Failed to save recipe.");
  }
};

export const getSavedRecipes = async () => {
  try {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      alert("Please log in to view saved recipes.");
      return;
    }

    const response = await axios.get(`${API_URL}/saved/recipes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching saved recipes:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to load saved recipes.");
  }
};


const handleApiError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return { error: error.response?.data?.message || "Something went wrong!" };
};
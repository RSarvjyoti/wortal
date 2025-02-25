const SavedRecipe = require("../models/savedRecipe.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const saveRecipe = async (req, res) => {

  const {recipeId, title, image} = req.body;

  try {
    const user = await User.findById(req.user?.userId);
    
    if (!user) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    let addItems = await SavedRecipe.findOne({userId : req.user?.userId});

    if(!addItems){
      addItems = new SavedRecipe({userId: req.user?.userId, recipes : []})
    }

    addItems.recipes.push({recipeId, title, image});

    await addItems.save();

    return res.status(201).send({
      message : "Added into fav"
    })


  }catch(err) {
    console.log(err);
    
    return res.status(500).send({
      message : err
    })
  }

};


const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log(userId);
    

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    console.log("Fetching saved recipes for user:", userId);

    const savedRecipes = await SavedRecipe.findOne({ userId })
 
      const getAll = await savedRecipes.recipes
      console.log(getAll);
      

    if (!savedRecipes || savedRecipes.recipes.length === 0) {
      return res.status(404).json({ message: "No saved recipes found" });
    }

    return res.status(200).json(savedRecipes.recipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { saveRecipe, getSavedRecipes };
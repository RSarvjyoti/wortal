const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/configs/db");
const authRoute = require("./src/routes/authRoute");
const recipeRoute = require("./src/routes/recipeRoutes");
const saveRecipeRoute = require("./src/routes/savedRecipeRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use('/api/recipes', recipeRoute);
app.use("/api/saved", saveRecipeRoute);

const PORT = process.env.PORT || 9080;
const DB_URL = process.env.MONGO_URL

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectDB(DB_URL);
});

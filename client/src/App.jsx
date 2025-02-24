import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedRecipes from "./components/SavedRecipes";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import RecipeDetails from "./pages/RecipeDetails";


function App() {
  return (<>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/search" element={<Search/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/saved" element={<SavedRecipes />} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;

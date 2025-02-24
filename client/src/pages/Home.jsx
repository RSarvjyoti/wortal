import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNgv8zb9YYjo6K9Zx_Fh2VuK14OQkPHgu5PQ&s",
    description: "A classic Italian pasta dish with creamy sauce.",
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    image: "https://hips.hearstapps.com/hmg-prod/images/grilled-chicken-salad-index-6628169554c88.jpg?crop=0.6667863339915036xw:1xh;center,top&resize=1200:*",
    description: "Healthy and delicious grilled chicken with fresh greens.",
  },
  {
    id: 3,
    title: "Chocolate Cake",
    image: "https://www.giverecipe.com/wp-content/uploads/2020/06/Chocolate-Strawberry-Cake.jpg",
    description: "Rich and moist chocolate cake with frosting.",
  },
  {
    id: 4,
    title: "Sushi Rolls",
    image: "https://www.kikkoman.eu/fileadmin/_processed_/0/f/csm_1025-recipe-page-Spicy-tuna-and-salmon-rolls_desktop_b6172c0072.jpg",
    description: "Fresh and tasty sushi rolls with soy sauce.",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % recipes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Featured Recipes</h1>

      <div className="relative w-full max-w-4xl overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${index * 100}%` }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        >
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              className="min-w-[100%] bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
                <p className="text-gray-600 mt-2">{recipe.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex mt-4 space-x-2">
        {recipes.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-gray-800" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
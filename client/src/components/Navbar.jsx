import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <h2 className="text-2xl font-bold">
          <Link to="/">🍽 Recipe App</Link>
        </h2>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-2 md:mt-0">
          <Link to="/search" className="hover:text-gray-300 transition">Search</Link>
          {token ? (
            <>
              <Link to="/saved" className="hover:text-gray-300 transition">Saved Recipes</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
              <Link
                to="/register"
                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
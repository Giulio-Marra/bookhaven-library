import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/Logo.png";

const MyNavbar = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white text-black px-6 py-3 flex justify-between items-center border-b-1 border-b-gray-200 font-serif shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-8">
        <img src={Logo} alt="Logo" className="h-10" />
        <Link to="/homepage" className="hover:text-blue-300">
          Home
        </Link>
        <Link to="/catalog" className="hover:text-blue-300">
          Catalog
        </Link>
        <Link to="/event" className="hover:text-blue-300">
          Event
        </Link>
        <Link to="/contact" className="hover:text-blue-300">
          Contact
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {!isAuthenticated && (
          <Link
            to="/login"
            className="hover:bg-blue-300 rounded-md bg-gray-200 p-2 px-6 "
          >
            Login
          </Link>
        )}
        {isAuthenticated && (
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        )}

        {isAuthenticated && user?.role === "STAFF" && (
          <Link to="/admin" className="hover:text-gray-300">
            Admin Panel
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MyNavbar;

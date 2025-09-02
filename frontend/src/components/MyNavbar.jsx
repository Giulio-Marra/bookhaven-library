import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/Logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const MyNavbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // nuovo stato

  return (
    <nav className="bg-white text-black px-6 py-3 border-b border-gray-200 font-serif shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Links */}
        <div className="flex items-center space-x-8">
          <img src={Logo} alt="Logo" className="h-10" />
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
            <Link to="/catalog" className="hover:text-blue-300">
              Catalogo
            </Link>
            <Link to="/event" className="hover:text-blue-300">
              Articoli
            </Link>
            <Link to="/contact" className="hover:text-blue-300">
              Contatti
            </Link>
          </div>
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {isAuthenticated && user?.role === "STAFF" && (
            <Link
              to="/admin"
              className="hover:bg-blue-600 bg-blue-400 p-2 text-white px-4 rounded-md"
            >
              Admin Panel
            </Link>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              className="hover:bg-blue-300 rounded-md bg-gray-200 p-2 px-6"
            >
              Login
            </Link>
          )}

          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <CgProfile className="h-6 w-6 " />
                <span>{user.name}</span>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50 cursor-pointer">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 space-y-2 bg-white border-t border-gray-200">
          <Link to="/homepage" className="block hover:text-blue-300">
            Home
          </Link>
          <Link to="/catalog" className="block hover:text-blue-300">
            Catalogo
          </Link>
          <Link to="/event" className="block hover:text-blue-300">
            Articoli
          </Link>
          <Link to="/contact" className="block hover:text-blue-300">
            Contatti
          </Link>

          {isAuthenticated && user?.role === "STAFF" && (
            <Link
              to="/admin"
              className="block hover:bg-blue-600 bg-blue-400 p-2 text-white rounded-md"
            >
              Admin Panel
            </Link>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              className="block hover:bg-blue-300 bg-gray-200 p-2 rounded-md"
            >
              Login
            </Link>
          )}

          {isAuthenticated && (
            <div className="border-t border-gray-200 pt-2">
              <Link
                to="/dashboard"
                className="block px-2 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-2 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default MyNavbar;

import React, { useState } from "react";
import HomepageImage from "../assets/aaa.jpg";
import CardBook from "../components/CardBook";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to catalog page with search query parameter
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // Navigate to catalog page without search parameter
      navigate("/catalog");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const books = [
    {
      image: "https://picsum.photos/200/300?random=1",
      title: "The Lost World",
      author: "Arthur Conan Doyle",
    },
    {
      image: "https://picsum.photos/200/300?random=2",
      title: "Dune",
      author: "Frank Herbert",
    },
    {
      image: "https://picsum.photos/200/300?random=3",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
    },
    {
      image: "https://picsum.photos/200/300?random=3",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      {/* HERO FULL SCREEN */}
      <div className="relative w-full h-180 overflow-hidden clip-diagonal">
        <img
          src={HomepageImage}
          alt="Homepage Background"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to School Library
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Explore a curated list of books tailored just for you.
          </p>
          <form onSubmit={handleSearch} className="flex w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for books..."
              className="w-full p-3 rounded-l-lg border-none focus:outline-none bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* RECENT BOOKS */}
      <div className="w-full max-w-7xl mx-auto p-4 mt-12 border-t-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Recently Added Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <CardBook key={index} book={book} />
          ))}
        </div>
      </div>

      {/* ANNOUNCEMENTS */}
      <div className="w-full max-w-7xl mx-auto p-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      </div>
    </div>
  );
};

export default HomePage;

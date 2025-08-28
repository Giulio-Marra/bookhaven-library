import React, { useEffect, useState } from "react";
import { getBooks } from "../../services/bookService";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const BooksStaffCatalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBooks(searchQuery, 0, 20);
        setBooks(data.content);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [searchQuery]);

  const sandSearch = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(search);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Books</h1>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/admin/add-book")}
        >
          Add New Book
        </button>
      </div>
      <input
        className="w-full p-4 rounded-lg bg-[#e7edf3] border-none my-4 h-10"
        type="text"
        placeholder="Search by title,author or ISBN"
        value={search}
        onKeyDown={sandSearch}
        onChange={handleSearchChange}
      />
      <div className="grid grid-cols-5 gap-4 border border-gray-300 p-4 font-bold">
        <p>Title</p>
        <p>Author</p>
        <p>ISBN</p>
        <p>Availability</p>
        <p>Actions</p>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <div
            key={book.id}
            className="grid grid-cols-5 gap-4 border border-gray-300 p-4 items-center"
          >
            <p>{book.title}</p>
            <p className="text-blue-400">
              {book.authors.map((author) => author.name)}
            </p>
            <p>{book.isbn}</p>
            <p className="">{book.status}</p>
            <div className="flex gap-2 text-blue-400">
              <p>Edit</p>
              <p>|</p>
              <p>Delete</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BooksStaffCatalog;

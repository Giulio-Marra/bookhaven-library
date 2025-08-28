import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import CardBook from "../components/CardBook";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const CatalogPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(""); // input dell'utente
  const [searchQuery, setSearchQuery] = useState(""); // ricerca effettiva
  const [searchParams, setSearchParams] = useSearchParams();

  // Legge il parametro search dall'URL all'inizio
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearch(searchFromUrl);
    setSearchQuery(searchFromUrl); // fa partire la prima fetch
  }, [searchParams]);

  // Carica i libri quando cambia pagina o ricerca effettiva
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBooks(searchQuery, page, size);
        setBooks(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [page, searchQuery]);

  // Gestione input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Submit con Enter
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      setPage(0);
      setSearchQuery(search); // aggiorna ricerca effettiva
      setSearchParams({ search }); // aggiorna URL
    }
  };

  // Paginazione
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let start = Math.max(0, page - 2);
    let end = Math.min(totalPages - 1, page + 2);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(0, end - (maxPagesToShow - 1));
      end = Math.min(totalPages - 1, start + (maxPagesToShow - 1));
    }

    if (start > 0) pages.push(<span key="start-ellipsis">...</span>);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 mx-1 rounded-full ${
            i === page ? "bg-gray-200" : "bg-white"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    if (end < totalPages - 1) pages.push(<span key="end-ellipsis">...</span>);

    return pages;
  };

  return (
    <div className="mx-auto max-w-6xl my-30 px-4">
      <div>
        <h1 className="text-4xl font-bold mb-4">Explore Our Catalog</h1>
        <h2 className="text-lg mb-6 text-gray-400">
          Discover a world of stories and knowledge.
        </h2>
      </div>

      <div className="mb-6">
        <input
          placeholder="Search by title, author, or keyword"
          className="w-full p-4 rounded-lg bg-[#e7edf3] placeholder:text-[#4e7097] border-none"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center">
          Error loading books: {error.message}
        </p>
      ) : books.length === 0 ? (
        <p className="text-black-500 text-center">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <CardBook key={book.id} book={book} />
          ))}
        </div>
      )}

      {books.length > 0 && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0 || loading}
            className="px-4 py-2 m-2 text-gray-500 rounded disabled:opacity-50"
          >
            &lt;
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => setPage(page + 1)}
            disabled={loading || page === totalPages - 1}
            className="px-4 py-2 m-2 text-gray-500 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;

import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import CardBook from "../components/CardBook";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(""); // categoria selezionata
  const [search, setSearch] = useState(searchFromUrl); // input dell'utente
  const [searchQuery, setSearchQuery] = useState(searchFromUrl); // ricerca effettiva

  // Fetch libri quando cambia page o searchQuery
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBooks(searchQuery, category, page, size);
        setBooks(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [page, searchQuery, size, category]);

  // Gestione input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Submit con Enter
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      setPage(0);
      setSearchQuery(search); // aggiorna la ricerca effettiva
      setSearchParams({ search }); // aggiorna l'URL
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
    <div className="mx-auto max-w-6xl my-12 px-4 mt-30">
      <div>
        <h1 className="text-4xl font-bold mb-4">Esplora il nostro catalogo</h1>
        <h2 className="text-lg mb-6 text-gray-400">
          Scopri un mondo di storie e conoscenze.
        </h2>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Input di ricerca */}
        <input
          placeholder="Cerca per titolo o autore.."
          className="flex-1 p-4  bg-[#e7edf3] placeholder:text-[#4e7097] border-none"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />

        {/* Dropdown categorie */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(0); // resetta la pagina
          }}
          className="p-4  border border-gray-300 bg-white text-gray-700 w-full md:w-56"
        >
          <option value="">Tutte le categorie</option>
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="romance">Romance</option>
          <option value="giallo">Giallo</option>
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center">
          Error loading books: {error.message || "Unknown error"}
        </p>
      ) : books.length === 0 ? (
        <p className="text-gray-500 text-center">Nessun libro trovato.</p>
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
            className="px-4 py-2 m-2 text-gray-500  disabled:opacity-50"
          >
            &lt;
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => setPage(page + 1)}
            disabled={loading || page === totalPages - 1}
            className="px-4 py-2 m-2 text-gray-500  disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;

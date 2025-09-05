import React, { useEffect, useState } from "react";
import { getArticlesByFilters } from "../services/articleService";
import Spinner from "../components/Spinner";
import ArticleCard from "../components/ArticleCard";

const ArticlesPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const articleTypes = [
    { value: "", label: "Tutti i tipi" },
    { value: "NEWS", label: "Notizie" },
    { value: "EVENT", label: "Eventi" },
    { value: "BLOG", label: "Blog" },
    { value: "ANNOUNCEMENT", label: "Annunci" },
    { value: "REVIEW", label: "Recensioni" },
  ];

  const formatDateForInput = (date) => (date ? date : "");
  const formatDateForAPI = (date) => (date ? new Date(date).toISOString() : "");

  const fetchArticles = async (pageNumber = 0, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticlesByFilters(
        appliedFilters.type || null,
        appliedFilters.startDate
          ? formatDateForAPI(appliedFilters.startDate)
          : null,
        appliedFilters.endDate
          ? formatDateForAPI(appliedFilters.endDate)
          : null,
        pageNumber,
        10
      );
      setArticles((prev) =>
        append ? [...prev, ...data.content] : data.content
      );
      setPage(data.number);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "Errore nel caricamento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(0, false);
  }, [appliedFilters]);

  const handleFilterChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));
  const applyFilters = () => setAppliedFilters(filters);
  const clearFilters = () => {
    const empty = { type: "", startDate: "", endDate: "" };
    setFilters(empty);
    setAppliedFilters(empty);
  };
  const loadMore = () => fetchArticles(page + 1, true);
  if (loading && page === 0) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-64 flex-shrink-0 md:-ml-60 mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Filtri</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo articolo
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full border px-3 py-2"
            >
              {articleTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Data inizio
            </label>
            <input
              type="date"
              value={formatDateForInput(filters.startDate)}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="w-full border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data fine</label>
            <input
              type="date"
              value={formatDateForInput(filters.endDate)}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="w-full border px-3 py-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              className="flex-1 px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer"
            >
              Applica
            </button>
            <button
              onClick={clearFilters}
              className="flex-1 px-4 py-2 bg-gray-200 cursor-pointer"
            >
              Cancella
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Articoli</h1>
        <hr className="mb-6 border-gray-300" />

        {articles.length === 0 && !loading && (
          <div className="text-gray-500">Nessun articolo trovato.</div>
        )}

        <div className="space-y-4">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>

        {page < totalPages - 1 && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-2 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer disabled:opacity-50"
            >
              {loading ? "Caricamento..." : "Carica altri articoli"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;

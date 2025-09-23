import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getArticlesDesc,
  deleteArticle,
  getArticlesByFilters,
} from "../../services/articleService";
import Spinner from "../Spinner";
import ConfirmModal from "./ConfirmModal";

const ArticleStaffCatalog = () => {
  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [articleType, setArticleType] = useState("");

  // Fetch iniziale articoli
  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticlesDesc(0, 20);
      setArticles(data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Elimina articolo
  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    try {
      setLoading(true);
      await deleteArticle(articleToDelete.id, token);
      alert("Articolo eliminato con successo");
    } catch (err) {
      alert(`Errore durante l'eliminazione: ${err.message}`);
    } finally {
      setLoading(false);
      setModalOpen(false);
      setArticleToDelete(null);
      fetchArticles();
    }
  };

  // Filtro articoli per tipo e date
  const handleFilter = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticlesByFilters(
        articleType || null,
        startDate || null,
        endDate || null,
        0,
        20
      );
      setArticles(data.content || []);
    } catch (err) {
      alert(`Errore durante il filtro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestione Articoli</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold  hover:bg-blue-600 transition"
          onClick={() => navigate("/admin/add-article")}
        >
          Aggiungi Articolo
        </button>
      </div>

      <div className="flex gap-2 mb-4 items-end">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium text-sm">Tipo</label>
          <select
            value={articleType}
            onChange={(e) => setArticleType(e.target.value)}
            className="border p-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Tutti</option>
            <option value="NEWS">News</option>
            <option value="BLOG">Blog</option>
            <option value="REVIEW">Review</option>
            <option value="EVENT">Event</option>
            <option value="ANNOUNCEMENT">Announcement</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium text-sm">Da</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium text-sm">A</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-green-500 text-white font-semibold  hover:bg-green-600 transition"
        >
          Filtra
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 bg-gray-100 p-3 font-semibold border border-gray-300">
        <p>Titolo</p>
        <p>Data Creazione</p>
        <p>Data Ultimo Aggiornamento</p>
        <p>Tipo</p>
        <p>Azioni</p>
      </div>

      {articles.length === 0 ? (
        <p className="p-4 text-center text-gray-500">
          Nessun articolo disponibile
        </p>
      ) : (
        articles.map((article, index) => (
          <div
            key={article.id}
            className={`grid grid-cols-5 gap-4 p-3 items-center border-x border-gray-300 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <p className="font-medium">{article.title}</p>
            <p>{new Date(article.createdAt).toLocaleDateString()}</p>
            <p>{new Date(article.updatedAt).toLocaleDateString()}</p>
            <p>{article.articleType}</p>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700 font-medium transition"
                onClick={() => navigate(`/admin/update-article/${article.id}`)}
              >
                Modifica
              </button>
              <span className="text-gray-400">|</span>
              <button
                className="text-red-500 hover:text-red-700 font-medium transition"
                onClick={() => handleDeleteClick(article)}
              >
                Elimina
              </button>
            </div>
          </div>
        ))
      )}

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Sei sicuro di voler eliminare questo articolo?"
      />
    </div>
  );
};

export default ArticleStaffCatalog;

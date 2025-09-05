import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import InputField from "../../components/componentsStaff/InputField";
import { getArticleById, updateArticle } from "../../services/articleService";

const articleTypes = ["NEWS", "EVENT", "BLOG", "ANNOUNCEMENT", "REVIEW"];

const UpdateArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : sessionStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    title: "",
    articleType: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carica i dati dell'articolo
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticleById(id, token);
        setFormData({
          title: article.title || "",
          articleType: article.articleType || "",
          content: article.content || "",
        });
      } catch (err) {
        console.error("Errore nel caricamento articolo:", err);
        setError("Impossibile caricare l'articolo");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, token]);

  // Gestione input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateArticle(id, formData, token);
      alert("Articolo aggiornato con successo!");
      navigate(-1); // torna indietro dopo update
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-center py-10 px-4 min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 mt-10 shadow-md space-y-6 transition-all duration-300"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="font-semibold text-red-400 cursor-pointer hover:underline"
        >
          Torna indietro
        </button>
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Modifica Articolo
        </h1>

        {/* Titolo */}
        <InputField
          label="Titolo"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Titolo dell'articolo"
          required={true}
        />

        {/* Tipo di articolo */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Tipo Articolo</label>
          <select
            name="articleType"
            value={formData.articleType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Seleziona un tipo</option>
            {articleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Contenuto */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Contenuto</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Scrivi qui il contenuto dell'articolo..."
            rows={15}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition"
        >
          Aggiorna Articolo
        </button>
      </form>
    </div>
  );
};

export default UpdateArticlePage;

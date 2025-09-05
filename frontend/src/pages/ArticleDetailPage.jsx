import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../services/articleService";
import Spinner from "../components/Spinner";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getArticleById(id);
        setArticle(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!article)
    return (
      <div className="text-gray-500 text-center">Articolo non trovato</div>
    );

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center mt-10">
      <div className="w-full max-w-4xl bg-white overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Torna indietro */}
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:underline font-semibold"
          >
            ← Torna indietro
          </button>

          {/* Tipo e Titolo */}
          <div>
            <span className="text-sm uppercase text-blue-600 font-bold">
              {article.articleType}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              {article.title}
            </h1>
          </div>

          {/* Metadati */}
          <div className="text-gray-500 text-sm">
            <p>
              Creato il{" "}
              <span className="font-medium">
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </p>
            {article.updatedAt && (
              <p>
                Aggiornato il{" "}
                <span className="font-medium">
                  {new Date(article.updatedAt).toLocaleDateString()}
                </span>
              </p>
            )}
          </div>

          {/* Immagine */}
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-80 object-cover"
            />
          )}

          {/* Contenuto */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;

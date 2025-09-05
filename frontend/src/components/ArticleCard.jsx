import React from "react";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const navigation = useNavigate();
  console.log(article);

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md  overflow-hidden hover:shadow-lg transition-shadow m-5">
      {/* Contenuto testuale */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex gap-4 text-sm text-gray-500 mb-2">
            <p className="font-medium">{article.articleType}</p>
            <p>
              Pubblicato: {new Date(article.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {article.title}
          </h2>
          {article.content.length > 200 ? (
            <p className="text-gray-600 mb-4">
              {article.content.substring(0, 200)}...
            </p>
          ) : (
            <p className="text-gray-600 mb-4">{article.content}</p>
          )}
        </div>
        <button
          className="self-start bg-blue-400 text-white px-4 py-2  hover:bg-blue-600 transition-colors cursor-pointer"
          onClick={() => navigation(`/article/detail/${article.id}`)}
        >
          Leggi di più
        </button>
      </div>

      {/* Immagine a destra */}
      <div className="w-full md:w-60 h-40 md:h-auto flex-shrink-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ArticleCard;

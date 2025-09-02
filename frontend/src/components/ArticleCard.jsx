import React from "react";

const ArticleCard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md  overflow-hidden hover:shadow-lg transition-shadow m-5">
      {/* Contenuto testuale */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex gap-4 text-sm text-gray-500 mb-2">
            <p className="font-medium">Evento</p>
            <p>Pubblicato: 18/10/2015</p>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Titolo dell'articolo
          </h2>
          <p className="text-gray-600 mb-4">
            Breve descrizione dell'articolo che riassume il contenuto e
            incuriosisce l’utente.
          </p>
        </div>
        <button className="self-start bg-blue-400 text-white px-4 py-2  hover:bg-blue-600 transition-colors cursor-pointer">
          Leggi di più
        </button>
      </div>

      {/* Immagine a destra */}
      <div className="w-full md:w-60 h-40 md:h-auto flex-shrink-0">
        <img
          src="https://picsum.photos/600/400"
          alt="Articolo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ArticleCard;

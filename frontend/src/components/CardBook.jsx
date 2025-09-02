import React from "react";
import { useNavigate } from "react-router-dom";

const CardBook = ({ book }) => {
  const navigate = useNavigate();

  console.log(book);

  const goBookDetailPage = () => {
    navigate(`/book/detail/${book.id}`);
  };

  return (
    <div className="flex flex-col bg-white  shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div
        className="w-full h-64 md:h-72 lg:h-80 bg-gray-100 flex items-center justify-center cursor-pointer"
        onClick={goBookDetailPage}
      >
        <img
          src={book.image}
          alt={book.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 flex-1">
        <h3
          className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 truncate"
          onClick={goBookDetailPage}
          title={book.title}
        >
          {book.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-auto">
          {book.authors ? (
            book.authors.length > 0 ? (
              book.authors.map((author) => (
                <p
                  key={author.id}
                  className="text-blue-400 cursor-pointer hover:underline truncate max-w-full"
                  onClick={() => navigate(`/author/detail/${author.id}`)}
                  title={author.name}
                >
                  {author.name}
                </p>
              ))
            ) : (
              <p className="text-gray-500 italic">Unknown Author</p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardBook;

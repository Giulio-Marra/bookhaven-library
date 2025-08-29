import React from "react";
import { useNavigate } from "react-router-dom";

const CardBook = ({ book }) => {
  const navigate = useNavigate();
  console.log(book);

  const goBookDetailPage = () => {
    navigate(`/book/detail/${book.id}`);
  };

  return (
    <div className="flex flex-col m-5  rounded-lg">
      <img
        src={book.image}
        alt={book.title}
        className="rounded-lg shadow-md mb-4 h-80"
        onClick={goBookDetailPage}
      />
      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold" onClick={goBookDetailPage}>
          {book.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {book.authors?.map((author) => (
            <p
              key={author.id}
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate(`/author/detail/${author.id}`)}
            >
              {author.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardBook;

import React from "react";
import { useNavigate } from "react-router-dom";

const CardBook = ({ book }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/book/detail/${book.bookId}`);
  };

  return (
    <div className="flex flex-col m-5  rounded-lg" onClick={handleClick}>
      <img
        src={book.image}
        alt={book.title}
        className="rounded-lg shadow-md mb-4 h-80"
      />
      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-blue-400">{book.authorName}</p>
      </div>
    </div>
  );
};

export default CardBook;

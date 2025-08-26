import React from "react";

const CardBook = ({ book }) => {
  return (
    <div className="flex flex-col m-5  rounded-lg">
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

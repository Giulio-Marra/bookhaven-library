import React, { useEffect, useState } from "react";
import { getBookById } from "../services/bookService";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  console.log(book);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookById(bookId);
        setBook(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        "Error loading book"
      ) : book ? (
        <div className="max-w-4xl mx-auto flex-col p-6 mt-30 gap-10">
          <div className="">
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-gray-800">{book.description}</p>
          </div>
          <div className="flex justify-between mt-10">
            <div>
              <p className="text-xl font-bold">{book.title}</p>
              <div className="flex flex-wrap gap-2">
                {book.authors.map((author) => (
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
            <div>
              <img
                className="w-48 h-72 object-cover"
                src={book.image}
                alt={book.title}
              />
            </div>
          </div>
          <div className="mt-10 flex-col">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-5">
              Book Details
            </h2>
            <p className="flex pb-5 pt-5 border-b border-gray-200 text-blue-400">
              Published:{" "}
              <span className="ml-10 text-gray-600">{book.publishedYear}</span>
            </p>
            <p className="flex pb-5 pt-5 border-b border-gray-200 text-blue-400">
              Pages:{" "}
              <span className="ml-10 text-gray-600">{book.numPages}</span>
            </p>
            <p className="flex pb-5 pt-5 border-b border-gray-200 text-blue-400">
              Categories:{" "}
              <span className="ml-10 text-gray-600">{book.categories}</span>
            </p>
            <p className="flex pb-5 pt-5 border-b border-gray-200 text-blue-400">
              Isbn: <span className="ml-10 text-gray-600">{book.isbn}</span>
            </p>
          </div>
        </div>
      ) : (
        "Book not found"
      )}
    </div>
  );
};

export default BookDetailPage;

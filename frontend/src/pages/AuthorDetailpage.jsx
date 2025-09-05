import React, { useEffect, useState } from "react";
import { getAuthorById } from "../services/authorService";
import { getBookByAuthorId } from "../services/bookService";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import CardBook from "../components/CardBook";

const AuthorDetailpage = () => {
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: authorId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const authorData = await getAuthorById(authorId);
        setAuthor(authorData);

        const booksData = await getBookByAuthorId(authorId);
        setBooks(booksData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authorId]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600 text-center mt-20">{error}</p>;
  if (!author)
    return <p className="text-gray-600 text-center mt-20">Author not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-16">
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div
            className="w-40 h-40 bg-center bg-cover rounded-full flex-shrink-0 shadow-sm border-4 border-white ring-2 ring-gray-100"
            style={{ backgroundImage: `url(${author.urlImage})` }}
          ></div>
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{author.name}</h1>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Biografia
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {author.biography}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {author.name} Libri
          {books.length > 0 && (
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({books.length})
            </span>
          )}
        </h2>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <CardBook key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              Nessun libro per questo autore
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetailpage;

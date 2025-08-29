import React, { useEffect, useState } from "react";
import { getAuthorById } from "../services/authorService";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getBookByAuthorId } from "../services/bookService";
import CardBook from "../components/CardBook";

const AuthorDetailpage = () => {
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const { id: authorId } = useParams();

  console.log(books);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      setError(null);
      try {
        const authorData = await getAuthorById(authorId);
        setAuthor(authorData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const booksData = await getBookByAuthorId(authorId);
        setBooks(booksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
    fetchBooks();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        "Error loading author"
      ) : author ? (
        <div className="mx-auto max-w-6xl my-30 px-4">
          <div className="bg-black p-6  ">
            <h1 className="text-2xl font-bold text-white">{author.name}</h1>
          </div>
          <div className="flex mt-10">
            <div>
              <p className="">{author.biography}</p>
            </div>
            <div className="flex-shrink-0">
              <img
                src={author.image}
                alt={author.name}
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-2xl font-bold">{author.name}'s Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {books.map((book) => (
                <CardBook key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        "Author not found"
      )}
    </div>
  );
};

export default AuthorDetailpage;

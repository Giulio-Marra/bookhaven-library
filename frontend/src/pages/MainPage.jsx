import React, { useEffect, useState } from "react";
import HomepageImage from "../assets/test1.png";
import CardBook from "../components/CardBook";
import { useNavigate } from "react-router-dom";
import { getRecentBooks } from "../services/bookService";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArticleCard from "../components/ArticleCard";
import registerImage from "../assets/Card.png";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/catalog");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const recentBooks = await getRecentBooks();
        setBooks(recentBooks);
      } catch (error) {
        setError(error);
        console.error("Error fetching recent books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
          <h2 className="text-xl font-bold text-red-500">Errore</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* HERO FULL SCREEN */}
      <div className="relative w-full h-180 overflow-hidden clip-diagonal">
        <img
          src={HomepageImage}
          alt="Homepage Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Benvenuti nella Biblioteca Scolastica
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Scopri, prenota e leggi i libri disponibili nella nostra biblioteca.
          </p>
          <form onSubmit={handleSearch} className="flex w-full max-w-xl">
            <input
              type="text"
              placeholder="Cerca un libro per titolo, autore..."
              className="w-full p-3 rounded-l-lg border-none focus:outline-none bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              className="p-3 bg-blue-400 text-white rounded-r-lg hover:bg-blue-700 cursor-pointer"
            >
              Cerca
            </button>
          </form>
        </div>
      </div>

      {/* ULTIMI ARRIVI */}
      <div className="w-full max-w-7xl mx-auto p-4 mt-12 border-t-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Ultimi Arrivi</h2>
        <p className="text-gray-600 mb-6">
          Ecco gli ultimi libri aggiunti alla nostra collezione.
        </p>
        {loading ? (
          <Spinner />
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            autoHeight={true}
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <CardBook book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="w-full bg-blue-50 p-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Come diventare membro</h2>
            <p className="text-gray-700 mb-4">
              Per prendere in prestito i libri della nostra biblioteca, è
              necessario registrarsi come membro. Contatta il nostro staff in
              sede per ricevere la tua carta personale e iniziare subito a
              leggere!
            </p>
            <button className="px-6 py-3 bg-blue-400 text-white  hover:bg-blue-600 cursor-pointer ">
              Scopri di più
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src={registerImage}
              alt="Registrazione Biblioteca"
              className="w-full h-auto rounded shadow"
            />
          </div>
        </div>
      </div>

      {/* AVVISI E NOTIZIE */}
      <div className="w-full max-w-7xl mx-auto p-4 mt-12 border-t-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Avvisi e Notizie</h2>
        <p className="text-gray-600 mb-4">
          Rimani aggiornato sugli eventi, orari e comunicazioni della
          biblioteca.
        </p>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
};

export default MainPage;

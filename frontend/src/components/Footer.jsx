import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + descrizione */}
        <div>
          <h2 className="text-xl font-bold text-white">
            📚 Biblioteca Comunale
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Un luogo di cultura, conoscenza e condivisione. Scopri, prenota e
            leggi i tuoi libri preferiti.
          </p>
        </div>

        {/* Link veloci */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Navigazione
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/homepage" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-white">
                Catalogo
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-white">
                Eventi
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                Chi siamo
              </Link>
            </li>
          </ul>
        </div>

        {/* Contatti */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Contatti
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@biblioteca.it" className="hover:text-white">
                info@biblioteca.it
              </a>
            </li>
            <li>
              <span className="block">📍 Via Roma 123, Milano</span>
            </li>
            <li>
              <span className="block">☎️ +39 02 1234567</span>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                📘 Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                📸 Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Biblioteca Comunale — Tutti i diritti
        riservati.
      </div>
    </footer>
  );
};

export default Footer;

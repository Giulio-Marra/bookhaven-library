import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Contatti</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form di contatto */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Messaggio"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Invia Messaggio
          </button>
          {success && (
            <p className="text-green-600 mt-2">
              Grazie! Il tuo messaggio è stato inviato.
            </p>
          )}
        </form>

        {/* Informazioni contatto */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Informazioni Biblioteca
          </h2>
          <p className="text-gray-700">📍 Indirizzo: Via Esempio 123, Città</p>
          <p className="text-gray-700">📞 Telefono: +39 012 3456789</p>
          <p className="text-gray-700">✉ Email: info@biblioteca.it</p>

          {/* Mappa opzionale */}
          <div className="mt-4 border rounded-md overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.123456!2d12.492231!3d41.890251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a0b0b0b0b0%3A0x1234567890abcdef!2sColosseo!5e0!3m2!1sit!2sit!4v1234567890"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mappa Biblioteca"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

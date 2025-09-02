import React from "react";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MyNavbar />

      {/* il contenuto cresce e spinge giù il footer */}
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;

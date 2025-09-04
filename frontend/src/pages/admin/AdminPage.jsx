import React, { useState } from "react";
import DashBoardMenu from "../../components/componentsStaff/DashBoardMenu";
import BooksStaffCatalog from "../../components/componentsStaff/BooksStaffCatalog";
import AuthorStaffCatalog from "../../components/componentsStaff/AuthorStaffCatalog";
import ArticleStaffCatalog from "../../components/componentsStaff/ArticleStaffCatalog";

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Libri");

  let content;
  switch (selectedMenu) {
    case "Libri":
      content = <BooksStaffCatalog />;
      break;
    case "Autori":
      content = <AuthorStaffCatalog />;
      break;
    case "Articoli":
      content = <ArticleStaffCatalog />;
      break;

    default:
      content = <div>Seleziona un menu</div>;
  }
  return (
    <div className="mt-30 mx-20 flex gap-16">
      <DashBoardMenu
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      {content}
    </div>
  );
};

export default AdminPage;

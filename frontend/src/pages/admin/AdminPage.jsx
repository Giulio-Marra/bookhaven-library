import React from "react";
import DashBoardMenu from "../../components/componentsStaff/DashBoardMenu";
import BooksStaffCatalog from "../../components/componentsStaff/BooksStaffCatalog";
import AuthorStaffCatalog from "../../components/componentsStaff/AuthorStaffCatalog";
import ArticleStaffCatalog from "../../components/componentsStaff/ArticleStaffCatalog";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../redux/actions/menuActions";

const AdminPage = () => {
  const selectedMenu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();

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
    <div className="mt-6 mx-4 md:mt-30 md:mx-20 flex flex-col md:flex-row gap-6 md:gap-16">
      <DashBoardMenu
        selectedMenu={selectedMenu}
        setSelectedMenu={(menu) => dispatch(setMenu(menu))}
      />
      <div className="flex-1">{content}</div>
    </div>
  );
};

export default AdminPage;

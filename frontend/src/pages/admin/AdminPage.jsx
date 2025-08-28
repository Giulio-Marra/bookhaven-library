import React, { useState } from "react";
import DashBoardMenu from "../../components/componentsStaff/DashBoardMenu";
import BooksStaffCatalog from "../../components/componentsStaff/BooksStaffCatalog";

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Books");

  let content;
  switch (selectedMenu) {
    case "Books":
      content = <BooksStaffCatalog />;
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

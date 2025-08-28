import React from "react";
import { BsBookmark } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";

const DashBoardMenu = ({ selectedMenu, setSelectedMenu }) => {
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="flex-col w-64">
      <h1 className="mb-5">School library Staff Panel</h1>
      <div
        className={`p-2 flex items-center gap-2 ${
          selectedMenu === "Books" ? "bg-gray-200" : ""
        }`}
        onClick={() => handleMenuClick("Books")}
      >
        <IoBookOutline />
        <p>Books</p>
      </div>
      <div
        className={`p-2 flex items-center gap-2 ${
          selectedMenu === "Authors" ? "bg-gray-200" : ""
        }`}
        onClick={() => handleMenuClick("Authors")}
      >
        <CiUser />
        <p>Authors</p>
      </div>
      <div
        className={`p-2 flex items-center gap-2 ${
          selectedMenu === "Articles" ? "bg-gray-200" : ""
        }`}
        onClick={() => handleMenuClick("Articles")}
      >
        <MdOutlineArticle />
        <p>Articles</p>
      </div>
      <div
        className={`p-2 flex items-center gap-2 ${
          selectedMenu === "Users" ? "bg-gray-200" : ""
        }`}
        onClick={() => handleMenuClick("Users")}
      >
        <FiUsers />
        <p>Users</p>
      </div>
      <div
        className={`p-2 flex items-center gap-2 ${
          selectedMenu === "Reservations" ? "bg-gray-200" : ""
        }`}
        onClick={() => handleMenuClick("Reservations")}
      >
        <BsBookmark />
        <p>Reservations</p>
      </div>
    </div>
  );
};

export default DashBoardMenu;

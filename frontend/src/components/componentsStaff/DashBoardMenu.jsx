import React from "react";
import { BsBookmark } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";

const DashBoardMenu = ({ selectedMenu, setSelectedMenu }) => {
  const handleMenuClick = (menu) => setSelectedMenu(menu);

  const menuItems = [
    { label: "Libri", icon: <IoBookOutline /> },
    { label: "Autori", icon: <CiUser /> },
    { label: "Articoli", icon: <MdOutlineArticle /> },
    { label: "Utenti", icon: <FiUsers /> },
    { label: "Prenotazioni", icon: <BsBookmark /> },
  ];

  return (
    <div className="w-64 p-4 bg-gray-50  h-85">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        School Library Staff Panel
      </h1>
      {menuItems.map((item) => (
        <div
          key={item.label}
          onClick={() => handleMenuClick(item.label)}
          className={`flex items-center gap-3 p-3  cursor-pointer transition 
            ${
              selectedMenu === item.label
                ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                : "hover:bg-gray-200 text-gray-700"
            }`}
        >
          {item.icon}
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashBoardMenu;

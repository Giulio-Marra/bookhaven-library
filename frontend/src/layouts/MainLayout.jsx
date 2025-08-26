import React from "react";
import MyNavbar from "../components/MyNavbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MyNavbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;

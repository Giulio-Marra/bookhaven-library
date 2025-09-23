import React from "react";

const AdminRoute = ({ children, role }) => {
  const isAdmin = role === "STAFF" || role === "DEMO";

  return isAdmin ? children : <div>Access Denied</div>;
};

export default AdminRoute;

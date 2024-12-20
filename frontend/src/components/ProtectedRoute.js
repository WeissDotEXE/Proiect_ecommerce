import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to the login page if no token is present
    return <Navigate to="/auth" replace />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;

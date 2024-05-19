import React from "react";
import { Navigate } from "react-router-dom";
import { userAuth } from "../Authentication/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = userAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;

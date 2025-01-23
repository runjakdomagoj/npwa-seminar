import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/useContext";

export const ProtectedRoute = ({ children }) => {
  const { token } = useUserContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

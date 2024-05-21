import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    const parsedProfile = JSON.parse(profile);
    if (parsedProfile) {
      return children;
    }
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;

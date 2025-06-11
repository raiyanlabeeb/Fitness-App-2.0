import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Retrieves the token from localStorage
  return token ? children : <Navigate to="/login" replace />; // If token exists, render children; otherwise, redirect to login page
};

export default PrivateRoute;

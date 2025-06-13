import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-center space-x-8">
        <Link
          to="/"
          className="hover:text-blue-300 transition font-medium text-lg"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="hover:text-blue-300 transition font-medium text-lg"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="hover:text-blue-300 transition font-medium text-lg"
        >
          Sign Up
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

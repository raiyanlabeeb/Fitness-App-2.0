import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import MainPage from "./components/MainPage";

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
        <Route path="/main" element={<MainPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

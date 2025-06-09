import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function HomePage() {
  return <h2>Welcome to the Home Page</h2>;
}

function LoginPage() {
  return <h2>Please Log In</h2>;
}
function App() {

  return (
    // <div>
    //   <h1>Message from backend:</h1>
    //   <TestMessage />
    // </div>

    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

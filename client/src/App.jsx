import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TestMessage from "./components/testMessage";

function App() {

  return (
    <div>
      <h1>Message from backend:</h1>
      <TestMessage />
    </div>
  );
}

export default App;

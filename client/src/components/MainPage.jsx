import React from "react";
import { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      console.error("Access token is invalid or missing.");
      return;
    }

    fetch("http://localhost:5000/api/main", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      if (!res.ok) {
        console.error("Error:", res.status, res.error);
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);
    });
  });

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
    </div>
  );
};

export default MainPage;

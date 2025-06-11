import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; // Assuming useAuth is in hooks folder
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const HomePage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Fitness App 2.0
      </h1>
      <p className="text-lg md:text-xl max-w-xl text-center">
        Track your workouts, set your goals, and stay motivated to become the
        best version of yourself.
      </p>

      {user && (
        <button
          onClick={() => navigate("/main")}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-200 transition"
        >
          Main Page
        </button>
      )}
    </div>
  );
};

export default HomePage;
